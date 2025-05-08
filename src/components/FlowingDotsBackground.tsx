
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
}

const FlowingDotsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef<Vector>({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  // Simplex noise implementation (simplified version)
  const createNoise = () => {
    // We'll use a simplified noise function with basic sine waves at different frequencies
    return {
      noise2D: (x: number, y: number) => {
        return Math.sin(x * 0.01) * Math.sin(y * 0.01) * 2 + 
               Math.sin(x * 0.02 + 0.3) * Math.sin(y * 0.01 - 0.1) * 1.5 + 
               Math.sin(x * 0.01 - 0.5) * Math.sin(y * 0.02 + 0.4) * 1;
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
    const particleCount = window.innerWidth < 768 ? 150 : 250;
    const flowFieldResolution = 20;
    const flowFieldIntensity = 0.08;
    
    // Color palette matching the site's theme
    const colors = [
      'rgba(155, 135, 245, 0.8)', // Primary Purple
      'rgba(126, 105, 171, 0.7)', // Secondary Purple
      'rgba(110, 89, 165, 0.6)',  // Tertiary Purple
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
        const size = Math.random() * 2.5 + 1;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedFactor: (Math.random() * 0.5 + 0.5) * (3 - size * 0.5), // Smaller particles move faster
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.4 + 0.2,
        });
      }
    };

    // Get flow angle at a position using noise
    const getFlowAngle = (x: number, y: number, time: number) => {
      // Use noise to create a natural flowing field
      const noiseValue = noise.noise2D(x + time * 5, y + time * 5);
      return noiseValue * Math.PI * 2;
    };

    const render = (time: number) => {
      // Clear with subtle trail effect
      ctx.fillStyle = 'rgba(13, 17, 23, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and render particles
      particlesRef.current.forEach((p) => {
        // Get flow direction at particle's position
        const angle = getFlowAngle(p.x, p.y, time * 0.0005);
        
        // Update particle position based on flow
        p.x += Math.cos(angle) * p.speedFactor;
        p.y += Math.sin(angle) * p.speedFactor;

        // Mouse influence (gentle attraction/repulsion)
        const dx = p.x - mousePosition.current.x;
        const dy = p.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const angle = Math.atan2(dy, dx);
          const force = 0.2 * (1 - distance / 120);
          p.x += Math.cos(angle) * force;
          p.y += Math.sin(angle) * force;
        }

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw the dot with a subtle glow effect
        const glow = p.size * 3;
        
        // Subtle glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
        gradient.addColorStop(0, p.color.replace(')', ', ' + p.opacity * 0.5 + ')'));
        gradient.addColorStop(1, p.color.replace(')', ', 0)'));
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        ctx.fill();
        
        // Core dot
        ctx.beginPath();
        ctx.fillStyle = p.color.replace(')', ', ' + p.opacity + ')');
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Optional: draw connections between close particles
      const maxDistance = 60;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.05;
            ctx.strokeStyle = `rgba(155, 135, 245, ${opacity})`;
            ctx.lineWidth = 0.5;
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
      // For reduced motion, just draw static dots
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
