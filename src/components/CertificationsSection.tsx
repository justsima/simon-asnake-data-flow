import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface Certification {
  title: string;
  organization: string;
  date: string;
  skills: string[];
  image?: string;
  isEducation?: boolean;
}

const certifications: Certification[] = [
  {
    title: "Bachelor's in Computer Science",
    organization: "Hilcoe School",
    date: "2019",
    skills: ["Data Structures", "Algorithms", "Database Systems"],
    isEducation: true,
  },
  {
    title: "IBM Certified Data Scientist",
    organization: "IBM",
    date: "November 2022",
    skills: ["Machine Learning", "Statistical Analysis", "Python"],
  },
  {
    title: "365 Data Science Certified Data Scientist",
    organization: "365 Data Science",
    date: "August 2022",
    skills: ["Data Analysis", "Visualization", "Statistical Modeling"],
  },
  {
    title: "365 Data Science Certified Data Analyst",
    organization: "365 Data Science",
    date: "May 2022",
    skills: ["SQL", "Data Visualization", "Business Intelligence"],
  },
  {
    title: "PwC Power BI Job Simulation",
    organization: "PwC/Forage",
    date: "March 2022",
    skills: ["Dashboard Development", "Data Transformation", "DAX"],
  },
  {
    title: "Microsoft Power BI Specialist",
    organization: "Microsoft",
    date: "January 2022",
    skills: ["Power BI", "Data Modeling", "DAX Functions"],
  },
  {
    title: "SQL Advanced Certification",
    organization: "DataCamp",
    date: "December 2021",
    skills: ["Complex Queries", "Database Design", "Optimization"],
  }
];

