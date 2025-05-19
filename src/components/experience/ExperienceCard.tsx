
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Experience } from './types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isActive: boolean;
}

const ExperienceCard = ({ experience, index, isActive }: ExperienceCardProps) => {
  return (
    <motion.div
      className={`experience-card ${isActive ? 'is-active' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7,
        y: 0,
        scale: isActive ? 1 : 0.98
      }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border border-gray-800 bg-gray-900/60 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-white mb-1 font-micuale">{experience.title}</h3>
          <h4 className="text-xl text-[#8A89FF] mb-2 font-kiak">{experience.company}</h4>
          
          <div className="flex items-center text-gray-400 mb-4 font-welland">
            <span>{experience.period}</span>
            {experience.location && (
              <>
                <span className="mx-2">•</span>
                <span>{experience.location}</span>
              </>
            )}
          </div>
          
          {experience.description && (
            <p className="text-gray-300 mb-4 font-welland">{experience.description}</p>
          )}
          
          <div className="mt-4">
            <h5 className="text-sm uppercase text-gray-500 mb-2 font-charis">Responsibilities</h5>
            <ul className="space-y-2">
              {experience.responsibilities.map((item, i) => (
                <li key={i} className="text-gray-300 flex items-start font-welland">
                  <span className="text-[#8A89FF] mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm uppercase text-gray-500 mb-2 font-charis">Technologies</h5>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300 font-shunsine"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {experience.achievements && experience.achievements.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm uppercase text-gray-500 mb-2 font-charis">Key Achievements</h5>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-300 flex items-start font-welland">
                    <span className="text-[#8A89FF] mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceCard;
