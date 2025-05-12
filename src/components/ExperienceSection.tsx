
import { useState, useEffect, useRef } from 'react';
import { experiences } from './experience/experienceData';
import TimelineNode from './experience/TimelineNode';
import ExperienceCard from './experience/ExperienceCard';
import FloatingParticles from './experience/FloatingParticles';

const ExperienceSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(experiences.length).fill(false));
  const [isScrolling, setIsScrolling] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Handle intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in cards with delay
            experiences.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const updated = [...prev];
                  updated[index] = true;
                  return updated;
                });
              }, 500 + index * 200);
            });
            
            // Set first card as active after a delay
            setTimeout(() => {
              setActiveCard(0);
            }, 1000);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Update active card based on scroll position
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      // Calculate which experience card is most visible in the viewport
      const cards = Array.from(document.querySelectorAll('.experience-card'));
      if (cards.length === 0) return;
      
      let maxVisibleCard = 0;
      let maxVisibleAmount = 0;
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibleRatio = visibleHeight / rect.height;
        
        if (visibleRatio > maxVisibleAmount) {
          maxVisibleAmount = visibleRatio;
          maxVisibleCard = index;
        }
      });
      
      if (maxVisibleAmount > 0.3) {
        setActiveCard(maxVisibleCard);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Activate a card when clicked and scroll to it
  const handleCardClick = (index: number) => {
    setActiveCard(index);
    
    // Find the card element and scroll to it
    const cards = document.querySelectorAll('.experience-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCard === null) return;
      
      if (e.key === 'ArrowDown' && activeCard < experiences.length - 1) {
        handleCardClick(activeCard + 1);
      } else if (e.key === 'ArrowUp' && activeCard > 0) {
        handleCardClick(activeCard - 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCard]);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center font-playfair">Work Experience</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12 font-inter">
          My professional journey in data science and software development
        </p>
        
        {/* Timeline layout with vertical experience cards */}
        <div className="grid md:grid-cols-[100px_1fr] gap-8 mt-16 relative max-w-4xl mx-auto">
          {/* Timeline column - vertical timeline with nodes */}
          <div 
            ref={timelineRef}
            className="hidden md:flex flex-col items-center space-y-36 sticky top-20 self-start"
            style={{ height: 'fit-content' }}
          >
            {experiences.map((_, index) => (
              <TimelineNode
                key={index}
                index={index}
                isActive={activeCard === index}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
          
          {/* Experience cards column - vertical layout */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.title}`}
                id={`experience-${index}`}
                className="scroll-mt-20"
              >
                <ExperienceCard
                  experience={exp}
                  index={index}
                  isVisible={visibleItems[index]}
                  isActive={activeCard === index}
                  onClick={() => setActiveCard(index)}
                />
                
                {/* Mobile timeline indicator (only visible on mobile) */}
                <div className="flex md:hidden items-center justify-center mt-2 space-x-2">
                  {experiences.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleCardClick(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeCard === i
                          ? 'bg-[#8A89FF] w-4'
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                      aria-label={`View experience ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <FloatingParticles isScrolling={isScrolling} />

      {/* Custom styles for this component */}
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            .experience-card, .card, .inline-block {
              transition: none !important;
              transform: none !important;
              animation: none !important;
            }
            
            .experience-card.is-visible .card {
              opacity: 1 !important;
              transform: none !important;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default ExperienceSection;
