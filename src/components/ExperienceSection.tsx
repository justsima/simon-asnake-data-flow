
import { useState, useEffect, useRef } from 'react';

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

const TimelineItem = ({ 
  experience,
  index,
  isVisible 
}: { 
  experience: Experience;
  index: number;
  isVisible: boolean;
}) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`timeline-item relative ${isVisible ? 'timeline-item-visible' : ''}`}>
      {/* Timeline dot */}
      <div 
        className={`absolute w-4 h-4 rounded-full bg-[#201E43] border-2 border-[#8A89FF] z-10 left-1/2 transform -translate-x-1/2 ${index === 0 ? 'top-0' : 'top-1/2'}`}
        style={{
          boxShadow: '0 0 10px rgba(138, 137, 255, 0.5)',
        }}
      />
      
      {/* Content */}
      <div 
        className={`timeline-content ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'} p-6 mb-12 md:mb-0 md:w-1/2 ${isEven ? 'md:ml-0' : 'md:ml-auto'} transition-all duration-700 opacity-0 transform ${isEven ? 'translate-x-10' : '-translate-x-10'} ${isVisible ? '!opacity-100 !translate-x-0' : ''}`}
      >
        <div 
          className="p-6 rounded-lg transition-all duration-500 transform hover:-translate-y-2"
          style={{
            background: 'rgba(32, 30, 67, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(138, 137, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h3 className="text-xl font-medium text-white mb-1">{experience.title}</h3>
          <p className="text-[#8A89FF] font-medium mb-2">{experience.company}</p>
          <p className="text-sm text-gray-400 mb-4">{experience.period}</p>
          
          <ul className="space-y-3">
            {experience.responsibilities.map((item, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start">
                <span className="w-1 h-1 bg-[#8A89FF] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(experiences.length).fill(false));
  
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTimelineVisible(true);
            
            // Animate timeline items with delay
            const newVisibleItems = [...visibleItems];
            experiences.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const updated = [...prev];
                  updated[index] = true;
                  return updated;
                });
              }, 800 + index * 600);
            });
            
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

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center font-playfair">Work Experience</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12 font-inter">
          My professional journey in data science and software development
        </p>
        
        {/* Timeline */}
        <div 
          ref={timelineRef}
          className={`relative py-12 ${isTimelineVisible ? 'timeline-visible' : ''}`}
        >
          {/* Timeline vertical line */}
          <div className="timeline-line absolute h-full w-0.5 bg-gray-800 left-1/2 transform -translate-x-1/2 hidden md:block">
            <div 
              className="timeline-line-progress absolute w-full bg-[#8A89FF] transition-all duration-2000 ease-out"
              style={{ 
                height: isTimelineVisible ? '100%' : '0%',
                boxShadow: '0 0 8px rgba(138, 137, 255, 0.4)',
              }}
            />
          </div>
          
          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <TimelineItem 
              key={`${exp.company}-${exp.title}`}
              experience={exp}
              index={index}
              isVisible={visibleItems[index]}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .timeline-line-progress {
            transition: none !important;
            height: 100% !important;
          }
          
          .timeline-content {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;
