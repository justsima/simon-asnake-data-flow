
import { useEffect, useRef } from 'react';

interface Vector {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedFactor: number;
  color: string;
  opacity: number;
  waveOffset: number; // Added for wave effect
}

const FlowingDotsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef<Vector>({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Enhanced noise implementation with multiple wave frequencies
  const createNoise = () => {
    return {
      noise2D: (x: number, y: number, time: number) => {
        // Create multiple overlapping sine waves for a richer flow pattern
        return (
          Math.sin(x * 0.01 + time * 0.2) * Math.cos(y * 0.01 + time * 0.3) * 2 +
          Math.sin(x * 0.02 + time * 0.5 + 0.3) * Math.cos(y * 0.01 - time * 0.2) * 1.5 +
          Math.sin(x * 0.005 + time * 0.1 - 0.5) * Math.cos(y * 0.02 + time * 0.4) * 2.5 +
          Math.sin(y * 0.01 + time * 0.3) * 1.2
        );
      }
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flow field configuration
    const noise = createNoise();
    const particleCount = window.innerWidth < 768 ? 180 : 280; // Increased particle count
    const flowFieldResolution = 15;
    const flowFieldIntensity = 0.1;
    
    // Enhanced color palette with more purple variations
    const colors = [
      'rgba(155, 135, 245, 0.8)', // Primary Purple
      'rgba(126, 105, 171, 0.7)', // Secondary Purple
      'rgba(110, 89, 165, 0.6)',  // Tertiary Purple
      'rgba(139, 92, 246, 0.7)',  // Vivid Purple
      'rgba(167, 139, 250, 0.6)', // Light Purple
      'rgba(33, 37, 43, 0.5)',    // Dark accent
    ];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Track mouse position for interactive flow
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1; // Slightly larger particles
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedFactor: (Math.random() * 0.5 + 0.5) * (3 - size * 0.5), // Smaller particles move faster
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2,
          waveOffset: Math.random() * Math.PI * 2, // Random phase offset for each particle
        });
      }
    };

    // Get flow angle at a position using enhanced noise
    const getFlowAngle = (x: number, y: number, time: number) => {
      // Create wave-like flows with time-varying components
      const noiseValue = noise.noise2D(x, y, time);
      return noiseValue * Math.PI;
    };

    const render = (time: number) => {
      timeRef.current += 0.005; // Consistent time increment for smooth animation
      
      // Clear with subtle trail effect
      ctx.fillStyle = 'rgba(13, 17, 23, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and render particles
      particlesRef.current.forEach((p) => {
        // Wave effect: particles move in sinusoidal patterns
        const waveAmplitude = 0.6;
        const waveFrequency = 0.02;
        const waveFactor = Math.sin(timeRef.current + p.waveOffset) * waveAmplitude;
        
        // Get base flow direction from noise
        const angle = getFlowAngle(p.x, p.y, timeRef.current) + waveFactor;
        
        // Update particle position based on flow and wave
        p.x += Math.cos(angle) * p.speedFactor;
        p.y += Math.sin(angle) * p.speedFactor;

        // Enhanced mouse influence (gentler attraction/repulsion with wave-like effect)
        const dx = p.x - mousePosition.current.x;
        const dy = p.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = 0.3 * (1 - distance / 150);
          const waveMouse = Math.sin(timeRef.current * 2 + p.waveOffset) * 0.2;
          p.x += Math.cos(angle + waveMouse) * force;
          p.y += Math.sin(angle + waveMouse) * force;
        }

        // Wrap around screen edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Wave-influenced opacity for pulsating effect
        const opacityWave = Math.sin(timeRef.current * 0.5 + p.waveOffset) * 0.15;
        const currentOpacity = p.opacity + opacityWave;
        
        // Draw the dot with enhanced glow effect
        const glowSize = p.size * (3 + Math.sin(timeRef.current + p.waveOffset) * 0.5);
        
        // Create larger, softer glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        gradient.addColorStop(0, p.color.replace(')', ', ' + currentOpacity * 0.7 + ')'));
        gradient.addColorStop(1, p.color.replace(')', ', 0)'));
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Core dot
        ctx.beginPath();
        ctx.fillStyle = p.color.replace(')', ', ' + currentOpacity + ')');
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections between close particles to create web effect
      ctx.lineWidth = 0.5;
      const maxDistance = 70; // Increased connection distance
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Wave-influenced connection opacity
            const waveConnection = Math.sin(timeRef.current * 0.5 + particlesRef.current[i].waveOffset + particlesRef.current[j].waveOffset) * 0.1;
            const opacity = (1 - distance / maxDistance) * 0.15 + waveConnection;
            
            // Gradient connection for more visual interest
            const gradient = ctx.createLinearGradient(
              particlesRef.current[i].x, particlesRef.current[i].y,
              particlesRef.current[j].x, particlesRef.current[j].y
            );
            
            gradient.addColorStop(0, particlesRef.current[i].color.replace(')', ', ' + opacity + ')'));
            gradient.addColorStop(1, particlesRef.current[j].color.replace(')', ', ' + opacity + ')'));
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(() => render(time + 1));
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    resizeCanvas();
    
    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(() => render(0));
    } else {
      // For reduced motion, just draw static dots in a wave-like pattern
      initParticles();
      particlesRef.current.forEach(p => {
        ctx.fillStyle = p.color.replace(')', ', ' + p.opacity + ')');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default FlowingDotsBackground;
