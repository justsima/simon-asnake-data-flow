import { motion } from 'framer-motion';
import { experiences } from './experience/experienceData';
import { Experience } from './experience/types';

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  return (
    <motion.div
      className="mb-8 p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{experience.title}</h3>
        <h4 className="text-lg text-portfolio-teal mb-2">{experience.company}</h4>
        
        <div className="flex flex-col sm:flex-row sm:items-center text-gray-300 mb-4 gap-1 sm:gap-2">
          <span className="text-portfolio-teal font-medium">{experience.period}</span>
          {experience.location && (
            <>
              <span className="hidden sm:inline">•</span>
              <span>{experience.location}</span>
            </>
          )}
        </div>
        
        {experience.description && (
          <p className="text-gray-300 mb-4 leading-relaxed">{experience.description}</p>
        )}

        {/* Responsibilities */}
        <div className="mb-4">
          <h5 className="text-sm uppercase text-portfolio-teal mb-2 tracking-wide">Key Responsibilities</h5>
          <ul className="space-y-1">
            {experience.responsibilities.map((item, i) => (
              <li key={i} className="text-gray-300 flex items-start text-sm">
                <span className="text-portfolio-teal mr-2 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        {experience.technologies && (
          <div className="mb-4">
            <h5 className="text-sm uppercase text-portfolio-teal mb-2 tracking-wide">Technologies</h5>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, i) => (
                <span 
                  key={i} 
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {experience.achievements && (
          <div>
            <h5 className="text-sm uppercase text-portfolio-teal mb-2 tracking-wide">Key Achievements</h5>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, i) => (
                <li key={i} className="text-gray-300 flex items-start text-sm">
                  <span className="text-portfolio-teal mr-2 mt-1">★</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Work Experience
          </motion.h2>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My professional journey through data science and software development
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;