const CertificationCard = ({ 
  item,
  isActive
}: { 
  item: Certification;
  isActive: boolean;
}) => {
  return (
    <motion.div 
      className={`glass-card p-4 md:p-6 min-w-[280px] sm:min-w-[300px] max-w-[320px] md:max-w-[350px] transition-all duration-500 will-change-transform
        ${isActive ? 'scale-105 md:scale-110 z-10' : 'hover:scale-[1.02]'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? (window.innerWidth < 768 ? 1.05 : 1.1) : 1
      }}
      transition={{ 
        duration: 0.5,
        scale: {
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }}
      style={{
        borderColor: isActive ? 'var(--color-border-secondary)' : 'var(--color-border-muted)',
        background: isActive ? 'rgba(22, 27, 34, 0.8)' : 'rgba(22, 27, 34, 0.6)'
      }}
    >
      <div className="flex items-start mb-3 md:mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4 text-2xl`}
             style={{ 
               background: item.isEducation 
                 ? 'rgba(138, 137, 255, 0.3)' 
                 : 'rgba(138, 137, 255, 0.15)',
               color: 'var(--color-primary-500)'
             }}>
          {item.isEducation ? '🎓' : '🏆'}
        </div>
        <div>
          <h3 className="text-base md:text-lg font-medium font-montserrat" style={{ color: 'var(--color-text-primary)' }}>
            {item.title}
          </h3>
          <p className="text-sm md:text-base font-inter" style={{ color: 'var(--color-primary-500)' }}>
            {item.organization}
          </p>
        </div>
      </div>
      
      <p className="text-xs md:text-sm mb-3 md:mb-4 font-inter" style={{ color: 'var(--color-text-muted)' }}>
        {item.date}
      </p>
      
      <div>
        <p className="text-sm font-medium mb-2 font-montserrat" style={{ color: 'var(--color-text-secondary)' }}>
          {item.isEducation ? 'Focus Areas' : 'Skills Verified'}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <Badge 
              key={skill} 
              className="font-inter transition-colors duration-200"
              style={{ 
                background: item.isEducation 
                  ? 'rgba(138, 137, 255, 0.3)' 
                  : 'rgba(138, 137, 255, 0.15)',
                color: 'var(--color-primary-500)',
                borderColor: 'rgba(138, 137, 255, 0.2)'
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {isActive && (
        <motion.div 
          className="mt-4 pt-4 border-t"
          style={{ borderColor: 'var(--color-border-muted)' }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs font-inter" style={{ color: 'var(--color-text-secondary)' }}>
            {item.isEducation ? 'Graduation year: ' + item.date : 'Certification date: ' + item.date}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const CertificationsSection = () => {
  const [activeCert, setActiveCert] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const isManualInteraction = useRef<boolean>(false);
  
  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.desktop;
    if (window.innerWidth < 640) return itemsPerView.mobile;
    if (window.innerWidth < 1024) return itemsPerView.tablet;
    return itemsPerView.desktop;
  };

  const [itemsVisible, setItemsVisible] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsVisible(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, certifications.length - itemsVisible);

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    
    autoScrollInterval.current = setInterval(() => {
      if (!isManualInteraction.current) {
        setCurrentIndex(prev => (prev + 1) % (maxIndex + 1));
        setActiveCert(prev => (prev + 1) % certifications.length);
      }
    }, 4000);
    
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [maxIndex]);
  
  const handleManualInteraction = () => {
    isManualInteraction.current = true;
    
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    
    setTimeout(() => {
      isManualInteraction.current = false;
    }, 10000);
  };

  const goToNext = () => {
    handleManualInteraction();
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const goToPrev = () => {
    handleManualInteraction();
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (index: number) => {
    handleManualInteraction();
    setCurrentIndex(Math.min(index, maxIndex));
    setActiveCert(index);
  };

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-90" style={{
        background: `linear-gradient(to bottom, var(--color-surface-primary), var(--color-surface-secondary), var(--color-surface-primary))`
      }}></div>
      
      {/* Glass backdrop */}
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(0, 0, 0, 0.1)' }}></div>
      
      <div className="mobile-container relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-center font-playfair px-4">
          <span className="text-gradient-primary">
            Education & Certifications
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-center mb-8 md:mb-12 font-inter px-4"
           style={{ color: 'var(--color-text-secondary)' }}>
          Professional qualifications and academic background
        </p>
        
        {/* Mobile-optimized carousel */}
        <div className="relative mt-6 max-w-6xl mx-auto">
          {/* Navigation buttons - hidden on mobile */}
          <div className="hidden md:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 justify-between pointer-events-none z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="glass-button pointer-events-auto -ml-6 touch-target"
              style={{ 
                background: 'rgba(22, 27, 34, 0.8)',
                borderColor: 'var(--color-border-secondary)'
              }}
            >
              <ChevronLeft className="h-4 w-4" style={{ color: 'var(--color-text-primary)' }} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              className="glass-button pointer-events-auto -mr-6 touch-target"
              style={{ 
                background: 'rgba(22, 27, 34, 0.8)',
                borderColor: 'var(--color-border-secondary)'
              }}
            >
              <ChevronRight className="h-4 w-4" style={{ color: 'var(--color-text-primary)' }} />
            </Button>
          </div>

          {/* Carousel container */}
          <div 
            ref={containerRef}
            className="overflow-hidden px-4 md:px-8"
            onTouchStart={handleManualInteraction}
          >
            <div 
              className="flex transition-transform duration-500 ease-out gap-4 md:gap-6"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
                width: `${(certifications.length / itemsVisible) * 100}%`
              }}
            >
              {certifications.map((cert, index) => (
                <div 
                  key={cert.title} 
                  className="flex-shrink-0"
                  style={{ width: `${100 / certifications.length}%` }}
                  onClick={() => goToSlide(index)}
                >
                  <CertificationCard 
                    item={cert}
                    isActive={activeCert === index}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 touch-target ${
                  currentIndex === index 
                    ? 'w-6' 
                    : 'hover:opacity-60'
                }`}
                style={{
                  background: currentIndex === index 
                    ? 'var(--color-primary-500)' 
                    : 'rgba(255, 255, 255, 0.2)'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe indicator for mobile */}
          <div className="md:hidden text-center mt-4">
            <p className="text-xs font-inter" style={{ color: 'var(--color-text-muted)' }}>
              Swipe or tap to navigate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;