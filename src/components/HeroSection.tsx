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

// Enhanced purple gradients for role text
const gradients = [
  "from-[#8A89FF] via-[#9D8CFF] to-[#7676FF]",
  "from-[#7676FF] via-[#8A89FF] to-[#9D8CFF]", 
  "from-[#9D8CFF] via-[#8A89FF] to-[#6262FF]",
  "from-[#6262FF] via-[#7676FF] to-[#8A89FF]"
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentGradient, setCurrentGradient] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showArrow, setShowArrow] = useState({ projects: false, contact: false });
  const [scrollPromptVisible, setScrollPromptVisible] = useState(true);
  const [isRoleChanging, setIsRoleChanging] = useState(false);
  const [roleVisible, setRoleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Staggered animations for different sections
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // 1. First: Title appears (Simon Asnake)
      if (titleRef.current) {
        titleRef.current.classList.remove('opacity-0');
        titleRef.current.classList.add('animate-fade-in');
      }
      
      // 2. Second: Role text appears (after 800ms - increased delay)
      setTimeout(() => {
        setRoleVisible(true);
        if (roleRef.current) {
          roleRef.current.classList.remove('opacity-0');
          roleRef.current.classList.add('animate-fade-in');
        }
      }, 800);
      
      // 3. Third: Description appears word by word (after 1400ms)
      setTimeout(() => {
        if (textRef.current) {
          const text = "Empowering businesses with data-driven insights through advanced visualization and analytics, transforming complex datasets into strategic business intelligence.";
          const words = text.split(' ');
          textRef.current.innerHTML = '';
          
          words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.className = 'inline-block opacity-0 translate-y-3 transition-all duration-500';
            span.style.transitionDelay = `${index * 80}ms`;
            
            setTimeout(() => {
              span.classList.remove('opacity-0', 'translate-y-3');
            }, index * 80);
            
            textRef.current?.appendChild(span);
            
            // Add space after each word except the last one
            if (index < words.length - 1) {
              const space = document.createTextNode(' ');
              textRef.current?.appendChild(space);
            }
          });
        }
      }, 1400);
      
      // 4. Fourth: Buttons appear (after 2800ms)
      setTimeout(() => {
        if (buttonsRef.current) {
          buttonsRef.current.classList.remove('opacity-0');
          buttonsRef.current.classList.add('animate-fade-in');
        }
      }, 2800);
    }, 300);

    // Start role transition after role becomes visible
    const roleInterval = setInterval(() => {
      if (roleVisible) {
        setIsRoleChanging(true);
        
        setTimeout(() => {
          setCurrentRole(prev => (prev + 1) % roles.length);
          setCurrentGradient(prev => (prev + 1) % gradients.length);
          setIsRoleChanging(false);
        }, 400);
      }
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
  }, [roleVisible]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <GradientBackground />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl ml-4 md:ml-8 lg:ml-12">
          <div className="space-y-8 md:space-y-10">
            {/* Main Title with Side-by-Side Layout and Continuous Gradient for Asnake */}
            <h1 
              ref={titleRef}
              className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl opacity-0 text-left leading-tight mb-8"
            >
              <div className="flex flex-wrap items-baseline gap-4 md:gap-6">
                <span className="text-white font-semibold">Simon</span>
                <span 
                  className="asnake-gradient font-bold"
                  style={{
                    background: 'linear-gradient(-45deg, #8A89FF, #7676FF, #9D8CFF, #6262FF, #8A89FF, #7676FF)',
                    backgroundSize: '400% 400%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'continuousGradientFlow 8s ease-in-out infinite'
                  }}
                >
                  Asnake
                </span>
              </div>
            </h1>
            
            {/* Dynamic Role with Clear Visibility and Smooth Animation */}
            <h2 className="hero-subtitle text-xl sm:text-2xl md:text-3xl lg:text-4xl text-left mb-6">
              <span className="text-gray-300 font-medium">I'm a </span>
              <span 
                ref={roleRef}
                className="role-text inline-block opacity-0 font-semibold"
                style={{
                  color: isRoleChanging ? 'transparent' : '#8A89FF',
                  background: isRoleChanging ? 'none' : `linear-gradient(45deg, #8A89FF, #7676FF, #9D8CFF)`,
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: isRoleChanging ? 'unset' : 'text',
                  WebkitTextFillColor: isRoleChanging ? 'transparent' : 'transparent',
                  backgroundClip: isRoleChanging ? 'unset' : 'text',
                  animation: isRoleChanging ? 'none' : 'smoothGradientShift 3s ease-in-out infinite',
                  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: isRoleChanging ? 'translateY(-5px) scale(0.95)' : 'translateY(0) scale(1)',
                  opacity: isRoleChanging ? 0.3 : 1,
                  textShadow: '0 2px 8px rgba(138, 137, 255, 0.3)',
                  minWidth: '250px',
                  display: 'inline-block'
                }}
              >
                {roles[currentRole]}
              </span>
            </h2>
            
            {/* Description with Staggered Word Animation */}
            <p 
              ref={textRef}
              className="hero-description text-lg sm:text-xl md:text-2xl text-gray-300 max-w-full md:max-w-4xl text-left leading-relaxed mb-8"
            >
              {/* Text content will be dynamically populated with staggered animation */}
            </p>
            
            {/* Enhanced CTA Buttons with Delayed Appearance */}
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 opacity-0 mt-8"
            >
              <Button
                variant="outline"
                className="button-slide-effect group bg-gradient-to-r from-[#8A89FF]/10 to-[#6262FF]/10 backdrop-blur-lg border-[#8A89FF]/20 hover:bg-gradient-to-r hover:from-[#8A89FF]/20 hover:to-[#6262FF]/20 hover:border-[#8A89FF]/40 transition-all duration-500 text-white px-6 md:px-8 py-3 md:py-4 font-medium text-base md:text-lg"
                onMouseEnter={() => setShowArrow(prev => ({...prev, projects: true}))}
                onMouseLeave={() => setShowArrow(prev => ({...prev, projects: false}))}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-3">
                  View Projects
                  <span className="arrow-container overflow-hidden w-5 md:w-6">
                    <ArrowRight 
                      className={`transition-all duration-300 transform ${showArrow.projects ? 'translate-x-0' : '-translate-x-full'}`}
                      size={20} 
                    />
                  </span>
                </span>
              </Button>
              
              <Button
                variant="outline"
                className="button-slide-effect group bg-gradient-to-r from-[#7676FF]/10 to-[#8A89FF]/10 backdrop-blur-lg border-[#7676FF]/20 hover:bg-gradient-to-r hover:from-[#7676FF]/20 hover:to-[#8A89FF]/20 hover:border-[#7676FF]/40 transition-all duration-500 text-white px-6 md:px-8 py-3 md:py-4 font-medium text-base md:text-lg"
                onMouseEnter={() => setShowArrow(prev => ({...prev, contact: true}))}
                onMouseLeave={() => setShowArrow(prev => ({...prev, contact: false}))}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get in touch
                  <span className="arrow-container overflow-hidden w-5 md:w-6">
                    <ArrowRight 
                      className={`transition-all duration-300 transform ${showArrow.contact ? 'translate-x-0' : '-translate-x-full'}`}
                      size={20} 
                    />
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Prompt */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: scrollPromptVisible ? 1 : 0,
          y: scrollPromptVisible ? 0 : 10 
        }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm mb-3 font-medium tracking-wide hero-description">Scroll to explore</p>
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

      <style jsx>{`
        /* Continuous gradient animation for Asnake */
        @keyframes continuousGradientFlow {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Smooth gradient shift for role text */
        @keyframes smoothGradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Smooth fade-in animation */
        .animate-fade-in {
          animation: smoothFadeIn 0.8s ease-out forwards;
        }

        @keyframes smoothFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Enhanced role text visibility and smoothness */
        .role-text {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* Fallback for browsers that don't support background-clip */
        @supports not (-webkit-background-clip: text) {
          .role-text {
            color: #8A89FF !important;
            background: none !important;
            -webkit-text-fill-color: unset !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .asnake-gradient {
            animation: none !important;
            background: linear-gradient(135deg, #8A89FF, #7676FF) !important;
          }
          
          .role-text {
            animation: none !important;
          }
          
          * {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;