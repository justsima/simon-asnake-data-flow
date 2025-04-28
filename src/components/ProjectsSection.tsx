
import { useState, useEffect } from 'react';
import { ProjectCard } from './projects/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Project } from '@/types/project';
import GradientBackground from './GradientBackground';

// Sample project data - you'll replace this with your actual projects
const projects: Project[] = [
  {
    id: 1,
    title: "Executive Sales Intelligence Dashboard",
    challenge: "Fortune 500 retailer needed real-time sales performance visibility across 200+ stores",
    solution: "Developed interactive Power BI dashboard integrating multiple data sources with advanced DAX measures to provide executive insights on sales trends, store performance, and inventory management.",
    impact: "32% reduction in reporting time, $1.2M identified in revenue opportunities, and improved decision-making across regional management teams.",
    technologies: ["Power BI", "SQL", "DAX", "Azure Data Factory"],
    image: "/placeholder.svg",
    category: "Power BI",
  },
  {
    id: 2,
    title: "Customer Churn Prediction Model",
    challenge: "Financial services company experiencing unexpected customer attrition",
    solution: "Developed ML model predicting likely churners 60 days in advance using random forest algorithm with feature engineering on transactional and demographic data points.",
    impact: "24% reduction in churn rate, $850K annual savings in retention costs, and improved customer satisfaction metrics across targeted segments.",
    technologies: ["Python", "scikit-learn", "Azure ML", "SQL"],
    image: "/placeholder.svg",
    category: "Machine Learning",
  },
  {
    id: 3,
    title: "Healthcare Claims ETL Pipeline",
    challenge: "Healthcare provider struggling with data integration from 12 systems",
    solution: "Designed automated ETL pipeline with validation rules and data quality frameworks to standardize inputs from disparate healthcare systems.",
    impact: "95% reduction in manual data processing, 99.8% data accuracy achievement, and reduced claim processing time from 72 hours to 4 hours.",
    technologies: ["Azure Data Factory", "SQL", "Python", "Power BI"],
    image: "/placeholder.svg",
    category: "Data Engineering",
  },
  {
    id: 4,
    title: "Retail Inventory Optimization System",
    challenge: "Eliminating overstock while preventing stockouts across 50+ locations",
    solution: "Created predictive inventory model with seasonal adjustments and machine learning algorithms to optimize stock levels based on historical sales patterns.",
    impact: "18% reduction in carrying costs, 35% fewer stockouts, and improved cash flow by reducing unnecessary inventory investments.",
    technologies: ["Python", "Power BI", "Azure", "SQL"],
    image: "/placeholder.svg",
    category: "Machine Learning",
  },
  // Add more projects here
];

const ITEMS_PER_PAGE = 6;

const ProjectsSection = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isPageChanging, setIsPageChanging] = useState(false);

  // Filter projects based on selected category
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
    setIsPageChanging(true);
    setCurrentCategory(category);
    setCurrentPage(1);
    setTimeout(() => setIsPageChanging(false), 300);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    
    setIsPageChanging(true);
    setCurrentPage(newPage);
    
    setTimeout(() => {
      setIsPageChanging(false);
      window.scrollTo({ top: document.getElementById('projects')?.offsetTop || 0, behavior: 'smooth' });
    }, 300);
  };

  // Generate array of page numbers with ellipsis for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we need to show more pages on either side
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pageNumbers.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis-end');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <GradientBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2 text-center font-playfair">
          Case Studies & Projects
        </h2>
        
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12 font-inter">
          Innovative solutions driving measurable business impact through data science and visualization
        </p>

        <Tabs defaultValue="all" className="mb-8" onValueChange={handleCategoryChange}>
          <TabsList className="grid w-full grid-cols-4 max-w-[600px] mx-auto bg-portfolio-darkCard/50 backdrop-blur-sm border border-white/10">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-portfolio-accent1 transition-all duration-300"
            >
              All Projects
            </TabsTrigger>
            <TabsTrigger 
              value="Power BI" 
              className="data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-portfolio-accent1 transition-all duration-300"
            >
              Power BI
            </TabsTrigger>
            <TabsTrigger 
              value="Machine Learning" 
              className="data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-portfolio-accent1 transition-all duration-300"
            >
              ML
            </TabsTrigger>
            <TabsTrigger 
              value="Data Engineering" 
              className="data-[state=active]:bg-portfolio-accent1/20 data-[state=active]:text-portfolio-accent1 transition-all duration-300"
            >
              Data Eng
            </TabsTrigger>
          </TabsList>

          {['all', 'Power BI', 'Machine Learning', 'Data Engineering'].map((category) => (
            <TabsContent 
              key={category} 
              value={category} 
              className={`mt-6 transition-all duration-300 ${isPageChanging ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={startIndex + index}
                    onNavigate={handleNavigate}
                    totalProjects={filteredProjects.length}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Enhanced pagination with number indicators */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`border-portfolio-darkBorder bg-portfolio-darkCard/50 backdrop-blur-sm hover:bg-portfolio-accent1/10 transition-colors ${
                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                  }`}
                />
              </PaginationItem>
              
              {getPageNumbers().map((page, i) => (
                page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={`page-${page}`}>
                    <PaginationLink
                      onClick={() => handlePageChange(page as number)}
                      isActive={currentPage === page}
                      className={`border-portfolio-darkBorder ${
                        currentPage === page 
                          ? 'bg-portfolio-accent1/20 text-portfolio-accent1' 
                          : 'bg-portfolio-darkCard/50 backdrop-blur-sm hover:bg-portfolio-accent1/10 text-gray-300 hover:text-white'
                      } transition-colors`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`border-portfolio-darkBorder bg-portfolio-darkCard/50 backdrop-blur-sm hover:bg-portfolio-accent1/10 transition-colors ${
                    currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                  }`}
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
