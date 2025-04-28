
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  totalProjects: number;
}

export const ProjectCard = ({ project, index, onNavigate, totalProjects }: ProjectCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduce tilt effect for subtler 3D
    const tiltX = (y - centerY) / 30;
    const tiltY = (centerX - x) / 30;
    
    setTilt({ x: tiltX, y: tiltY });
  };
  
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <>
      <div
        ref={cardRef}
        className="group relative rounded-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Card background with glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-portfolio-accent1/5 to-portfolio-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
        
        {/* Card content */}
        <div className="glass-layer-3 p-6 h-full border border-white/5 shadow-lg">
          <h3 className="text-xl font-semibold mb-3 text-white font-montserrat">{project.title}</h3>
          <p className="text-gray-300 mb-4 line-clamp-2 font-inter">{project.challenge}</p>
          
          {/* Technology badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-portfolio-accent1/10 text-portfolio-accent1 hover:bg-portfolio-accent1/20 transition-colors duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
          
          {/* View details button with hover effect */}
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="w-full mt-4 bg-portfolio-accent1/10 hover:bg-portfolio-accent1/20 text-portfolio-accent1 border border-portfolio-accent1/20 relative overflow-hidden group-hover:shadow-glow transition-all duration-300"
          >
            <span className="relative z-10">View Details</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-portfolio-accent1/0 via-portfolio-accent1/20 to-portfolio-accent1/0 -translate-x-full group-hover:animate-shimmer" />
          </Button>
        </div>
      </div>

      {/* Project details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl bg-portfolio-darkCard border-portfolio-darkBorder backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white font-playfair">
              {project.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-portfolio-accent1 font-montserrat">Challenge</h4>
              <p className="text-gray-300 font-inter">{project.challenge}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-portfolio-accent1 font-montserrat">Solution</h4>
              <p className="text-gray-300 font-inter">{project.solution}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-portfolio-accent1 font-montserrat">Impact</h4>
              <p className="text-gray-300 font-inter">{project.impact}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-portfolio-accent1/10 text-portfolio-accent1 transition-colors duration-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => onNavigate('prev')}
              disabled={index === 0}
              className={cn(
                "border-portfolio-darkBorder bg-portfolio-darkCard/70 hover:bg-portfolio-accent1/10 transition-all duration-300",
                index === 0 && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('next')}
              disabled={index === totalProjects - 1}
              className={cn(
                "border-portfolio-darkBorder bg-portfolio-darkCard/70 hover:bg-portfolio-accent1/10 transition-all duration-300",
                index === totalProjects - 1 && "opacity-50 cursor-not-allowed"
              )}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
