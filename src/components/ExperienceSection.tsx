
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
  const cardsRef = useRef<HTMLDivElement>(null);
  
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
    if (activeCard !== null && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.experience-card');
      const activeCardElement = cards[activeCard];
      
      if (activeCardElement) {
        activeCardElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }
  }, [activeCard]);

  // Update active card based on scroll position
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (!cardsRef.current) return;
      
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
        const viewportHeight = window.innerHeight;
        const cardHeight = rect.height;
        const cardMiddle = rect.top + cardHeight / 2;
        const viewportMiddle = viewportHeight / 2;
        
        // Calculate how centered the card is in the viewport
        const distanceFromCenter = Math.abs(cardMiddle - viewportMiddle);
        const normalizedDistance = 1 - (distanceFromCenter / (viewportHeight / 2));
        const visibilityScore = Math.max(0, normalizedDistance);
        
        if (visibilityScore > maxVisibleAmount) {
          maxVisibleAmount = visibilityScore;
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
      className="py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center font-playfair">Work Experience</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-16 font-inter">
          My professional journey in data science and software development
        </p>
        
        {/* Timeline layout with vertical experience cards */}
        <div className="grid md:grid-cols-[100px_1fr] gap-8 mt-16 relative max-w-4xl mx-auto">
          {/* Timeline column - vertical timeline with nodes */}
          <div 
            ref={timelineRef}
            className="hidden md:flex flex-col items-center space-y-36 sticky top-20 self-start h-[80vh]"
          >
            <div className="h-full flex flex-col items-center justify-around">
              {experiences.map((_, index) => (
                <TimelineNode
                  key={index}
                  index={index}
                  isActive={activeCard === index}
                  onClick={() => handleNodeClick(index)}
                  isFirstNode={index === 0}
                  isLastNode={index === experiences.length - 1}
                />
              ))}
            </div>
          </div>
          
          {/* Experience cards column - vertical layout */}
          <div ref={cardsRef} className="space-y-36">
            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.title}`}
                id={`experience-${index}`}
                className="scroll-mt-20 min-h-[300px]"
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
                      onClick={() => handleNodeClick(i)}
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
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </section>
  );
};

export default ExperienceSection;
