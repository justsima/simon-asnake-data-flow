import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { dataService } from '@/services/dataService';

interface Certification {
  title: string;
  organization: string;
  date: string;
  skills: string[];
  image?: string;
  isEducation?: boolean;
}

const CertificationCard = ({ 
  item,
  index
}: { 
  item: Certification;
  index: number;
}) => {
  return (
    <motion.div 
      className="certification-card flex-shrink-0 w-[320px] md:w-[350px] mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="glass-cert-card h-full p-6 rounded-[15px] relative overflow-hidden group">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 glass-background"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header with icon */}
          <div className="flex items-start mb-4">
            <div className="cert-icon-container mr-4">
              <div className="cert-icon">
                {item.isEducation ? '🎓' : '🏆'}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="cert-title font-semibold text-lg mb-1 line-clamp-2">
                {item.title}
              </h3>
              <p className="cert-organization text-sm font-medium mb-1">
                {item.organization}
              </p>
              <p className="cert-date text-xs opacity-80">
                {item.date}
              </p>
            </div>
          </div>
          
          {/* Skills section */}
          <div className="mt-4">
            <p className="text-xs font-medium mb-2 opacity-90">
              {item.isEducation ? 'Focus Areas' : 'Skills Verified'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.skills.slice(0, 3).map((skill, skillIndex) => (
                <Badge 
                  key={skillIndex} 
                  className="cert-skill-badge text-xs px-2 py-1"
                >
                  {skill}
                </Badge>
              ))}
              {item.skills.length > 3 && (
                <Badge className="cert-skill-badge text-xs px-2 py-1">
                  +{item.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 hover-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const data = await dataService.getCertifications();
      setCertifications(data);
    } catch (error) {
      console.error('Error loading certifications:', error);
      // Fallback data
      setCertifications([
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
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Create duplicated array for seamless infinite scroll
  const duplicatedCertifications = [...certifications, ...certifications];

  if (isLoading) {
    return (
      <section id="certifications" className="py-20 relative overflow-hidden">
        <div className="mobile-container relative z-10">
          <div className="text-center" style={{ color: 'var(--color-text-primary)' }}>
            Loading certifications...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, var(--color-primary-700) 0%, transparent 70%)' }}></div>
      </div>
      
      <div className="mobile-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            <span className="text-gradient-primary">
              Education & Certifications
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-inter"
             style={{ color: 'var(--color-text-secondary)' }}>
            Professional qualifications and academic achievements that drive my expertise
          </p>
        </motion.div>

        {/* Horizontal scrolling container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--color-surface-primary)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--color-surface-primary)] to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling container */}
          <div 
            ref={scrollContainerRef}
            className="horizontal-scroll-container overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`horizontal-scroll-content ${isPaused ? 'paused' : ''}`}>
              {duplicatedCertifications.map((cert, index) => (
                <CertificationCard
                  key={`${cert.title}-${index}`}
                  item={cert}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;