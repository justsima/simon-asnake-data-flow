
import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const blobContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Character animation
    const animateCharacters = () => {
      if (!nameRef.current) return;
      
      const spans = nameRef.current.querySelectorAll('.animate-character');
      spans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('character-visible');
        }, 100 * index + 1000); // Delay after initial page load
      });
    };

    // Create blobs dynamically
    const createBlobs = () => {
      if (!blobContainerRef.current) return;
      
      const container = blobContainerRef.current;
      
      // Clear previous blobs
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Blob configurations
      const blobConfigs = [
        { 
          color: '#162447', 
          size: '500px', 
          top: '10%', 
          left: '10%', 
          opacity: 0.15,
          animation: 'animate-blob-morph-1 animate-blob-move-1',
          delay: 0 
        },
        { 
          color: '#6A4C93', 
          size: '600px', 
          top: '30%', 
          left: '60%', 
          opacity: 0.15,
          animation: 'animate-blob-morph-2 animate-blob-move-2',
          delay: 200
        },
        { 
          color: '#1A7F8C', 
          size: '400px', 
          top: '60%', 
          left: '25%', 
          opacity: 0.18,
          animation: 'animate-blob-morph-1 animate-blob-move-1',
          delay: 400
        },
        { 
          color: '#2A4073', 
          size: '450px', 
          top: '15%', 
          left: '70%', 
          opacity: 0.2,
          animation: 'animate-blob-morph-2 animate-blob-move-2',
          delay: 600
        },
        { 
          color: '#8B7AAF', 
          size: '550px', 
          top: '70%', 
          left: '65%', 
          opacity: 0.15,
          animation: 'animate-blob-morph-1 animate-blob-move-1',
          delay: 800
        },
      ];
      
      // Create each blob
      blobConfigs.forEach((config, index) => {
        const blob = document.createElement('div');
        blob.classList.add('blob');
        
        Object.assign(blob.style, {
          width: config.size,
          height: config.size,
          top: config.top,
          left: config.left,
          backgroundColor: config.color,
          opacity: '0',
        });
        
        // Add animations
        config.animation.split(' ').forEach(animClass => {
          blob.classList.add(animClass);
        });
        
        container.appendChild(blob);
        
        // Trigger animation with slight delay between blobs
        setTimeout(() => {
          blob.classList.add('visible');
        }, config.delay);
      });
    };

    // Prepare name characters for animation
    const prepareName = () => {
      if (!nameRef.current) return;
      
      const nameText = nameRef.current.innerText;
      nameRef.current.innerHTML = '';
      
      // Create spans for each character
      for (let i = 0; i < nameText.length; i++) {
        const span = document.createElement('span');
        span.className = 'animate-character inline-block';
        span.textContent = nameText[i] === ' ' ? '\u00A0' : nameText[i];
        nameRef.current.appendChild(span);
      }
    };

    prepareName();
    createBlobs();
    
    // Trigger animations after initial load
    const timer = setTimeout(() => {
      animateCharacters();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient blob background */}
      <div ref={blobContainerRef} className="blob-container"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <h1 
          ref={nameRef}
          className="text-4xl md:text-6xl font-semibold text-portfolio-navy mb-4"
        >
          Simon Asnake
        </h1>
        
        <h2 className="text-xl md:text-2xl font-medium text-portfolio-purple mt-4 mb-6 opacity-0 animate-fade-in-delay">
          Data Scientist & Power BI Expert
        </h2>
        
        <p className="text-lg max-w-2xl mx-auto text-portfolio-darkText opacity-0 animate-fade-in-longer-delay">
          Transforming complex data into actionable business intelligence
        </p>
        
        {/* Social links */}
        <div className="mt-8 flex justify-center space-x-6 opacity-0 animate-fade-in-longer-delay">
          <a href="#" aria-label="LinkedIn" className="text-portfolio-navy hover:text-portfolio-purple transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" aria-label="GitHub" className="text-portfolio-navy hover:text-portfolio-purple transition-colors">
            <Github size={24} />
          </a>
          <a href="#" aria-label="Email" className="text-portfolio-navy hover:text-portfolio-purple transition-colors">
            <Mail size={24} />
          </a>
        </div>
        
        {/* CTA button */}
        <div className="mt-10 opacity-0 animate-fade-in-longer-delay">
          <a 
            href="#projects" 
            className="inline-block bg-portfolio-purple text-white font-medium py-3 px-8 rounded hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
