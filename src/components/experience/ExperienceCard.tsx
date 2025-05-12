
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
  
  return (
    <div 
      className={`experience-card ${isActive ? 'is-active' : ''} ${isVisible ? 'is-visible' : ''}`}
      onClick={onClick}
    >
      <Card 
        className={`
          transition-all duration-700 mb-8
          transform hover:scale-[1.02] focus:scale-[1.02]
          ${isActive ? 'translate-x-2 scale-[1.03]' : 'translate-x-0 scale-100 opacity-50'} 
          ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}
        `}
        style={{
          background: 'rgba(32, 30, 67, 0.4)',
          backdropFilter: 'blur(12px)',
          border: isActive ? '1px solid rgba(138, 137, 255, 0.3)' : '1px solid rgba(138, 137, 255, 0.1)',
          boxShadow: isActive ? '0 8px 32px rgba(138, 137, 255, 0.15)' : '0 8px 32px rgba(0, 0, 0, 0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        <CardContent className="p-6 relative">
          {/* 3D hover effect elements */}
          <div 
            className="absolute inset-0 opacity-0 bg-gradient-to-tr from-[rgba(138,137,255,0.1)] to-transparent rounded-lg transition-opacity duration-300 pointer-events-none"
            style={{ 
              transform: isActive ? 'translateZ(20px)' : 'translateZ(0)',
              opacity: isActive ? 0.2 : 0
            }}
          />
          
          <div className="mb-4 relative" style={{ transform: 'translateZ(30px)' }}>
            <AnimatedText 
              text={experience.title}
              delay={index * 100}
              visible={isVisible}
              className="text-xl font-medium text-white mb-1"
            />
            
            <AnimatedText 
              text={experience.company}
              delay={(index * 100) + 200}
              visible={isVisible}
              className="text-[#8A89FF] font-medium mb-2"
            />
            
            <AnimatedText 
              text={experience.period}
              delay={(index * 100) + 300}
              visible={isVisible}
              className="text-sm text-gray-400 mb-4"
            />
          </div>
          
          {/* Always visible responsibilities */}
          <div className="space-y-3">
            <ul className="space-y-3 mt-2">
              {experience.responsibilities.map((item, i) => (
                <li 
                  key={i} 
                  className={`
                    text-sm text-gray-300 flex items-start
                    transition-all duration-500
                    opacity-0 transform translate-y-4
                  `}
                  style={{ 
                    transitionDelay: `${i * 100}ms`,
                    animation: isActive ? `fadeInUp 0.5s ${i * 100}ms forwards` : 'none',
                  }}
                >
                  <span className="w-1 h-1 bg-[#8A89FF] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceCard;
