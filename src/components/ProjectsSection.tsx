import { useState, useEffect, useRef } from 'react';
import ProjectCard from './projects/ProjectCard';
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { dataService } from '@/services/dataService';

const ITEMS_PER_PAGE = 6;

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await dataService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <section id="projects" className="py-20 relative overflow-hidden">
        <GradientBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">Loading projects...</div>
        </div>
      </section>
    );
  }

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
                {visibleProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project)}
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

      {/* Project details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-portfolio-darkCard border-portfolio-darkBorder">
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
                  <div>
                    <h3 className="text-white font-semibold mb-2">Challenge</h3>
                    <p className="text-gray-300 text-sm">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Solution</h3>
                    <p className="text-gray-300 text-sm">{selectedProject.solution}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Impact</h3>
                  <p className="text-gray-300 text-sm">{selectedProject.impact}</p>
                </div>

                {selectedProject.liveUrl && (
                  <Button 
                    className="w-full glass-button bg-portfolio-accent1 hover:bg-portfolio-accent1/80 text-white transition-all duration-500"
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
                    className="w-full glass-button bg-portfolio-accent1 hover:bg-portfolio-accent1/80 text-white transition-all duration-500"
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