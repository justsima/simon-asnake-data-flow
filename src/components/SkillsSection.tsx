
import { useEffect, useRef } from 'react';

const SkillCard = ({ 
  title, 
  icon, 
  skills, 
  delay 
}: { 
  title: string; 
  icon: string; 
  skills: { name: string; percentage: number }[]; 
  delay: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (cardRef.current) {
              setTimeout(() => {
                cardRef.current?.classList.add('opacity-100');
                cardRef.current?.classList.remove('translate-y-10', 'opacity-0');
                
                // Add visible class to trigger progress bar animations
                cardRef.current?.classList.add('visible');
              }, delay);
            }
            
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
      className="bg-white rounded-lg p-6 shadow-md transition-all duration-500 transform translate-y-10 opacity-0 hover:shadow-lg"
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-portfolio-purple/10 text-portfolio-purple rounded-full flex items-center justify-center mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-medium text-portfolio-navy">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="mb-2">
            <div className="flex justify-between mb-1">
              <p className="text-sm font-medium text-gray-600">{skill.name}</p>
              <p className="text-sm font-medium text-portfolio-purple">{skill.percentage}%</p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill bg-portfolio-purple"
                style={{ "--progress-width": `${skill.percentage}%` } as React.CSSProperties}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const skillCategories = [
    {
      title: "Data Analysis",
      icon: "📊",
      skills: [
        { name: "Power BI Dashboard Development", percentage: 95 },
        { name: "Exploratory Data Analysis", percentage: 90 },
        { name: "KPI Tracking Systems", percentage: 92 },
        { name: "Executive-Level Reporting", percentage: 88 },
      ],
    },
    {
      title: "Data Science",
      icon: "🧠",
      skills: [
        { name: "Machine Learning Model Development", percentage: 85 },
        { name: "Predictive Analytics", percentage: 88 },
        { name: "Feature Engineering", percentage: 82 },
        { name: "Statistical Analysis", percentage: 90 },
      ],
    },
    {
      title: "Data Engineering",
      icon: "⚙️",
      skills: [
        { name: "ETL Pipeline Optimization", percentage: 87 },
        { name: "Data Warehousing on Azure", percentage: 84 },
        { name: "Data Governance and Validation", percentage: 80 },
        { name: "Database Design & Management", percentage: 83 },
      ],
    },
    {
      title: "Programming",
      icon: "💻",
      skills: [
        { name: "Python", percentage: 92 },
        { name: "SQL", percentage: 95 },
        { name: "R", percentage: 78 },
        { name: "DAX", percentage: 90 },
        { name: "JavaScript", percentage: 75 },
      ],
    },
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-portfolio-navy mb-4 text-center">Skills & Expertise</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          My technical toolkit for delivering data-driven solutions across industries
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard 
              key={category.title}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
