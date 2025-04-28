
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  image: string;
  category: 'Power BI' | 'Machine Learning' | 'Data Engineering';
}

const projects: Project[] = [
  {
    id: 1,
    title: "Executive Sales Intelligence Dashboard",
    challenge: "Fortune 500 retailer needed real-time sales performance visibility across 200+ stores",
    solution: "Developed interactive Power BI dashboard integrating multiple data sources",
    impact: "32% reduction in reporting time, $1.2M identified in revenue opportunities",
    technologies: ["Power BI", "SQL", "DAX", "Azure Data Factory"],
    image: "/placeholder.svg",
    category: "Power BI",
  },
  {
    id: 2,
    title: "Customer Churn Prediction Model",
    challenge: "Financial services company experiencing unexpected customer attrition",
    solution: "Developed ML model predicting likely churners 60 days in advance",
    impact: "24% reduction in churn rate, $850K annual savings",
    technologies: ["Python", "scikit-learn", "Azure ML", "SQL"],
    image: "/placeholder.svg",
    category: "Machine Learning",
  },
  {
    id: 3,
    title: "Healthcare Claims ETL Pipeline",
    challenge: "Healthcare provider struggling with data integration from 12 systems",
    solution: "Designed automated ETL pipeline with validation rules",
    impact: "95% reduction in manual data processing, 99.8% data accuracy",
    technologies: ["Azure Data Factory", "SQL", "Python", "Power BI"],
    image: "/placeholder.svg",
    category: "Data Engineering",
  },
  {
    id: 4,
    title: "Retail Inventory Optimization System",
    challenge: "Eliminating overstock while preventing stockouts across 50+ locations",
    solution: "Created predictive inventory model with seasonal adjustments",
    impact: "18% reduction in carrying costs, 35% fewer stockouts",
    technologies: ["Python", "Power BI", "Azure", "SQL"],
    image: "/placeholder.svg",
    category: "Machine Learning",
  },
];

const ProjectCard = ({ project, delay }: { project: Project; delay: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.classList.add('opacity-100');
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
      className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-500 transform translate-y-10 opacity-0 hover:shadow-lg"
    >
      <div className="h-48 bg-portfolio-navy/10 relative">
        <div className="absolute inset-0 flex items-center justify-center text-portfolio-navy">
          <p>{project.title} Preview</p>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-medium text-portfolio-navy mb-3">{project.title}</h3>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-portfolio-purple mb-1">Challenge</p>
          <p className="text-sm text-gray-600">{project.challenge}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-portfolio-purple mb-1">Solution</p>
          <p className="text-sm text-gray-600">{project.solution}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-portfolio-purple mb-1">Impact</p>
          <p className="text-sm text-gray-600">{project.impact}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-portfolio-purple mb-2">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="inline-block bg-portfolio-purple/10 text-portfolio-purple text-xs px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  
  const categories = ['All', 'Power BI', 'Machine Learning', 'Data Engineering'];
  
  const filterProjects = (category: string) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  return (
    <section id="projects" className="py-20 bg-portfolio-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-portfolio-navy mb-4 text-center">Projects Showcase</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
          Featured data science and visualization projects delivering measurable business impact
        </p>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterProjects(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === category
                  ? "bg-portfolio-purple text-white"
                  : "bg-white text-portfolio-navy hover:bg-portfolio-purple/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
