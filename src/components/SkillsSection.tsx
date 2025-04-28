
import { useEffect, useRef, useState } from 'react';
import ParticleBackground from './ParticleBackground';

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
      className="glass-layer-3 rounded-lg p-6 transition-all duration-500 transform translate-y-10 opacity-0 hover:shadow-lg"
      style={{ 
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.x !== 0 ? '-5px' : '-10px'})`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 glass-layer-1 text-portfolio-purple rounded-full flex items-center justify-center mr-4 transform transition-transform hover:scale-110">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-medium text-white font-montserrat">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="mb-2">
            <div className="flex justify-between mb-1">
              <p className="text-sm font-medium text-gray-300">{skill.name}</p>
              <p className="text-sm font-medium text-[#9b87f5]">{skill.percentage}%</p>
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
      <ParticleBackground />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center font-playfair">Skills & Expertise</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12 font-inter">
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
