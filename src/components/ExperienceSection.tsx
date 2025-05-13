
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { experiences } from './experience/experienceData';
import ExperienceCard from './experience/ExperienceCard';
import ExperienceTimeline from './experience/ExperienceTimeline';
import FloatingParticles from './experience/FloatingParticles';

// Extend Window interface to include our custom property
declare global {
  interface Window {
    scrollEndTimer: number | undefined;
  }
}

const ExperienceSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(experiences.length).fill(false));
  const [isScrolling, setIsScrolling] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
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

  // Scroll to active card when it changes
  useEffect(() => {
    if (activeCard !== null && cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.experience-card');
      const activeCardElement = cards[activeCard];
      
      if (activeCardElement) {
        activeCardElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }
  }, [activeCard]);

  // Update active card based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!cardsContainerRef.current) return;
      
      setIsScrolling(true);
      
      // Add debounce for scroll end detection
      clearTimeout(window.scrollEndTimer);
      window.scrollEndTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150) as unknown as number;
      
      // Calculate which experience card is most visible in the viewport
      const cards = Array.from(document.querySelectorAll('.experience-card'));
      if (cards.length === 0) return;
      
      let maxVisibleCard = 0;
      let maxVisibleAmount = 0;
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // If card is in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
          // Calculate how centered the card is in the viewport
          const cardMiddle = rect.top + rect.height / 2;
          const viewportMiddle = viewportHeight / 2;
          
          const distanceFromCenter = Math.abs(cardMiddle - viewportMiddle);
          const visibilityScore = 1 - (distanceFromCenter / (viewportHeight / 2));
          
          if (visibilityScore > maxVisibleAmount) {
            maxVisibleAmount = visibilityScore;
            maxVisibleCard = index;
          }
        }
      });
      
      if (maxVisibleAmount > 0.3 && activeCard !== maxVisibleCard) {
        setActiveCard(maxVisibleCard);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(window.scrollEndTimer);
    };
  }, [activeCard]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCard === null) return;
      
      if (e.key === 'ArrowDown' && activeCard < experiences.length - 1) {
        setActiveCard(activeCard + 1);
      } else if (e.key === 'ArrowUp' && activeCard > 0) {
        setActiveCard(activeCard - 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCard]);

  // Activate a card when clicking on timeline node
  const handleNodeClick = (index: number) => {
    setActiveCard(index);
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden snap-y snap-mandatory"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center font-playfair">Work Experience</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-16 font-inter">
          My professional journey in data science and software development
        </p>
        
        {/* Timeline layout with vertical experience cards */}
        <div className="grid md:grid-cols-[100px_1fr] gap-8 mt-16 relative max-w-5xl mx-auto">
          {/* Timeline column - vertical timeline with nodes */}
          <div 
            ref={timelineRef}
            className="hidden md:flex flex-col items-center sticky top-20 self-start h-[80vh]"
          >
            <ExperienceTimeline 
              activeIndex={activeCard} 
              experienceCount={experiences.length} 
              onNodeClick={handleNodeClick} 
            />
          </div>
          
          {/* Experience cards column - vertical layout */}
          <div 
            ref={cardsContainerRef} 
            className="space-y-[40vh] pb-[40vh]"
          >
            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.title}`}
                id={`experience-${index}`}
                className="scroll-mt-20 min-h-[80vh] snap-center"
              >
                <ExperienceCard
                  experience={exp}
                  index={index}
                  isVisible={visibleItems[index]}
                  isActive={activeCard === index}
                  onClick={() => setActiveCard(index)}
                />
                
                {/* Mobile timeline indicator (only visible on mobile) */}
                <div className="flex md:hidden items-center justify-center mt-8 space-x-2">
                  {experiences.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleNodeClick(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeCard === i
                          ? 'bg-[#8A89FF] w-6'
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
      </motion.div>
      
      {/* Floating particles effect */}
      <FloatingParticles isScrolling={isScrolling} />

      {/* Additional scroll guidance */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-sm mb-2">Scroll to explore</p>
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-gray-400 rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
          />
        </motion.div>
      </motion.div>

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
          
          .snap-center {
            scroll-snap-align: center;
          }
        `}
      </style>
    </section>
  );
};

export default ExperienceSection;
