
import { useState, useEffect, useRef } from 'react';
import { ProjectCard } from './projects/ProjectCard';
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

// Sample project data with expanded and additional projects
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
    liveUrl: "https://app.powerbi.com/links/sample-executive-dashboard",
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
    videoUrl: "https://www.example.com/demos/churn-prediction",
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
    videoUrl: "https://www.example.com/demos/healthcare-pipeline",
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
    liveUrl: "https://app.powerbi.com/links/inventory-optimization",
  },
  {
    id: 5,
    title: "Marketing Campaign Analytics Platform",
    challenge: "Marketing team needed advanced attribution modeling for digital campaigns",
    solution: "Built end-to-end marketing analytics platform with custom attribution models to track customer journey touchpoints across channels.",
    impact: "42% improvement in campaign ROI by optimizing channel mix based on analytical insights.",
    technologies: ["Python", "R", "Power BI", "Google Analytics API"],
    image: "/placeholder.svg",
    category: "Machine Learning",
    videoUrl: "https://www.example.com/demos/marketing-analytics",
  },
  {
    id: 6,
    title: "Supply Chain Visibility Dashboard",
    challenge: "Global manufacturer lacked visibility into multi-tier supply chain",
    solution: "Created interactive Power BI dashboard integrating supplier, logistics, and inventory data with real-time alerts for potential disruptions.",
    impact: "28% reduction in stockouts, 15% improvement in on-time delivery, and $2.2M in savings from optimized inventory levels.",
    technologies: ["Power BI", "DAX", "Python", "SQL"],
    image: "/placeholder.svg",
    category: "Power BI",
    liveUrl: "https://app.powerbi.com/links/supply-chain-dashboard",
  },
  {
    id: 7,
    title: "Financial Forecasting Engine",
    challenge: "CFO needed improved cash flow and revenue forecasting accuracy",
    solution: "Developed ensemble machine learning model combining time series analysis with external economic indicators to improve forecast accuracy.",
    impact: "Reduced forecast error by 37%, enabling more confident capital allocation decisions and improved investor communications.",
    technologies: ["Python", "R", "SQL", "Azure ML"],
    image: "/placeholder.svg",
    category: "Machine Learning",
    videoUrl: "https://www.example.com/demos/financial-forecasting",
  },
  {
    id: 8,
    title: "HR Analytics Portal",
    challenge: "HR leadership needed deeper insights into talent acquisition and retention",
    solution: "Built comprehensive HR analytics dashboard with predictive attrition modeling and recruitment funnel optimization.",
    impact: "Reduced time-to-hire by 24%, decreased unwanted attrition by 18%, and improved hiring manager satisfaction scores by 31%.",
    technologies: ["Power BI", "Python", "SQL", "Azure Data Factory"],
    image: "/placeholder.svg",
    category: "Power BI",
    liveUrl: "https://app.powerbi.com/links/hr-analytics",
  },
  {
    id: 9,
    title: "Real-time IoT Data Pipeline",
    challenge: "Manufacturing operation needed real-time analysis of sensor data from production lines",
    solution: "Implemented streaming data architecture with Azure Event Hubs, Stream Analytics, and real-time dashboards for monitoring equipment performance.",
    impact: "Reduced unplanned downtime by 42% through predictive maintenance alerts and real-time anomaly detection.",
    technologies: ["Azure IoT Hub", "Stream Analytics", "Kafka", "Power BI"],
    image: "/placeholder.svg",
    category: "Data Engineering",
    videoUrl: "https://www.example.com/demos/iot-pipeline",
  },
  {
    id: 10,
    title: "Customer Segmentation Analysis",
    challenge: "Retail client needed deeper understanding of customer base for targeted marketing",
    solution: "Applied clustering algorithms to transaction history and demographic data to identify distinct customer segments with actionable insights.",
    impact: "34% improvement in email campaign engagement and 22% increase in repeat purchases through segment-specific offerings.",
    technologies: ["Python", "R", "SQL", "Tableau"],
    image: "/placeholder.svg",
    category: "Machine Learning",
    videoUrl: "https://www.example.com/demos/customer-segmentation",
  },
  {
    id: 11,
    title: "Data Warehouse Modernization",
    challenge: "Legacy data warehouse couldn't handle growing data volumes and query complexity",
    solution: "Migrated from on-premise SQL Server to Azure Synapse Analytics with optimized star schema design and automated ETL processes.",
    impact: "95% reduction in query latency, 75% decrease in maintenance overhead, and enabled self-service analytics for business users.",
    technologies: ["Azure Synapse", "Azure Data Factory", "SQL", "Python"],
    image: "/placeholder.svg",
    category: "Data Engineering",
    videoUrl: "https://www.example.com/demos/data-warehouse",
  },
  {
    id: 12,
    title: "Executive KPI Dashboard",
    challenge: "CEO needed unified view of company performance across departments",
    solution: "Created executive dashboard with drill-through capabilities focusing on key business metrics with AI-powered trend analysis and forecasting.",
    impact: "Reduced executive meeting preparation time by 68% and enabled data-driven strategic planning across all business units.",
    technologies: ["Power BI", "DAX", "SQL", "Azure Analysis Services"],
    image: "/placeholder.svg",
    category: "Power BI",
    liveUrl: "https://app.powerbi.com/links/executive-kpi",
  },
  {
    id: 13,
    title: "Fraud Detection System",
    challenge: "Financial institution experiencing increasing fraudulent transactions",
    solution: "Developed real-time fraud detection system using ensemble ML models with continuous learning capability to adapt to emerging fraud patterns.",
    impact: "Reduced fraudulent transactions by 67%, saving approximately $3.2M annually with minimal increase in false positives.",
    technologies: ["Python", "TensorFlow", "Spark", "Azure"],
    image: "/placeholder.svg",
    category: "Machine Learning",
    videoUrl: "https://www.example.com/demos/fraud-detection",
  },
  {
    id: 14,
    title: "Data Quality Framework",
    challenge: "Organization struggling with inconsistent data quality across systems",
    solution: "Implemented automated data quality monitoring framework with customizable rules and alerting for proactive issue resolution.",
    impact: "Improved data accuracy from 82% to 99.5%, reducing rework and enabling confident decision-making based on trusted data.",
    technologies: ["Python", "SQL", "Azure Data Factory", "Power BI"],
    image: "/placeholder.svg",
    category: "Data Engineering",
    videoUrl: "https://www.example.com/demos/data-quality",
  },
  {
    id: 15,
    title: "Product Recommendation Engine",
    challenge: "E-commerce platform wanted to improve cross-selling and upselling",
    solution: "Built collaborative filtering and content-based recommendation engine analyzing purchase history, browsing behavior, and product attributes.",
    impact: "27% increase in average order value and 18% improvement in conversion rates through personalized recommendations.",
    technologies: ["Python", "TensorFlow", "SQL", "Azure ML"],
    image: "/placeholder.svg",
    category: "Machine Learning",
    videoUrl: "https://www.example.com/demos/recommendation-engine",
  },
  {
    id: 16,
    title: "Sales Performance Dashboard",
    challenge: "Sales organization lacked visibility into rep performance and pipeline health",
    solution: "Developed multi-level Power BI dashboard with territory mapping, pipeline analysis, and predictive forecasting capabilities.",
    impact: "Sales cycle reduced by 22% and win rate increased by 15% through improved pipeline management and targeted coaching.",
    technologies: ["Power BI", "DAX", "SQL", "CRM Integration"],
    image: "/placeholder.svg",
    category: "Power BI",
    liveUrl: "https://app.powerbi.com/links/sales-performance",
  },
];

