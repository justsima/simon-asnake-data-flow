
import { useEffect, useRef } from 'react';
import ParticleBackground from './ParticleBackground';
import { Button } from './ui/button';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-fade-in');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-[#0D1117]">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-playfair font-bold mb-6 opacity-0 transition-all duration-1000 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-left text-white"
          >
            Simon Asnake
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 animate-fade-in-delay font-montserrat text-left">
            I transform data into actionable insights
          </h2>
          
          <p className="text-lg text-gray-400 mb-12 animate-fade-in-longer-delay font-inter max-w-2xl text-left">
            Data Scientist & Power BI Expert specializing in building exceptional digital experiences through data visualization and analytics.
          </p>
          
          <div className="flex gap-4 mb-16 text-left">
            <Button
              variant="outline"
              className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all text-white"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            
            <Button
              variant="outline"
              className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all text-white"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
