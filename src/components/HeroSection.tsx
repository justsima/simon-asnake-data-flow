
import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Home, User, Code } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { Button } from './ui/button';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Character animation will start after component mount
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-fade-in');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 text-center z-10">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 opacity-0 transition-all duration-1000"
        >
          Simon Asnake
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-gray-400 mb-8 animate-fade-in-delay">
          I transform data into actionable insights
        </h2>
        
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 animate-fade-in-longer-delay">
          Data Scientist & Power BI Expert specializing in building exceptional digital experiences through data visualization and analytics.
        </p>
        
        <div className="flex justify-center gap-4 mb-16">
          <Button
            variant="outline"
            className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-800 transition-all"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </Button>
          
          <Button
            variant="outline"
            className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-800 transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in touch
          </Button>
        </div>

        <div className="flex justify-center gap-6 text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            <Home className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <User className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Code className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
