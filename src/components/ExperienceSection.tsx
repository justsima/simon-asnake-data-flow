
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

const experiences: Experience[] = [
  {
    title: "Data Scientist/Analyst",
    company: "CodePoint Creatives",
    period: "January 2022 - Present",
    responsibilities: [
      "Lead data science projects for Fortune 500 clients across automotive, healthcare, and government sectors",
      "Develop custom Power BI dashboards and reports for executive decision-making",
      "Implement machine learning models for predictive analytics and business intelligence",
      "Create and optimize ETL pipelines for efficient data integration",
    ],
  },
  {
    title: "Software Developer",
    company: "CodePoint Creatives",
    period: "June 2020 - December 2021",
    responsibilities: [
      "Developed web applications and data integration solutions",
      "Collaborated with data teams on backend systems",
      "Implemented database solutions for client projects",
      "Contributed to automation of business processes",
    ],
  },
  {
    title: "Data Science Internship",
    company: "TechVision Labs",
    period: "January 2020 - May 2020",
    responsibilities: [
      "Assisted in data cleaning and preparation for ML projects",
      "Contributed to dashboard development",
      "Performed statistical analysis of business data",
      "Helped document data science methodologies",
    ],
  },
];

// Component for animated text that reveals character by character
const AnimatedText = ({ text, delay = 0, className = "", visible = false }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <span 
          key={`${text}-${index}`}
          className={`inline-block transition-all duration-500 ${
            visible 
              ? "opacity-100 transform-none" 
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${delay + index * 30}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

// Component for a single experience card
const ExperienceCard = ({ 
  experience, 
  index, 
  isVisible, 
  isActive, 
  onClick 
}: { 
  experience: Experience;
  index: number;
  isVisible: boolean;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Toggle collapsible content
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div 
      className={`experience-card ${isActive ? 'is-active' : ''} ${isVisible ? 'is-visible' : ''}`}
      onClick={onClick}
    >
      <Card 
        className={`
          transition-all duration-700 mb-6
          transform ${isActive ? 'scale-105' : 'scale-100'} 
          ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}
        `}
        style={{
          transitionDelay: `${index * 100}ms`,
          background: 'rgba(32, 30, 67, 0.4)',
          backdropFilter: 'blur(12px)',
          border: isActive ? '1px solid rgba(138, 137, 255, 0.3)' : '1px solid rgba(138, 137, 255, 0.1)',
          boxShadow: isActive ? '0 8px 32px rgba(138, 137, 255, 0.15)' : '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardContent className="p-6">
          <div className="mb-4">
            <AnimatedText 
              text={experience.title}
              delay={index * 100}
              visible={isVisible}
              className="text-xl font-medium text-white mb-1"
            />
            
            <AnimatedText 
              text={experience.company}
              delay={(index * 100) + 200}
              visible={isVisible}
              className="text-[#8A89FF] font-medium mb-2"
            />
            
            <AnimatedText 
              text={experience.period}
              delay={(index * 100) + 300}
              visible={isVisible}
              className="text-sm text-gray-400 mb-4"
            />
          </div>
          
          <Collapsible open={isOpen} onOpenChange={toggleOpen}>
            <CollapsibleTrigger className="flex items-center text-sm text-[#8A89FF] hover:text-white transition-colors mb-3">
              <span>View responsibilities</span>
              <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-3">
              <ul className="space-y-3 mt-2">
                {experience.responsibilities.map((item, i) => (
                  <li 
                    key={i} 
                    className={`
                      text-sm text-gray-300 flex items-start
                      transition-all duration-500
                      ${isOpen ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <span className="w-1 h-1 bg-[#8A89FF] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Experience Section Component
const ExperienceSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(experiences.length).fill(false));
  const [isScrolling, setIsScrolling] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Handle intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in cards with delay
            const newVisibleItems = [...visibleItems];
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
  
  // Handle horizontal scroll for desktop using wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (cardsRef.current && e.deltaY !== 0) {
        const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
        
        if (isVerticalScroll && window.innerWidth >= 768) {
          e.preventDefault();
          cardsRef.current.scrollLeft += e.deltaY;
          
          // Update active card based on scroll position
          updateActiveCard();
          
          // Set scrolling state for animation effects
          setIsScrolling(true);
          clearTimeout(scrollingTimeout);
          const scrollingTimeout = setTimeout(() => {
            setIsScrolling(false);
          }, 150);
        }
      }
    };
    
    // Track scroll position and update active card
    const updateActiveCard = () => {
      if (!cardsRef.current) return;
      
      const scrollPosition = cardsRef.current.scrollLeft;
      const cardWidth = cardsRef.current.offsetWidth / experiences.length;
      const newActive = Math.round(scrollPosition / cardWidth);
      
      if (newActive !== activeCard && newActive < experiences.length) {
        setActiveCard(newActive);
      }
    };
    
    // Add scroll event listener
    const element = cardsRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      element.addEventListener('scroll', updateActiveCard);
    }
    
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
        element.removeEventListener('scroll', updateActiveCard);
      }
    };
  }, [activeCard]);

  // Activate a card when clicked
  const handleCardClick = (index: number) => {
    setActiveCard(index);
    
    // Scroll to the card
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.offsetWidth / experiences.length;
      cardsRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCard === null) return;
      
      if (e.key === 'ArrowRight' && activeCard < experiences.length - 1) {
        handleCardClick(activeCard + 1);
      } else if (e.key === 'ArrowLeft' && activeCard > 0) {
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
        
        {/* Experience cards container - horizontal scroll on desktop, vertical on mobile */}
        <div className="relative">
          <ScrollArea className="w-full h-auto pb-8" orientation="horizontal">
            <div 
              ref={cardsRef}
              className="experience-cards flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 md:pb-6 px-2"
              style={{ width: '100%', minWidth: '100%' }}
            >
              {experiences.map((exp, index) => (
                <div 
                  key={`${exp.company}-${exp.title}`} 
                  className="md:w-[85%] lg:w-[70%] md:flex-shrink-0 md:flex-grow-0"
                >
                  <ExperienceCard
                    experience={exp}
                    index={index}
                    isVisible={visibleItems[index]}
                    isActive={activeCard === index}
                    onClick={() => handleCardClick(index)}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Card navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeCard === index
                    ? 'bg-[#8A89FF] w-6'
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`View experience ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-[#8A89FF] opacity-30 ${isScrolling ? 'animate-float' : ''}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`,
            }}
          />
        ))}
      </div>

      {/* Custom styles for this component */}
      <style>
        {`
          .experience-card {
            perspective: 1000px;
            cursor: pointer;
          }
          
          .experience-card.is-active .card {
            transform: translateY(-5px) rotateX(5deg);
          }
          
          .experience-card:hover .card {
            transform: translateY(-5px);
          }
          
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
        `}
      </style>
    </section>
  );
};

export default ExperienceSection;
