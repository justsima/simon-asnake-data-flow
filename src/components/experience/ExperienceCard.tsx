
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Experience } from './types';
import { AnimatedText } from './AnimatedText';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isVisible: boolean;
  isActive: boolean;
  onClick: () => void;
}

const ExperienceCard = ({ 
  experience, 
  index, 
  isVisible, 
  isActive, 
  onClick 
}: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track mouse position for 3D effect
  useEffect(() => {
    if (!cardRef.current || !isActive) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isActive]);
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    active: { scale: 1.03, x: 10 }
  };
  
  return (
    <motion.div 
      className={`experience-card ${isActive ? 'is-active' : ''} ${isVisible ? 'is-visible' : ''} min-h-[80vh] flex items-center`}
      onClick={onClick}
      initial="hidden"
      animate={isActive ? "active" : isVisible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card 
        ref={cardRef}
        className={`
          transition-all duration-700 w-full max-w-3xl mx-auto
          ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-70 cursor-pointer'} 
          ${isVisible ? '' : 'opacity-0 translate-y-12'}
        `}
        style={{
          background: 'rgba(32, 30, 67, 0.4)',
          backdropFilter: 'blur(12px)',
          border: isActive ? '1px solid rgba(138, 137, 255, 0.3)' : '1px solid rgba(138, 137, 255, 0.1)',
          boxShadow: isActive ? '0 8px 32px rgba(138, 137, 255, 0.15)' : '0 8px 32px rgba(0, 0, 0, 0.2)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s ease, opacity 0.5s ease'
        }}
      >
        <CardContent className="p-8 md:p-10 relative">
          {/* 3D hover effect elements */}
          <div 
            className="absolute inset-0 opacity-0 bg-gradient-to-tr from-[rgba(138,137,255,0.1)] to-transparent rounded-lg transition-opacity duration-300 pointer-events-none"
            style={{ 
              transform: isActive ? 'translateZ(20px)' : 'translateZ(0)',
              opacity: isActive ? 0.2 : 0
            }}
          />
          
          <motion.div className="mb-8 relative" style={{ transform: 'translateZ(30px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatedText 
              text={experience.title}
              delay={100}
              visible={isVisible}
              className="text-3xl font-medium text-white mb-3"
            />
            
            <AnimatedText 
              text={experience.company}
              delay={200}
              visible={isVisible}
              className="text-xl text-[#8A89FF] font-medium mb-3"
            />
            
            <AnimatedText 
              text={experience.period}
              delay={300}
              visible={isVisible}
              className="text-md text-gray-400 mb-6"
            />

            <div className="w-16 h-1 bg-[#8A89FF] rounded opacity-80 mb-8"></div>
          </motion.div>
          
          {/* Responsibilities with staggered animation */}
          <div className="space-y-4">
            <ul className="space-y-4">
              {experience.responsibilities.map((item, i) => (
                <motion.li 
                  key={i} 
                  className="text-md text-gray-300 flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.6, x: -5 }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                >
                  <span className="w-2 h-2 bg-[#8A89FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceCard;
