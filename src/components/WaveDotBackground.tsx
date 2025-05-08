
import { useEffect, useRef } from 'react';

const WaveDotBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      density: number;
      baseY: number;
      baseX: number;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.density = Math.random() * 20 + 10;
        this.baseY = y;
        this.baseX = x;
        this.opacity = Math.random() * 0.3 + 0.1; // Subtle opacity
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 137, 255, ${this.opacity})`;
        ctx.fill();
      }

      update(time: number) {
        // Wave motion - increased frequency for faster movement
        const frequency = 0.002; 
        const amplitude = 25; // Higher amplitude for more visible waves
        
        // Calculate wave position
        this.y = this.baseY + Math.sin(time * frequency + this.baseX * 0.01) * amplitude;
        this.x += this.speedX * 1.2; // Increased speed multiplier
        
        // Boundary check
        if (this.x > canvas.width) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = canvas.width;
        }
      }

      connect(particles: Particle[]) {
        for (const particle of particles) {
          const distance = Math.sqrt(
            (this.x - particle.x) ** 2 + 
            (this.y - particle.y) ** 2
          );
          
          const maxDistance = 90; // Connection distance
          
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx!.strokeStyle = `rgba(138, 137, 255, ${opacity * 0.08})`; // Subtle connections
            ctx!.lineWidth = 0.5; // Thinner lines
            ctx!.beginPath();
            ctx!.moveTo(this.x, this.y);
            ctx!.lineTo(particle.x, particle.y);
            ctx!.stroke();
          }
        }
      }
    }

    // Create particles
    const particleCount = window.innerWidth < 768 ? 100 : 180; // Increased particle count
    const particles: Particle[] = [];
    
    const createParticles = () => {
      particles.length = 0; // Clear existing particles
      
      // Create particles with slight randomness
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };
    
    createParticles();
    window.addEventListener('resize', createParticles);

    // Animation loop
    let time = 0;
    const animate = () => {
      // Clear with very dark background
      ctx.fillStyle = 'rgba(8, 8, 13, 0.2)'; // Darker background with slight trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 1.5; // Faster time progression
      
      // Update and connect particles
      particles.forEach(particle => {
        if (!prefersReducedMotion) {
          particle.update(time);
        }
        particle.draw();
      });
      
      // Draw connections between particles
      particles.forEach(particle => {
        particle.connect(particles);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#08080D' }} // Darker background
    />
  );
};

export default WaveDotBackground;
