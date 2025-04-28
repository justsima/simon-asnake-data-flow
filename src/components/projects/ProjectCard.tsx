
import { useState, useRef, useEffect } from 'react';
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
    
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    
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
        <div className="absolute inset-0 bg-gradient-to-br from-portfolio-accent1/20 to-portfolio-accent2/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="glass-layer-3 p-6 h-full">
          <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
          <p className="text-gray-300 mb-4 line-clamp-2">{project.challenge}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-portfolio-accent1/10 text-portfolio-accent1 hover:bg-portfolio-accent1/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
          
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="w-full mt-4 bg-portfolio-accent1/20 hover:bg-portfolio-accent1/30 text-portfolio-accent1"
          >
            View Details
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl bg-portfolio-darkCard border-portfolio-darkBorder">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              {project.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-portfolio-accent1">Challenge</h4>
              <p className="text-gray-300">{project.challenge}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-portfolio-accent1">Solution</h4>
              <p className="text-gray-300">{project.solution}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-portfolio-accent1">Impact</h4>
              <p className="text-gray-300">{project.impact}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-portfolio-accent1/10 text-portfolio-accent1"
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
                "border-portfolio-darkBorder hover:bg-portfolio-accent1/10",
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
                "border-portfolio-darkBorder hover:bg-portfolio-accent1/10",
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
