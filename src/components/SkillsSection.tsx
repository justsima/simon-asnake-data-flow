
import { useEffect, useRef, useState } from 'react';

interface SkillCardProps {
  title: string;
  icon: string;
  skills: { name: string; percentage: number }[];
  delay: number;
}

const SkillCard = ({ title, icon, skills, delay }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt values (smaller for more subtle effect)
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    
    setTilt({ x: tiltX, y: tiltY });
  };
  
  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };
  
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
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="rounded-lg p-4 md:p-6 transition-all duration-500 transform translate-y-10 opacity-0 hover:shadow-lg"
      style={{ 
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.x !== 0 ? '-5px' : '-10px'})`,
        transformStyle: 'preserve-3d',
        background: 'rgba(22, 27, 34, 0.5)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(48, 54, 61, 0.6)',
      }}
    >
      <div className="flex items-center mb-4 md:mb-6">
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4 transform transition-transform hover:scale-110"
          style={{
            background: 'rgba(138, 137, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(138, 137, 255, 0.3)',
          }}
        >
          <span className="text-lg md:text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg md:text-xl font-medium text-white font-montserrat">{title}</h3>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="mb-2">
            <div className="flex justify-between mb-1">
              <p className="text-xs md:text-sm font-medium text-gray-300">{skill.name}</p>
              <p className="text-xs md:text-sm font-medium text-[#8A89FF]">{skill.percentage}%</p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill"
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
      className="py-20 relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3 md:mb-4 text-center font-playfair">Skills & Expertise</h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto text-center mb-8 md:mb-12 font-inter px-4">
          My technical toolkit for delivering data-driven solutions across industries
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
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
