
import { useEffect, useRef } from 'react';

const PyramidBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    // Create grid of pyramids
    const pyramidCount = window.innerWidth < 768 ? 25 : 60; // Increased pyramid count
    
    // Store rotations for each pyramid
    const rotations: number[] = [];
    
    for (let i = 0; i < pyramidCount; i++) {
      const pyramid = document.createElement('div');
      pyramid.className = 'pyramid';
      
      // Random positions
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 70 + 30;
      const opacity = Math.random() * 0.08 + 0.02; // Slightly increased opacity
      const rotation = Math.random() * 360;
      const delay = Math.random() * 3; // Reduced delay for faster animations
      
      rotations.push(rotation);
      
      pyramid.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        transform: rotateX(60deg) rotateZ(${rotation}deg);
        animation-delay: ${delay}s;
      `;
      
      container.appendChild(pyramid);
    }

    // Handle scroll animation with increased speed
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pyramids = container.querySelectorAll('.pyramid');
      
      pyramids.forEach((pyramid: Element, index) => {
        const speed = index % 5 * 0.03 + 0.07; // Increased speed
        const rotateValue = scrollY * speed;
        const translateValue = scrollY * speed * 0.25;
        
        (pyramid as HTMLElement).style.transform = `rotateX(60deg) rotateZ(${rotations[index] + rotateValue}deg) translateY(${translateValue}px)`;
      });
    };

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (!prefersReducedMotion) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
    >
      <style>{`
        .pyramid {
          position: absolute;
          transform-style: preserve-3d;
          animation: float 12s infinite ease-in-out; /* Faster animation */
        }
        
        .pyramid::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 50% solid transparent;
          border-right: 50% solid transparent;
          border-bottom: 100% solid rgba(138, 137, 255, 0.08);
          transform: translateZ(30px);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateX(60deg) rotateZ(0); }
          50% { transform: translateY(-20px) rotateX(65deg) rotateZ(5deg); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .pyramid {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PyramidBackground;
