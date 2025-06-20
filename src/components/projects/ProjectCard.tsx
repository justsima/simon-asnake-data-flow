import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  index?: number;
  onClick?: () => void;
}

const ProjectCard = ({ project, index = 0, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card 
        className="modern-glass-card h-full shadow-lg transform transition-all duration-300 group cursor-pointer border-0"
        onClick={onClick}
      >
        <CardContent className="p-6 h-full flex flex-col">
          {/* Project Image */}
          {project.image && (
            <div className="mb-4 overflow-hidden rounded-[12px]">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          
          {/* Project Title */}
          <h3 className="text-xl font-bold text-white mb-2 hero-subtitle group-hover:text-[#8A89FF] transition-colors duration-300">
            {project.title}
          </h3>
          
          {/* Project Description */}
          <p className="text-gray-300 mb-4 hero-description flex-grow">
            {project.description}
          </p>
          
          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="modern-glass-card px-2 py-1 text-xs text-gray-300 hero-description hover:text-[#8A89FF] hover:border-[#8A89FF]/30 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Project Links */}
          <div className="flex gap-3 mt-auto">
            {project.liveUrl && (
              <Button
                variant="outline"
                size="sm"
                className="modern-button text-white hero-description border-0"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.liveUrl, '_blank');
                }}
              >
                <ExternalLink size={16} className="mr-2" />
                Live Demo
              </Button>
            )}
            
            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                className="modern-button text-white hero-description border-0"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank');
                }}
              >
                <Github size={16} className="mr-2" />
                Code
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;