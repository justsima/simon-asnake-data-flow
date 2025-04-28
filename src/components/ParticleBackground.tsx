
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  connections: Particle[];
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef<{x: number, y: number}>({x: 0, y: 0});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 30 : 50; // Reduced particle count
    const connectionDistance = 120; // Reduced connection distance

    // Track mouse position for interactive particles
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles with connection arrays
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.3, // Slower speed
        speedY: (Math.random() - 0.5) * 0.3, // Slower speed
        opacity: Math.random() * 0.4 + 0.1, // Lower opacity
        connections: []
      });
    }

    // Calculate connections between particles
    const updateConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        particles[i].connections = [];
        
        for (let j = 0; j < particles.length; j++) {
          if (i !== j) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              particles[i].connections.push(particles[j]);
            }
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Semi-transparent background for trail effect - more transparent now
      ctx.fillStyle = 'rgba(13, 17, 23, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update connections
      updateConnections();
      
      // Draw connections and particles
      particles.forEach((particle) => {
        // Draw connections
        particle.connections.forEach(connectedParticle => {
          const dx = particle.x - connectedParticle.x;
          const dy = particle.y - connectedParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const opacity = 1 - (distance / connectionDistance);
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.08})`; // More subtle connections
          ctx.lineWidth = 0.2; // Thinner lines
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(connectedParticle.x, connectedParticle.y);
          ctx.stroke();
        });
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.6})`; // More subtle particles
        ctx.fill();

        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction - gentler movement
        const dx = particle.x - mousePosition.current.x;
        const dy = particle.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 80) { // Smaller interaction radius
          const angle = Math.atan2(dy, dx);
          const force = 0.1 * (1 - distance / 80); // Gentler force
          particle.x += Math.cos(angle) * force;
          particle.y += Math.sin(angle) * force;
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