const ITEMS_PER_PAGE = 6;

const ProjectsSection = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const tabsRef = useRef<HTMLDivElement>(null);

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
    setActiveTab(category);
    
    // Add animation to the tab indicator
    if (tabsRef.current) {
      tabsRef.current.classList.add('tab-transitioning');
      setTimeout(() => {
        tabsRef.current?.classList.remove('tab-transitioning');
      }, 300);
    }
    
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

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'Power BI', name: 'Power BI' },
    { id: 'Machine Learning', name: 'ML' },
    { id: 'Data Engineering', name: 'Data Eng' }
  ];

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

        {/* Redesigned category tabs with enhanced glassmorphism and animations */}
        <div className="mb-10 relative">
          <div 
            ref={tabsRef}
            className="flex justify-center items-center mb-2 relative overflow-hidden"
          >
            <div className="glass-effect rounded-xl p-1 flex space-x-1 relative overflow-hidden transition-all duration-300"
                style={{
                  background: 'rgba(22, 27, 34, 0.4)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(48, 54, 61, 0.6)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`relative z-10 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 min-w-[120px] ${
                    activeTab === category.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {/* Active tab indicator with purple gradient */}
                  {activeTab === category.id && (
                    <span 
                      className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/60 to-[#7E69AB]/60 rounded-lg transition-all duration-300 backdrop-blur-sm animate-pulse"
                      style={{
                        boxShadow: '0 4px 12px rgba(155, 135, 245, 0.3)',
                      }}
                    ></span>
                  )}
                  <span className="relative z-10">{category.name}</span>
                </button>
              ))}
              
              {/* Animated underline that moves with tab changes */}
              <div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] transition-all duration-500"
                style={{ 
                  width: `${100 / categories.length}%`,
                  transform: `translateX(${categories.findIndex(c => c.id === activeTab) * 100}%)`,
                }}
              ></div>
            </div>
          </div>
          
          <div 
            className={`mt-6 transition-all duration-500 ${
              isPageChanging 
                ? 'opacity-0 transform translate-y-4' 
                : 'opacity-100 transform translate-y-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced pagination with number indicators */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`border-portfolio-darkBorder bg-portfolio-darkCard/50 backdrop-blur-sm hover:bg-[#9b87f5]/10 transition-colors ${
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
                          ? 'bg-[#9b87f5]/20 text-[#9b87f5]' 
                          : 'bg-portfolio-darkCard/50 backdrop-blur-sm hover:bg-[#9b87f5]/10 text-gray-300 hover:text-white'
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
                  className={`border-portfolio-darkBorder bg-portfolio-darkCard/50 backdrop-blur-sm hover:bg-[#9b87f5]/10 transition-colors ${
                    currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {/* Project details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-portfolio-darkCard border-portfolio-darkBorder glass-effect">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-gray-300">
                  {selectedProject.category} | {selectedProject.technologies.join(", ")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Project image or video */}
                <div className="w-full aspect-video bg-black/30 rounded-md overflow-hidden flex items-center justify-center">
                  {selectedProject.videoUrl ? (
                    <div className="w-full h-full">
                      {/* Placeholder for video - in production this would be an actual video player */}
                      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                        Video Demo Available
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-effect p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Challenge</h3>
                    <p className="text-gray-300 text-sm">{selectedProject.challenge}</p>
                  </div>
                  <div className="glass-effect p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Solution</h3>
                    <p className="text-gray-300 text-sm">{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="glass-effect p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Impact</h3>
                  <p className="text-gray-300 text-sm">{selectedProject.impact}</p>
                </div>

                {selectedProject.liveUrl && (
                  <Button 
                    className="w-full glass-button bg-[#9b87f5] hover:bg-[#7E69AB]/80 text-white transition-all duration-500"
                    onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                  >
                    <span className="flex items-center">
                      View Live Power BI Report 
                      <ArrowRight className="ml-2" size={16} />
                    </span>
                  </Button>
                )}

                {selectedProject.videoUrl && !selectedProject.liveUrl && (
                  <Button 
                    className="w-full glass-button bg-[#9b87f5] hover:bg-[#7E69AB]/80 text-white transition-all duration-500"
                    onClick={() => window.open(selectedProject.videoUrl, '_blank')}
                  >
                    <span className="flex items-center">
                      Watch Full Demo 
                      <ArrowRight className="ml-2" size={16} />
                    </span>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
