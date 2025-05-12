
import { useEffect, useState } from 'react';

interface FloatingParticlesProps {
  count?: number;
  isScrolling: boolean;
}

const FloatingParticles = ({ count = 20, isScrolling }: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 7}s`,
    }));
    
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 rounded-full bg-[#8A89FF] opacity-30 ${isScrolling ? 'animate-float' : ''}`}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
