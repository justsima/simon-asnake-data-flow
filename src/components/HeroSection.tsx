import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import ParticleBackground from './ParticleBackground';
import GradientBackground from './GradientBackground';

const roles = [
  "Data Scientist",
  "Power BI Expert",
  "Analytics Specialist", 
  "Data Visualizer"
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    const roleInterval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(roleInterval);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <GradientBackground />
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl ml-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl font-playfair font-bold mb-6 opacity-0 transition-all duration-1000 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-portfolio-accent1 via-portfolio-accent2 to-portfolio-purple text-left text-white animate-fade-in hover:scale-[1.02] transform-gpu"
            >
              Simon Asnake
            </h1>
            
            <h2 className="text-2xl md:text-3xl mb-8 font-montserrat text-left">
              <span className="text-gray-300">I'm a </span>
              <span className="animate-text-shimmer bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-bold">
                {roles[currentRole]}
              </span>
            </h2>
            
            <p className="text-lg text-gray-400 mb-12 font-inter max-w-2xl text-left animate-fade-in-longer-delay">
              Specializing in building exceptional digital experiences through data visualization and analytics.
            </p>
            
            <div className="flex gap-4 mb-16 text-left">
              <Button
                variant="outline"
                className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-white"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
              
              <Button
                variant="outline"
                className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-white"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
