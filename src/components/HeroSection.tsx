
import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const blobContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Character animation
    const animateText = () => {
      if (!nameRef.current) return;
      
      // First name animation
      const firstName = nameRef.current.querySelector('.first-name');
      const firstNameChars = firstName?.querySelectorAll('.animate-character');
      
      firstNameChars?.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('animate-character-reveal-up');
        }, 3000 + (100 * index)); // Start after blob animation
      });
      
      // Last name animation with slight delay
      const lastName = nameRef.current.querySelector('.last-name');
      const lastNameChars = lastName?.querySelectorAll('.animate-character');
      
      lastNameChars?.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('animate-character-reveal-down');
        }, 3500 + (100 * index));
      });
      
      // Subtitle animation
      setTimeout(() => {
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
          subtitle.classList.add('animate-text-shimmer');
        }
      }, 4500);
      
      // Description animation
      setTimeout(() => {
        const description = document.querySelector('.description');
        if (description) {
          description.classList.remove('opacity-0');
          description.classList.add('animate-fade-in');
        }
      }, 5000);
      
      // Social links and CTA animation
      setTimeout(() => {
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks) {
          socialLinks.classList.remove('opacity-0');
          socialLinks.classList.add('animate-fade-in');
        }
        
        const cta = document.querySelector('.cta-button');
        if (cta) {
          cta.classList.remove('opacity-0');
          cta.classList.add('animate-fade-in-delay');
        }
      }, 5400);
    };

    // Create blobs dynamically
    const createBlobs = () => {
      if (!blobContainerRef.current) return;
      
      const container = blobContainerRef.current;
      
      // Clear previous blobs
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Blob configurations - more subtle colors for dark theme
      const blobConfigs = [
        { 
          color: 'rgba(26, 36, 71, 0.7)', // Deep navy
          size: '700px', 
          top: '10%', 
          left: '10%',
          delay: 500 
        },
        { 
          color: 'rgba(106, 76, 147, 0.5)', // Purple
          size: '650px', 
          top: '30%', 
          left: '65%',
          delay: 800
        },
        { 
          color: 'rgba(26, 127, 140, 0.5)', // Teal
          size: '600px', 
          top: '60%', 
          left: '20%',
          delay: 1100
        },
        { 
          color: 'rgba(42, 64, 115, 0.6)', // Medium blue
          size: '550px', 
          top: '15%', 
          left: '70%',
          delay: 1400
        },
        { 
          color: 'rgba(139, 122, 175, 0.4)', // Lavender
          size: '500px', 
          top: '75%', 
          left: '70%',
          delay: 1700
        },
      ];
      
      // Create each blob
      blobConfigs.forEach((config) => {
        const blob = document.createElement('div');
        blob.classList.add('blob');
        blob.classList.add('animate-blob-morph-slow');
        blob.classList.add('animate-blob-move-slow');
        
        Object.assign(blob.style, {
          width: config.size,
          height: config.size,
          top: config.top,
          left: config.left,
          backgroundColor: config.color,
          opacity: '0',
        });
        
        container.appendChild(blob);
        
        // Trigger animation with staggered delay
        setTimeout(() => {
          blob.classList.add('visible');
        }, config.delay);
      });
    };

    // Prepare name characters for animation
    const prepareName = () => {
      if (!nameRef.current) return;
      
      const firstName = "Simon";
      const lastName = "Asnake";
      
      // Clear current content
      nameRef.current.innerHTML = '';
      
      // Create first name container
      const firstNameContainer = document.createElement('div');
      firstNameContainer.className = 'first-name inline-block mr-4';
      
      // Create last name container
      const lastNameContainer = document.createElement('div');
      lastNameContainer.className = 'last-name inline-block';
      
      // Create spans for first name
      for (let i = 0; i < firstName.length; i++) {
        const span = document.createElement('span');
        span.className = 'animate-character inline-block';
        span.textContent = firstName[i];
        firstNameContainer.appendChild(span);
      }
      
      // Create spans for last name
      for (let i = 0; i < lastName.length; i++) {
        const span = document.createElement('span');
        span.className = 'animate-character inline-block';
        span.textContent = lastName[i];
        lastNameContainer.appendChild(span);
      }
      
      // Append name containers to nameRef
      nameRef.current.appendChild(firstNameContainer);
      nameRef.current.appendChild(lastNameContainer);
    };

    // Initialize animations in sequence
    const initAnimation = () => {
      createBlobs(); // Start with blob creation
      prepareName(); // Then prepare the name for animation
      animateText(); // Finally animate the text elements
    };
    
    initAnimation();
    
    // Cleanup function
    return () => {
      if (blobContainerRef.current) {
        while (blobContainerRef.current.firstChild) {
          blobContainerRef.current.removeChild(blobContainerRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient blob background */}
      <div ref={blobContainerRef} className="blob-container"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <h1 
          ref={nameRef}
          className="fancy-heading text-5xl md:text-7xl font-semibold mb-4"
        >
          {/* Text will be injected by JavaScript */}
        </h1>
        
        <h2 className="subtitle fancy-subtitle text-xl md:text-2xl font-medium mt-4 mb-6">
          Data Scientist & Power BI Expert
        </h2>
        
        <p className="description opacity-0 text-lg max-w-2xl mx-auto text-gray-300 mt-6">
          Transforming complex data into actionable business intelligence
        </p>
        
        {/* Social links */}
        <div className="social-links opacity-0 mt-10 flex justify-center space-x-6">
          <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-portfolio-purple transition-colors transform hover:scale-110 duration-200">
            <Linkedin size={28} />
          </a>
          <a href="#" aria-label="GitHub" className="text-gray-300 hover:text-portfolio-purple transition-colors transform hover:scale-110 duration-200">
            <Github size={28} />
          </a>
          <a href="#" aria-label="Email" className="text-gray-300 hover:text-portfolio-purple transition-colors transform hover:scale-110 duration-200">
            <Mail size={28} />
          </a>
        </div>
        
        {/* CTA button */}
        <div className="mt-12">
          <a 
            href="#projects" 
            className="cta-button opacity-0 inline-block bg-transparent text-white font-medium py-3 px-8 rounded border-2 border-portfolio-purple hover:bg-portfolio-purple/20 transition-all transform hover:scale-105 duration-200"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
