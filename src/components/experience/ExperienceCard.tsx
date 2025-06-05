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
      <Card className="border border-gray-800 bg-gray-900/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-gray-700/70 hover:bg-gray-800/70 transform hover:-translate-y-1.5 transition-all duration-300">
        <CardContent className="p-6">
          <motion.h3 
            className="text-2xl font-bold text-white mb-1 font-micuale"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
            transition={{ duration: 0.3, delay: isActive ? 0.1 : 0 }}
          >
            {experience.title}
          </motion.h3>
          
          <motion.h4 
            className="text-xl text-[#8A89FF] mb-2 font-kiak"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
            transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
          >
            {experience.company}
          </motion.h4>
          
          <motion.div 
            className="flex items-center text-gray-400 mb-4 font-welland"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
            transition={{ duration: 0.3, delay: isActive ? 0.3 : 0 }}
          >
            <span>{experience.period}</span>
            {experience.location && (
              <>
                <span className="mx-2">•</span>
                <span>{experience.location}</span>
              </>
            )}
          </motion.div>
          
          {experience.description && (
            <motion.p 
              className="text-gray-300 mb-4 font-welland"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
              transition={{ duration: 0.3, delay: isActive ? 0.4 : 0 }}
            >
              {experience.description}
            </motion.p>
          )}
          
          <div className="mt-4">
            <motion.h5 
              className="text-sm uppercase text-gray-500 mb-2 font-charis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
              transition={{ duration: 0.3, delay: isActive ? 0.5 : 0 }}
            >
              Responsibilities
            </motion.h5>
            <ul className="space-y-2">
              {experience.responsibilities.map((item, i) => (
                <motion.li 
                  key={i} 
                  className="text-gray-300 flex items-start font-welland hover:text-white transition-colors duration-200 group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
                  transition={{ duration: 0.3, delay: isActive ? 0.6 + (i * 0.1) : 0 }}
                >
                  <span className="text-[#8A89FF] mr-2 group-hover:scale-110 transition-transform duration-200">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="mt-4">
              <motion.h5 
                className="text-sm uppercase text-gray-500 mb-2 font-charis"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
                transition={{ duration: 0.3, delay: isActive ? 0.7 : 0 }}
              >
                Technologies
              </motion.h5>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <motion.span 
                    key={i} 
                    className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300 font-shunsine hover:bg-[#8A89FF]/20 hover:text-[#8A89FF] hover:border hover:border-[#8A89FF]/30 transition-colors duration-200 cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isActive ? 1 : 0.8, scale: 1 }}
                    transition={{ duration: 0.3, delay: isActive ? 0.8 + (i * 0.05) : 0 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
          
          {experience.achievements && experience.achievements.length > 0 && (
            <div className="mt-4">
              <motion.h5 
                className="text-sm uppercase text-gray-500 mb-2 font-charis"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
                transition={{ duration: 0.3, delay: isActive ? 0.9 : 0 }}
              >
                Key Achievements
              </motion.h5>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <motion.li 
                    key={i} 
                    className="text-gray-300 flex items-start font-welland hover:text-white transition-colors duration-200 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
                    transition={{ duration: 0.3, delay: isActive ? 1.0 + (i * 0.1) : 0 }}
                  >
                    <span className="text-[#8A89FF] mr-2 group-hover:scale-110 transition-transform duration-200">•</span>
                    <span>{achievement}</span>
                  </motion.li>
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