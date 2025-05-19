
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
      className={`glass-card ${item.isEducation ? 'glass-layer-3' : ''} p-6 min-w-[300px] max-w-[350px] transition-all duration-500
        ${isActive ? 'scale-105 border-[#8A89FF]/30 bg-white/10' : 'hover:scale-[1.02]'}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start mb-4">
        <div className={`w-12 h-12 ${item.isEducation ? 'bg-[#8A89FF]/20' : 'bg-[#8A89FF]/10'} rounded-full flex items-center justify-center mr-4 text-[#8A89FF]`}>
          <span className="text-xl">{item.isEducation ? '🎓' : '🏆'}</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">{item.title}</h3>
          <p className="text-[#8A89FF]">{item.organization}</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">{item.date}</p>
      
      <div>
        <p className="text-sm font-medium text-gray-300 mb-2">
          {item.isEducation ? 'Focus Areas' : 'Skills Verified'}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <Badge 
              key={skill} 
              className={`${item.isEducation ? 'bg-[#8A89FF]/20' : 'bg-[#8A89FF]/10'} hover:bg-[#8A89FF]/20 text-[#8A89FF] border-[#8A89FF]/20`}
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
        >
          <p className="text-xs text-gray-300">
            {item.isEducation ? 'Graduation year: ' + item.date : 'Certification date: ' + item.date}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const CertificationsSection = () => {
  const [activeCert, setActiveCert] = useState<number | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [api, setApi] = useState<any>();
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Setup auto-scrolling
  useEffect(() => {
    if (autoScroll && api) {
      autoScrollInterval.current = setInterval(() => {
        api.scrollNext();
      }, 4000);
    }
    
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [autoScroll, api]);
  
  // Handle manual interaction
  const handleManualInteraction = () => {
    setAutoScroll(false);
    
    // Resume auto scroll after 10 seconds of inactivity
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    
    const timeout = setTimeout(() => {
      setAutoScroll(true);
    }, 10000);
    
    return () => clearTimeout(timeout);
  };
  
  const handleCardClick = (index: number) => {
    handleManualInteraction();
    setActiveCert(activeCert === index ? null : index);
  };

  return (
    <section id="certifications" className="py-20 bg-portfolio-darkBg relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080D] via-[#0C0C14] to-[#08080D] opacity-90"></div>
      
      {/* Glass backdrop */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center">
          <span className="bg-gradient-to-r from-[#8A89FF] via-[#7676FF] to-[#6262FF] bg-clip-text text-transparent">
            Education & Certifications
          </span>
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12">
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
              duration: 800 // Set the duration here for all transitions
            }}
            onMouseEnter={handleManualInteraction}
            onTouchStart={handleManualInteraction}
          >
            <CarouselContent className="py-4">
              {certifications.map((cert, index) => (
                <CarouselItem key={cert.title} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 pl-4">
                  <div className="p-1" onClick={() => handleCardClick(index)}>
                    <CertificationCard 
                      item={cert}
                      isActive={activeCert === index}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden sm:block">
              <CarouselPrevious 
                onClick={handleManualInteraction} 
                className="glass-morphism-light rounded-full -left-4 lg:-left-8 hover:bg-[#8A89FF]/20 hover:border-[#8A89FF]/30"
              />
              <CarouselNext 
                onClick={handleManualInteraction} 
                className="glass-morphism-light rounded-full -right-4 lg:-right-8 hover:bg-[#8A89FF]/20 hover:border-[#8A89FF]/30"
              />
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
                  api?.scrollTo(index);
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
          
          {/* Auto-scroll indicator */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setAutoScroll(!autoScroll)}
              className={`text-xs px-3 py-1 rounded-full transition-all ${
                autoScroll ? 'bg-[#8A89FF]/20 text-[#8A89FF]' : 'bg-white/5 text-gray-400'
              }`}
            >
              {autoScroll ? 'Auto-scroll On' : 'Auto-scroll Off'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
