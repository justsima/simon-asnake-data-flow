
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

const ProjectCard = ({ project, openModal }: { project: Project; openModal: (project: Project) => void }) => {
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
            }, Math.random() * 500);
            
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
  }, []);

  // Tilt effect on hover
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Card 
      ref={cardRef}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden transition-all duration-500 transform translate-y-10 opacity-0 hover:shadow-lg shadow-md preserve-3d"
    >
      <div className="h-48 bg-portfolio-navy/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-portfolio-navy text-opacity-80 font-medium">
            {project.title} Preview
          </div>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-medium text-white mb-2">{project.title}</h3>
          <Badge className="bg-portfolio-accent1/30 text-portfolio-accent1 hover:bg-portfolio-accent1/40">
            {project.category}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {project.challenge}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className="inline-block bg-portfolio-accent1/10 text-portfolio-accent2 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="inline-block bg-portfolio-accent1/10 text-portfolio-accent2 text-xs px-2 py-1 rounded">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-5 pb-4 pt-0">
        <DialogTrigger asChild onClick={() => openModal(project)}>
          <Button 
            variant="outline" 
            className="w-full bg-portfolio-accent1/10 text-white hover:bg-portfolio-accent1/30 border-portfolio-accent1/30 transition-all duration-300 hover:translate-y-[-2px] group"
          >
            View Details
            <span className="absolute inset-0 w-full h-full bg-portfolio-accent1/10 translate-x-1 translate-y-1 rounded-md group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 -z-10"></span>
          </Button>
        </DialogTrigger>
      </CardFooter>
    </Card>
  );
};

const ProjectModal = ({ project }: { project: Project }) => {
  if (!project) return null;
  
  return (
    <div className="max-w-3xl">
      <DialogHeader className="mb-4">
        <div className="flex justify-between items-center">
          <DialogTitle className="text-2xl font-semibold text-white">{project.title}</DialogTitle>
          <Badge className="bg-portfolio-accent1/30 text-portfolio-accent1">
            {project.category}
          </Badge>
        </div>
      </DialogHeader>
      
      <div className="mb-6 h-64 bg-portfolio-navy/20 rounded-lg flex items-center justify-center">
        <p className="text-white/70">Project Visual</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-portfolio-accent1 mb-2">Challenge</h3>
          <p className="text-gray-300">{project.challenge}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-portfolio-accent1 mb-2">Solution</h3>
          <p className="text-gray-300">{project.solution}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-portfolio-accent1 mb-2">Impact</h3>
          <p className="text-gray-300">{project.impact}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-portfolio-accent1 mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="inline-block bg-portfolio-accent1/10 text-portfolio-accent2 px-3 py-1 rounded-full"
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

const PROJECTS_PER_PAGE = 8;

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const filterProjects = (category: string) => {
    setActiveTab(category);
    setCurrentPage(1);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category.toLowerCase() === category.toLowerCase()));
    }
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PROJECTS_PER_PAGE, filteredProjects.length);
  const currentProjects = filteredProjects.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById('projects')?.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-portfolio-darkBg to-[#0B0C0F]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3 text-center">Case Studies & Projects</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto text-center mb-10">
          Featured data science and visualization projects delivering measurable business impact
        </p>
        
        <Dialog>
          <div className="flex flex-col items-center">
            {/* Filter tabs */}
            <div className="w-full max-w-3xl mb-10 backdrop-blur-md bg-white/5 p-1 rounded-lg">
              <Tabs defaultValue="all" onValueChange={filterProjects} className="w-full">
                <TabsList className="flex w-full bg-transparent">
                  <TabsTrigger 
                    value="all" 
                    className={cn(
                      "flex-1 data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-white",
                      "text-gray-400 hover:text-white transition-all"
                    )}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="power bi" 
                    className={cn(
                      "flex-1 data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-white",
                      "text-gray-400 hover:text-white transition-all"
                    )}
                  >
                    Power BI
                  </TabsTrigger>
                  <TabsTrigger 
                    value="machine learning" 
                    className={cn(
                      "flex-1 data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-white",
                      "text-gray-400 hover:text-white transition-all"
                    )}
                  >
                    Machine Learning
                  </TabsTrigger>
                  <TabsTrigger 
                    value="data engineering" 
                    className={cn(
                      "flex-1 data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-white",
                      "text-gray-400 hover:text-white transition-all"
                    )}
                  >
                    Data Engineering
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 w-full">
              {currentProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  openModal={openModal}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 w-full">
                <div className="backdrop-blur-md bg-white/5 rounded-lg p-1">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={cn(
                            currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-portfolio-accent1/20",
                            "text-white"
                          )}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={page === currentPage}
                            className={cn(
                              page === currentPage ? "bg-portfolio-accent1/30" : "hover:bg-portfolio-accent1/20",
                              "text-white"
                            )}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={cn(
                            currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-portfolio-accent1/20",
                            "text-white"
                          )}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
          </div>
          
          {/* Project detail modal */}
          <DialogContent className="bg-[#0B0C0F]/95 backdrop-blur-xl border border-white/10 text-white max-w-4xl">
            {selectedProject && <ProjectModal project={selectedProject} />}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
