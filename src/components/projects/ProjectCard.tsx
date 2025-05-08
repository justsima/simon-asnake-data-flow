
import { Project } from '@/types/project';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <Card 
      className="glass-card overflow-hidden flex flex-col hover:cursor-pointer transition-all duration-500"
      onClick={onClick}
    >
      <div className="relative h-[180px] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        {project.videoUrl && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
            Video Available
          </div>
        )}
        {project.liveUrl && (
          <div className="absolute bottom-2 right-2 bg-portfolio-accent1/70 text-white px-2 py-1 rounded-md text-xs">
            Live Report
          </div>
        )}
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
          {project.category}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
        
        <div className="mb-3 flex-1">
          <p className="text-sm text-gray-300 line-clamp-4">{project.solution}</p>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span 
              key={i} 
              className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
