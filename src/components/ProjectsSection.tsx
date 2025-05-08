
import { useState, useEffect, useRef } from 'react';
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Project } from '@/types/project';
import GradientBackground from './GradientBackground';
import { ExternalLink } from 'lucide-react';

// Enhanced project data with more fields
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
    reportUrl: "https://app.powerbi.com/reportEmbed",
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
    videoUrl: "https://www.example.com/demo-video",
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
    reportUrl: "https://app.powerbi.com/reportEmbed",
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
    imageGallery: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 5,
    title: "Financial Services KPI Dashboard",
    challenge: "Investment firm needed consolidated view of performance metrics across portfolios",
    solution: "Built comprehensive Power BI dashboard with interactive filters and drill-through capabilities to analyze investment performance by sector, region, and strategy.",
    impact: "Reduced analysis time by 65%, improved client reporting quality, and enabled identification of 3 underperforming investment strategies.",
    technologies: ["Power BI", "DAX", "SQL", "Excel"],
    image: "/placeholder.svg",
    category: "Power BI",
    reportUrl: "https://app.powerbi.com/reportEmbed",
  },
  {
    id: 6,
    title: "Supply Chain Optimization Model",
    challenge: "Manufacturing company facing increasing logistics costs and delivery delays",
    solution: "Developed machine learning model to optimize shipping routes, warehouse locations, and inventory levels based on historical demand patterns.",
    impact: "15% reduction in logistics costs, 22% improvement in on-time deliveries, and $1.7M annual savings.",
    technologies: ["Python", "TensorFlow", "Tableau", "SQL"],
    image: "/placeholder.svg",
    category: "Machine Learning",
    videoUrl: "https://www.example.com/demo-video",
  },
  {
    id: 7,
    title: "Marketing Attribution Analytics",
    challenge: "E-commerce company unable to determine ROI across marketing channels",
    solution: "Created multi-touch attribution model using Markov chains to analyze customer journeys and allocate conversion credit across marketing touchpoints.",
    impact: "25% improvement in marketing budget allocation, 18% increase in conversion rates, and identification of undervalued marketing channels.",
    technologies: ["Python", "R", "Google Analytics", "SQL"],
    image: "/placeholder.svg",
    category: "Data Engineering",
    imageGallery: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 8,
    title: "HR Analytics Dashboard",
    challenge: "Enterprise company needed insights into hiring trends, employee satisfaction, and retention",
    solution: "Built interactive Power BI dashboard with predictive retention models and employee satisfaction metrics.",
    impact: "Reduced turnover by 14% in key departments, improved hiring efficiency by 28%, and identified key satisfaction drivers.",
    technologies: ["Power BI", "DAX", "SQL", "Python"],
    image: "/placeholder.svg",
    category: "Power BI",
    reportUrl: "https://app.powerbi.com/reportEmbed",
  },
  {
    id: 9,
    title: "Predictive Maintenance System",
    challenge: "Manufacturing equipment failures causing production downtime",
    solution: "Designed machine learning model to predict equipment failures before they occur using sensor data and maintenance records.",
    impact: "67% reduction in unplanned downtime, 23% decrease in maintenance costs, and extended equipment lifecycle by 15%.",
    technologies: ["Python", "TensorFlow", "IoT", "Azure"],
    image: "/placeholder.svg",
    category: "Machine Learning",
    videoUrl: "https://www.example.com/demo-video",
  },
  {
    id: 10,
    title: "Customer Segmentation Analysis",
    challenge: "Retail company needed deeper insights into customer base for targeted marketing",
    solution: "Applied clustering algorithms to identify distinct customer segments based on purchasing behavior, demographics, and engagement metrics.",
    impact: "34% increase in campaign response rates, 27% higher customer lifetime value for targeted segments.",
    technologies: ["Python", "scikit-learn", "SQL", "Tableau"],
    image: "/placeholder.svg",
    category: "Data Engineering",
    imageGallery: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 11,
    title: "Sales Forecasting Dashboard",
    challenge: "Retail chain needed accurate sales projections for inventory planning",
    solution: "Developed Power BI dashboard with time series forecasting models to predict sales by product category, store, and region.",
    impact: "Forecasting accuracy improved by 28%, inventory carrying costs reduced by 15%, and stockouts decreased by 32%.",
    technologies: ["Power BI", "DAX", "R", "SQL"],
    image: "/placeholder.svg",
    category: "Power BI",
    reportUrl: "https://app.powerbi.com/reportEmbed",
  },
  {
    id: 12,
    title: "Sentiment Analysis System",
    challenge: "Consumer products company needed to analyze customer feedback across channels",
    solution: "Built natural language processing model to analyze sentiment and key themes from customer reviews, social media, and support tickets.",
    impact: "Identified 5 critical product issues before they affected sales, increased positive reviews by 23% through targeted improvements.",
    technologies: ["Python", "NLTK", "TensorFlow", "Azure"],
    image: "/placeholder.svg",
    category: "Machine Learning",
    videoUrl: "https://www.example.com/demo-video",
  },
];

