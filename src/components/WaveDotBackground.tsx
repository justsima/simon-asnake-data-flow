
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
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.density = Math.random() * 20 + 10;
        this.baseY = y;
        this.baseX = x;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }

      update(time: number) {
        // Wave motion
        const frequency = 0.001; // Lower frequency for smoother waves
        const amplitude = 20; // Wave height
        
        // Calculate wave position
        this.y = this.baseY + Math.sin(time * frequency + this.baseX * 0.01) * amplitude;
        this.x += this.speedX;
        
        // Boundary check
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
      }

      connect(particles: Particle[]) {
        for (const particle of particles) {
          const distance = Math.sqrt(
            (this.x - particle.x) ** 2 + 
            (this.y - particle.y) ** 2
          );
          
          const maxDistance = 85; // Shorter connection distance for cleaner look
          
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx!.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.12})`; // More subtle connections
            ctx!.lineWidth = 0.6; // Thinner lines
            ctx!.beginPath();
            ctx!.moveTo(this.x, this.y);
            ctx!.lineTo(particle.x, particle.y);
            ctx!.stroke();
          }
        }
      }
    }

    // Create particles
    const particleCount = window.innerWidth < 768 ? 80 : 160; // Reduced particle count
    const particles: Particle[] = [];
    
    const createParticles = () => {
      particles.length = 0; // Clear existing particles
      
      // Create particles in a grid pattern with slight randomness
      const gridSize = Math.sqrt(particleCount);
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;
      
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const x = cellWidth * i + Math.random() * cellWidth;
          const y = cellHeight * j + Math.random() * cellHeight;
          particles.push(new Particle(x, y));
        }
      }
    };
    
    createParticles();
    window.addEventListener('resize', createParticles);

    // Animation loop
    let time = 0;
    const animate = () => {
      // Clear with very subtle gradient background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Very subtle trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time++;
      
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
      style={{ background: 'rgb(8, 8, 13)' }} // Darker background
    />
  );
};

export default WaveDotBackground;
