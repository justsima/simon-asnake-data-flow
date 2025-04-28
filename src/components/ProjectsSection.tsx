import { useState } from 'react';
import { ProjectCard } from './projects/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

const ITEMS_PER_PAGE = 6;

const ProjectsSection = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const filteredProjects = projects.filter(
    project => currentCategory === 'all' || project.category === currentCategory
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? selectedProjectIndex - 1 
      : selectedProjectIndex + 1;
    setSelectedProjectIndex(newIndex);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center font-playfair">
          Case Studies & Projects
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12 font-inter">
          Innovative solutions driving measurable business impact through data science and visualization
        </p>

        <Tabs defaultValue="all" className="mb-8" onValueChange={handleCategoryChange}>
          <TabsList className="grid w-full grid-cols-4 max-w-[600px] mx-auto bg-portfolio-darkCard">
            <TabsTrigger value="all" className="data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-portfolio-accent1">
              All Projects
            </TabsTrigger>
            <TabsTrigger value="Power BI" className="data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-portfolio-accent1">
              Power BI
            </TabsTrigger>
            <TabsTrigger value="Machine Learning" className="data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-portfolio-accent1">
              ML
            </TabsTrigger>
            <TabsTrigger value="Data Engineering" className="data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-portfolio-accent1">
              Data Eng
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onNavigate={handleNavigate}
                  totalProjects={filteredProjects.length}
                />
              ))}
            </div>
          </TabsContent>

          {['Power BI', 'Machine Learning', 'Data Engineering'].map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onNavigate={handleNavigate}
                    totalProjects={filteredProjects.length}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentPage === page
                        ? 'bg-portfolio-accent1/20 text-portfolio-accent1'
                        : 'text-gray-400 hover:text-white hover:bg-portfolio-accent1/10'
                    }`}
                  >
                    {page}
                  </button>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
