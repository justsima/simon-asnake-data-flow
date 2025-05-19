
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingParticlesProps {
  isScrolling: boolean;
}

const FloatingParticles = ({ isScrolling }: FloatingParticlesProps) => {
  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 2,
    color: `rgba(138, 137, 255, ${Math.random() * 0.3 + 0.1})`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 10 + 10
  }));

  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Update particle positions when scrolling
  useEffect(() => {
    if (!isScrolling) return;
    
    particleRefs.current.forEach((particle) => {
      if (!particle) return;
      
      const currentY = parseFloat(particle.style.transform.split('translateY(')[1]);
      const newY = isNaN(currentY) ? 0 : currentY + (Math.random() * 20 - 10);
      
      particle.style.transform = `translate(${Math.random() * 10 - 5}px, ${newY}px)`;
    });
  }, [isScrolling]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          ref={el => particleRefs.current[index] = el}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: particle.duration,
            ease: "easeInOut",
            delay: particle.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
