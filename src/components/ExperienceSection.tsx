import { motion } from 'framer-motion';
import { experiences } from './experience/experienceData';
import { Experience } from './experience/types';

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  return (
    <motion.div
      className="mb-6 md:mb-8 p-4 md:p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-white/20"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex flex-col">
        <motion.h3 
          className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
        >
          {experience.title}
        </motion.h3>
        <motion.h4 
          className="text-base md:text-lg text-portfolio-teal mb-2 font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        >
          {experience.company}
        </motion.h4>
        
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center text-gray-300 mb-4 gap-1 sm:gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        >
          <span className="text-portfolio-teal font-medium text-sm md:text-base">{experience.period}</span>
          {experience.location && (
            <>
              <span className="hidden sm:inline text-gray-500">•</span>
              <span className="text-sm md:text-base">{experience.location}</span>
            </>
          )}
        </motion.div>
        
        {experience.description && (
          <motion.p 
            className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
          >
            {experience.description}
          </motion.p>
        )}

        {/* Responsibilities */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.6 }}
        >
          <h5 className="text-xs md:text-sm uppercase text-portfolio-teal mb-2 tracking-wide font-semibold">Key Responsibilities</h5>
          <ul className="space-y-2">
            {experience.responsibilities.map((item, i) => (
              <motion.li 
                key={i} 
                className="text-gray-300 flex items-start text-xs md:text-sm leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.7 + (i * 0.1) }}
              >
                <span className="text-portfolio-teal mr-2 mt-1 flex-shrink-0">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Technologies */}
        {experience.technologies && (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.8 }}
          >
            <h5 className="text-xs md:text-sm uppercase text-portfolio-teal mb-2 tracking-wide font-semibold">Technologies</h5>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {experience.technologies.map((tech, i) => (
                <motion.span 
                  key={i} 
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20 hover:bg-white/20 hover:border-portfolio-teal/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.15 + 0.9 + (i * 0.05) }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        {experience.achievements && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 1.0 }}
          >
            <h5 className="text-xs md:text-sm uppercase text-portfolio-teal mb-2 tracking-wide font-semibold">Key Achievements</h5>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <motion.li 
                  key={i} 
                  className="text-gray-300 flex items-start text-xs md:text-sm leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 1.1 + (i * 0.1) }}
                >
                  <span className="text-portfolio-teal mr-2 mt-1 flex-shrink-0">★</span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
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