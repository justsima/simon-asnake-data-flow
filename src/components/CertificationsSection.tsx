
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Certification {
  title: string;
  organization: string;
  date: string;
  skills: string[];
  image?: string;
}

const certifications: Certification[] = [
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

const education = {
  degree: "Bachelor's in Computer Science",
  institution: "Hilcoe School",
  year: "2019",
  focus: ["Data Structures", "Algorithms", "Database Systems"],
};

const CertificationCard = ({ 
  item, 
  onClick,
  isActive
}: { 
  item: Certification; 
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <motion.div 
      className={`glass-card bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg min-w-[300px] max-w-[350px] transition-all duration-500
        ${isActive ? 'scale-105 border-[#8A89FF]/30 bg-white/10' : 'hover:scale-[1.02]'}`}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 bg-[#8A89FF]/10 rounded-full flex items-center justify-center mr-4 text-[#8A89FF]">
          <span className="text-xl">🏆</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">{item.title}</h3>
          <p className="text-[#8A89FF]">{item.organization}</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">{item.date}</p>
      
      <div>
        <p className="text-sm font-medium text-gray-300 mb-2">Skills Verified</p>
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <Badge 
              key={skill} 
              className="bg-[#8A89FF]/10 hover:bg-[#8A89FF]/20 text-[#8A89FF] border-[#8A89FF]/20"
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
            Click to view full certification details
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const CertificationsSection = () => {
  const [activeCert, setActiveCert] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newPosition = scrollPosition - 350;
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(Math.max(0, newPosition));
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const newPosition = scrollPosition + 350;
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(Math.min(maxScroll, newPosition));
    }
  };
  
  const handleCardClick = (index: number) => {
    setActiveCert(activeCert === index ? null : index);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  return (
    <section id="certifications" className="py-20 bg-portfolio-darkBg relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080D] via-[#0C0C14] to-[#08080D] opacity-90"></div>
      
      {/* Glass backdrop */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center">
          <span className="bg-gradient-to-r from-[#8A89FF] via-[#7676FF] to-[#6262FF] bg-clip-text text-transparent">
            Certifications & Education
          </span>
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12">
          Professional qualifications and educational background
        </p>
        
        {/* Education Card */}
        <div className="glass-card bg-[#161B22]/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl max-w-lg mx-auto mb-16">
          <div className="flex items-start mb-4">
            <div className="w-12 h-12 bg-[#8A89FF]/10 rounded-full flex items-center justify-center mr-4 text-white">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">{education.degree}</h3>
              <p className="text-[#8A89FF]">{education.institution}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 mb-4">Graduation: {education.year}</p>
          
          <div>
            <p className="text-sm font-medium text-gray-300 mb-2">Focus Areas</p>
            <div className="flex flex-wrap gap-2">
              {education.focus.map((area) => (
                <Badge 
                  key={area} 
                  className="bg-[#8A89FF]/10 hover:bg-[#8A89FF]/20 text-[#8A89FF] border-[#8A89FF]/20"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Certification Cards - Infinite Scroll */}
        <div className="relative mt-12">
          <h3 className="text-xl font-medium text-white text-center mb-8">Professional Certifications</h3>
          
          {/* Navigation buttons */}
          <button 
            onClick={scrollLeft} 
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#161B22]/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#8A89FF]/20 transition-all duration-300"
            aria-label="Scroll left"
          >
            <ArrowLeft size={18} />
          </button>
          
          <button 
            onClick={scrollRight} 
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#161B22]/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#8A89FF]/20 transition-all duration-300"
            aria-label="Scroll right"
          >
            <ArrowRight size={18} />
          </button>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-scroll scrollbar-none pb-8 px-4 scroll-smooth"
          >
            <div className="flex gap-6 py-6 min-w-max">
              {certifications.map((cert, index) => (
                <CertificationCard 
                  key={cert.title} 
                  item={cert} 
                  onClick={() => handleCardClick(index)}
                  isActive={activeCert === index}
                />
              ))}
            </div>
          </div>
          
          {/* Scroll indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCert(index);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * 350,
                      behavior: 'smooth'
                    });
                    setScrollPosition(index * 350);
                  }
                }}
                className={`w-2 h-2 rounded-full ${
                  activeCert === index 
                    ? 'bg-[#8A89FF]' 
                    : 'bg-white/20 hover:bg-white/40'
                } transition-all`}
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
