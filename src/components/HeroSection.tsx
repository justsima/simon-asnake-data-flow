import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import GradientBackground from './GradientBackground';

const roles = [
  "Data Analyst",
  "Data Scientist", 
  "Power BI Developer",
  "Data Engineer"
];

// Changed to purple color scheme for text gradients
const gradients = [
  "from-[#8A89FF] via-[#7676FF] to-[#6262FF]",
  "from-[#7676FF] via-[#8A89FF] to-[#7676FF]", 
  "from-[#8A89FF] via-[#7676FF] to-[#6262FF]",
  "from-[#7676FF] via-[#8A89FF] to-[#7676FF]"
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentGradient, setCurrentGradient] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showArrow, setShowArrow] = useState({ projects: false, contact: false });
  const [scrollPromptVisible, setScrollPromptVisible] = useState(true);
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

    // Setup intersection observer to hide scroll prompt when user scrolls down
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setScrollPromptVisible(false);
          } else {
            setScrollPromptVisible(true);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(aboutSection);
      
      return () => {
        clearTimeout(timer);
        clearInterval(roleInterval);
        observer.disconnect();
      };
    }

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
              className="text-5xl md:text-7xl font-playfair font-bold mb-6 opacity-0 transition-all duration-1000 text-left text-white animate-fade-in"
            >
              Simon Asnake
            </h1>
            
            <h2 className="text-2xl md:text-3xl mb-8 font-inter text-left">
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
              className="text-lg text-gray-300 mb-12 font-raleway max-w-2xl text-left leading-relaxed proper-spacing"
            >
              {/* Text content will be dynamically populated with proper spacing */}
            </p>
            
            <div className="flex gap-4 mb-16 text-left">
              <Button
                variant="outline"
                className="button-slide-effect group bg-gradient-to-r from-[#8A89FF]/10 to-[#6262FF]/10 backdrop-blur-lg border-[#8A89FF]/20 hover:bg-gradient-to-r hover:from-[#8A89FF]/20 hover:to-[#6262FF]/20 hover:border-[#8A89FF]/40 transition-all duration-500 text-white px-6 py-3 font-montserrat"
                onMouseEnter={() => setShowArrow(prev => ({...prev, projects: true}))}
                onMouseLeave={() => setShowArrow(prev => ({...prev, projects: false}))}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <span className="arrow-container overflow-hidden w-5">
                    <ArrowRight 
                      className={`transition-all duration-300 transform ${showArrow.projects ? 'translate-x-0' : '-translate-x-full'}`}
                      size={18} 
                    />
                  </span>
                </span>
              </Button>
              
              <Button
                variant="outline"
                className="button-slide-effect group bg-gradient-to-r from-[#7676FF]/10 to-[#8A89FF]/10 backdrop-blur-lg border-[#7676FF]/20 hover:bg-gradient-to-r hover:from-[#7676FF]/20 hover:to-[#8A89FF]/20 hover:border-[#7676FF]/40 transition-all duration-500 text-white px-6 py-3 font-montserrat"
                onMouseEnter={() => setShowArrow(prev => ({...prev, contact: true}))}
                onMouseLeave={() => setShowArrow(prev => ({...prev, contact: false}))}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in touch
                  <span className="arrow-container overflow-hidden w-5">
                    <ArrowRight 
                      className={`transition-all duration-300 transform ${showArrow.contact ? 'translate-x-0' : '-translate-x-full'}`}
                      size={18} 
                    />
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to explore animation with permanent visibility */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: scrollPromptVisible ? 1 : 0,
          y: scrollPromptVisible ? 0 : 10 
        }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm mb-2 font-montserrat font-medium tracking-wide">Scroll to explore</p>
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-gradient-to-b from-[#8A89FF] to-[#6262FF] rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
