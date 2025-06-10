
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from './ui/carousel';

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
      className={`glass-card ${item.isEducation ? 'glass-layer-3' : ''} p-4 md:p-6 min-w-[280px] sm:min-w-[300px] max-w-[320px] md:max-w-[350px] transition-all duration-500
        ${isActive ? 'scale-105 md:scale-110 border-[#8A89FF]/30 bg-white/10 z-10' : 'hover:scale-[1.02]'}`}
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
    >
      <div className="flex items-start mb-3 md:mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${item.isEducation ? 'bg-[#8A89FF]/30' : 'bg-[#8A89FF]/15'} rounded-full flex items-center justify-center mr-3 md:mr-4 text-[#8A89FF]`}>
          <span className="text-lg md:text-xl">{item.isEducation ? '🎓' : '🏆'}</span>
        </div>
        <div>
          <h3 className="text-base md:text-lg font-medium text-white font-charis">{item.title}</h3>
          <p className="text-[#8A89FF] font-kiak text-sm md:text-base">{item.organization}</p>
        </div>
      </div>
      
      <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4 font-welland">{item.date}</p>
      
      <div>
        <p className="text-sm font-medium text-gray-300 mb-2 font-shunsine">
          {item.isEducation ? 'Focus Areas' : 'Skills Verified'}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <Badge 
              key={skill} 
              className={`${item.isEducation ? 'bg-[#8A89FF]/30' : 'bg-[#8A89FF]/15'} hover:bg-[#8A89FF]/20 text-[#8A89FF] border-[#8A89FF]/20 font-micuale`}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {isActive && (
        <motion.div 
          className="mt-4 pt-4 border-t border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-300 font-alberobello">
            {item.isEducation ? 'Graduation year: ' + item.date : 'Certification date: ' + item.date}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const CertificationsSection = () => {
  const [activeCert, setActiveCert] = useState<number | null>(0);
  const [api, setApi] = useState<any>();
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const isManualInteraction = useRef<boolean>(false);
  
  // Setup auto-scrolling - always enabled by default but with longer delay
  useEffect(() => {
    if (api) {
      // Clear any existing interval
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
      
      // Set new interval for auto-scrolling with 4 second delay
      autoScrollInterval.current = setInterval(() => {
        if (!isManualInteraction.current) {
          const nextIndex = activeCert === null ? 0 : (activeCert + 1) % certifications.length;
          setActiveCert(nextIndex);
          api.scrollTo(nextIndex, { duration: 1500 }); // Smooth transition over 1.5 seconds
        }
      }, 4000); // 4 second delay between slides
    }
    
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [api, activeCert]);
  
  // Handle manual interaction
  const handleManualInteraction = () => {
    isManualInteraction.current = true;
    
    // Clear existing auto-scroll
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    
    // Resume auto scroll after 15 seconds of inactivity
    const timeout = setTimeout(() => {
      isManualInteraction.current = false;
      
      if (api) {
        autoScrollInterval.current = setInterval(() => {
          if (!isManualInteraction.current) {
            const nextIndex = activeCert === null ? 0 : (activeCert + 1) % certifications.length;
            setActiveCert(nextIndex);
            api.scrollTo(nextIndex, { duration: 1500 });
          }
        }, 4000);
      }
    }, 15000);
    
    return () => clearTimeout(timeout);
  };
  
  const handleCardClick = (index: number) => {
    handleManualInteraction();
    setActiveCert(index);
    api?.scrollTo(index, { duration: 800 });
  };

  // Set up observation of carousel position
  useEffect(() => {
    if (api) {
      const onSelect = () => {
        const currentIndex = api.selectedScrollSnap();
        setActiveCert(currentIndex);
      };
      
      api.on("select", onSelect);
      
      return () => {
        api.off("select", onSelect);
      };
    }
    
    return undefined;
  }, [api]);

  return (
    <section id="certifications" className="py-20 bg-portfolio-darkBg relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080D] via-[#0C0C14] to-[#08080D] opacity-90"></div>
      
      {/* Glass backdrop */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3 md:mb-4 text-center font-alberobello px-4">
          <span className="bg-gradient-to-r from-[#8A89FF] via-[#7676FF] to-[#6262FF] bg-clip-text text-transparent">
            Education & Certifications
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto text-center mb-8 md:mb-12 font-welland px-4">
          Professional qualifications and academic background
        </p>
        
        {/* Certification Cards - Infinite Auto Scroll */}
        <div className="relative mt-6 max-w-6xl mx-auto px-4">
          <Carousel 
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              duration: 1500
            }}
            onMouseEnter={handleManualInteraction}
            onTouchStart={handleManualInteraction}
          >
            <CarouselContent className="py-4 md:py-8">
              {certifications.map((cert, index) => (
                <CarouselItem key={cert.title} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 pl-2 md:pl-4">
                  <div 
                    className="p-1" 
                    onClick={() => handleCardClick(index)}
                  >
                    <CertificationCard 
                      item={cert}
                      isActive={activeCert === index}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden">
              <CarouselPrevious onClick={handleManualInteraction} />
              <CarouselNext onClick={handleManualInteraction} />
            </div>
          </Carousel>
          
          {/* Scroll indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  handleManualInteraction();
                  setActiveCert(index);
                  api?.scrollTo(index, { duration: 800 });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCert === index 
                    ? 'bg-[#8A89FF] w-6' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
