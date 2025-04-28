
import { useState, useEffect, useRef } from 'react';

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
  delay 
}: { 
  item: Certification; 
  delay: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.classList.add('opacity-100', 'translate-y-0');
                cardRef.current.classList.remove('translate-y-10', 'opacity-0');
              }
            }, delay);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-lg p-6 shadow-md transition-all duration-500 transform translate-y-10 opacity-0 hover:shadow-lg hover:scale-[1.02]"
    >
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 bg-portfolio-purple/10 rounded-full flex items-center justify-center mr-4 text-portfolio-purple">
          🏆
        </div>
        <div>
          <h3 className="text-lg font-medium text-portfolio-navy">{item.title}</h3>
          <p className="text-portfolio-purple">{item.organization}</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">{item.date}</p>
      
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Skills Verified</p>
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span 
              key={skill} 
              className="inline-block bg-portfolio-purple/10 text-portfolio-purple text-xs px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 bg-portfolio-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-portfolio-navy mb-4 text-center">Certifications & Education</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Professional qualifications and educational background
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Education Card */}
          <div 
            className="bg-portfolio-navy rounded-lg p-6 shadow-md text-white col-span-1 md:col-span-2 lg:col-span-1 opacity-0 animate-fade-in"
          >
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4 text-white">
                🎓
              </div>
              <div>
                <h3 className="text-xl font-medium">{education.degree}</h3>
                <p className="text-portfolio-gray">{education.institution}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 mb-4">Graduation: {education.year}</p>
            
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                {education.focus.map((area) => (
                  <span 
                    key={area} 
                    className="inline-block bg-white/10 text-white text-xs px-2 py-1 rounded"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Certification Cards */}
          {certifications.map((cert, index) => (
            <CertificationCard 
              key={cert.title} 
              item={cert} 
              delay={200 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
