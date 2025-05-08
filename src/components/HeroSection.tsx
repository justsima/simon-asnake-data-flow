
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import ParticleBackground from './ParticleBackground';
import GradientBackground from './GradientBackground';

const roles = [
  "Data Analyst",
  "Data Scientist", 
  "Power BI Developer",
  "Data Engineer"
];

// Changed to white color scheme for text gradients
const gradients = [
  "from-white via-gray-100 to-gray-200",
  "from-gray-200 via-white to-gray-200", 
  "from-white via-gray-100 to-gray-200",
  "from-gray-200 via-white to-gray-200"
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentGradient, setCurrentGradient] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showArrow, setShowArrow] = useState({ projects: false, contact: false });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      if (titleRef.current) {
        titleRef.current.classList.remove('opacity-0');
      }
      
      // Animate intro paragraph word by word with proper spacing
      if (textRef.current) {
        const text = "Empowering businesses with data-driven insights through advanced visualization and analytics, transforming complex datasets into strategic business intelligence.";
        const words = text.split(' ');
        textRef.current.innerHTML = '';
        
        words.forEach((word, index) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.className = 'inline-block opacity-0 translate-y-3 transition-all duration-500 proper-spacing';
          span.style.transitionDelay = `${800 + index * 50}ms`;
          
          setTimeout(() => {
            span.classList.remove('opacity-0', 'translate-y-3');
          }, 800 + index * 50);
          
          textRef.current?.appendChild(span);
          
          // Add space after each word except the last one
          if (index < words.length - 1) {
            const space = document.createTextNode(' ');
            textRef.current?.appendChild(space);
          }
        });
      }
    }, 500);

    const roleInterval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length);
      setCurrentGradient(prev => (prev + 1) % gradients.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(roleInterval);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <GradientBackground />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl ml-8 md:ml-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl font-montserrat font-bold mb-6 opacity-0 transition-all duration-1000 text-left text-white animate-fade-in"
            >
              Simon Asnake
            </h1>
            
            <h2 className="text-2xl md:text-3xl mb-8 font-montserrat text-left">
              <span className="text-gray-300">I'm a </span>
              <span 
                className={`animate-text-shimmer bg-gradient-to-r ${gradients[currentGradient]} bg-clip-text text-transparent font-bold transition-all duration-700`}
                key={currentRole}
                style={{ animation: 'text-morph 0.75s ease-out' }}
              >
                {roles[currentRole]}
              </span>
            </h2>
            
            <p 
              ref={textRef}
              className="text-lg text-gray-300 mb-12 font-inter max-w-2xl text-left leading-relaxed proper-spacing"
            >
              {/* Text content will be dynamically populated with proper spacing */}
            </p>
            
            <div className="flex gap-4 mb-16 text-left">
              <Button
                variant="outline"
                className="glass-button group relative overflow-hidden bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-500 text-white px-6 py-3"
                onMouseEnter={() => setShowArrow(prev => ({...prev, projects: true}))}
                onMouseLeave={() => setShowArrow(prev => ({...prev, projects: false}))}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight 
                    className={`transition-all duration-500 ${showArrow.projects ? 'opacity-100 translate-x-0 arrow-animation' : 'opacity-0 -translate-x-4 absolute'}`}
                    size={18} 
                  />
                </span>
              </Button>
              
              <Button
                variant="outline"
                className="glass-button group relative overflow-hidden bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-500 text-white px-6 py-3"
                onMouseEnter={() => setShowArrow(prev => ({...prev, contact: true}))}
                onMouseLeave={() => setShowArrow(prev => ({...prev, contact: false}))}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in touch
                  <ArrowRight 
                    className={`transition-all duration-500 ${showArrow.contact ? 'opacity-100 translate-x-0 arrow-animation' : 'opacity-0 -translate-x-4 absolute'}`}
                    size={18}
                  />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
