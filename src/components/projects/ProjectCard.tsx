
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
        className="h-full border border-gray-800 bg-gray-900/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-gray-700/70 hover:bg-gray-800/70 transform hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
        onClick={onClick}
      >
        <CardContent className="p-6 h-full flex flex-col">
          {/* Project Image */}
          {project.image && (
            <div className="mb-4 overflow-hidden rounded-lg">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          
          {/* Project Title */}
          <h3 className="text-xl font-bold text-white mb-2 font-micuale group-hover:text-[#8A89FF] transition-colors duration-300">
            {project.title}
          </h3>
          
          {/* Project Description */}
          <p className="text-gray-300 mb-4 font-welland flex-grow">
            {project.description}
          </p>
          
          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300 font-shunsine hover:bg-[#8A89FF]/20 hover:text-[#8A89FF] hover:border hover:border-[#8A89FF]/30 transition-colors duration-200"
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
                className="button-slide-effect group bg-gradient-to-r from-[#8A89FF]/10 to-[#6262FF]/10 backdrop-blur-lg border-[#8A89FF]/20 hover:bg-gradient-to-r hover:from-[#8A89FF]/20 hover:to-[#6262FF]/20 hover:border-[#8A89FF]/40 transition-all duration-300 text-white font-montserrat"
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
                className="button-slide-effect group bg-gradient-to-r from-[#7676FF]/10 to-[#8A89FF]/10 backdrop-blur-lg border-[#7676FF]/20 hover:bg-gradient-to-r hover:from-[#7676FF]/20 hover:to-[#8A89FF]/20 hover:border-[#7676FF]/40 transition-all duration-300 text-white font-montserrat"
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
