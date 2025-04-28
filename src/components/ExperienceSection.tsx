
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
        className="timeline-dot" 
        style={{ top: index === 0 ? '0%' : '50%' }}
      ></div>
      
      {/* Content */}
      <div 
        className={`timeline-content ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'} p-6 mb-12 md:mb-0 md:w-1/2 ${isEven ? 'md:ml-0' : 'md:ml-auto'}`}
      >
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-medium text-portfolio-navy">{experience.title}</h3>
          <p className="text-portfolio-purple font-medium mb-2">{experience.company}</p>
          <p className="text-sm text-gray-500 mb-4">{experience.period}</p>
          
          <ul className="space-y-2">
            {experience.responsibilities.map((item, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start">
                <span className="w-1 h-1 bg-portfolio-purple rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
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
        <h2 className="text-3xl md:text-4xl font-semibold text-portfolio-navy mb-4 text-center">Work Experience</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          My professional journey in data science and software development
        </p>
        
        {/* Timeline */}
        <div 
          ref={timelineRef}
          className={`relative py-12 ${isTimelineVisible ? 'timeline-visible' : ''}`}
        >
          {/* Timeline vertical line */}
          <div className="timeline-line hidden md:block">
            <div className="timeline-line-progress"></div>
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
    </section>
  );
};

export default ExperienceSection;