const ITEMS_PER_PAGE = 6;

const ProjectsSection = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter projects based on selected category
  const filteredProjects = projects.filter(
    project => currentCategory === 'all' || project.category === currentCategory
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
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

  // Function to render appropriate media preview
  const renderMediaPreview = (project: Project) => {
    if (project.videoUrl) {
      return (
        <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <p className="text-white text-lg">Video Placeholder</p>
          </div>
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-50" />
        </div>
      );
    } else if (project.imageGallery && project.imageGallery.length > 0) {
      return (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {project.imageGallery.map((img, idx) => (
            <div key={idx} className="aspect-square rounded-lg overflow-hidden">
              <img src={img} alt={`${project.title} - Image ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      );
    }
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
              className="data-[state=active]:bg-[#1A7F8C]/20 data-[state=active]:text-[#1A7F8C] transition-all duration-500"
            >
              All Projects
            </TabsTrigger>
            <TabsTrigger 
              value="Power BI" 
              className="data-[state=active]:bg-[#1A7F8C]/20 data-[state=active]:text-[#1A7F8C] transition-all duration-500"
            >
              Power BI
            </TabsTrigger>
            <TabsTrigger 
              value="Machine Learning" 
              className="data-[state=active]:bg-[#1A7F8C]/20 data-[state=active]:text-[#1A7F8C] transition-all duration-500"
            >
              ML
            </TabsTrigger>
            <TabsTrigger 
              value="Data Engineering" 
              className="data-[state=active]:bg-[#1A7F8C]/20 data-[state=active]:text-[#1A7F8C] transition-all duration-500"
            >
              Data Eng
            </TabsTrigger>
          </TabsList>

          {['all', 'Power BI', 'Machine Learning', 'Data Engineering'].map((category) => (
            <TabsContent 
              key={category} 
              value={category} 
              className={`mt-6 transition-all duration-500 ${isPageChanging ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="glass-card cursor-pointer hover-scale transition-all duration-500"
                    onClick={() => handleProjectClick(project)}
                  >
                    <ProjectCard
                      project={project}
                      index={project.id}
                      onNavigate={() => {}}
                      totalProjects={filteredProjects.length}
                    />
                  </div>
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
                  className={`border-portfolio-darkBorder bg-portfolio-darkCard/50 backdrop-blur-sm hover:bg-[#1A7F8C]/10 transition-all duration-500 ${
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
                      className={`border-portfolio-darkBorder transition-all duration-500 ${
                        currentPage === page 
                          ? 'bg-[#1A7F8C]/20 text-[#1A7F8C]' 
                          : 'bg-portfolio-darkCard/50 backdrop-blur-sm hover:bg-[#1A7F8C]/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`border-portfolio-darkBorder bg-portfolio-darkCard/50 backdrop-blur-sm hover:bg-[#1A7F8C]/10 transition-all duration-500 ${
                    currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Project Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-portfolio-darkCard border-portfolio-darkBorder">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-playfair">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {selectedProject.category} | {selectedProject.technologies.join(", ")}
                  </DialogDescription>
                </DialogHeader>

                {renderMediaPreview(selectedProject)}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#1A7F8C]">Challenge</h3>
                    <p className="text-gray-300">{selectedProject.challenge}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#1A7F8C]">Solution</h3>
                    <p className="text-gray-300">{selectedProject.solution}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#1A7F8C]">Impact</h3>
                    <p className="text-gray-300">{selectedProject.impact}</p>
                  </div>
                  
                  {selectedProject.reportUrl && (
                    <div className="pt-4">
                      <Button 
                        className="btn-hover w-full bg-[#1A7F8C] hover:bg-[#15697A] text-white flex items-center justify-center gap-2"
                        onClick={() => window.open(selectedProject.reportUrl, '_blank')}
                      >
                        <ExternalLink size={16} />
                        View Power BI Report
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
