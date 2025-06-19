import { motion } from 'framer-motion';
import { experiences } from './experience/experienceData';
import { Experience } from './experience/types';

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  return (
    <motion.div
      className="mb-6 md:mb-8 p-4 md:p-6 rounded-xl border glass-card hover:scale-[1.02] transition-all duration-500"
      style={{
        background: 'rgba(138, 137, 255, 0.05)',
        borderColor: 'rgba(138, 137, 255, 0.15)',
        backdropFilter: 'blur(12px)'
      }}
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
        borderColor: 'rgba(138, 137, 255, 0.3)',
        boxShadow: '0 10px 30px rgba(138, 137, 255, 0.2)',
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex flex-col">
        <motion.h3 
          className="text-lg md:text-xl lg:text-2xl font-bold mb-2"
          style={{ color: 'var(--color-text-primary)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
        >
          {experience.title}
        </motion.h3>
        <motion.h4 
          className="text-base md:text-lg mb-2 font-semibold"
          style={{ color: 'var(--color-primary-500)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        >
          {experience.company}
        </motion.h4>
        
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center mb-4 gap-1 sm:gap-2"
          style={{ color: 'var(--color-text-secondary)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        >
          <span className="font-medium text-sm md:text-base" style={{ color: 'var(--color-primary-600)' }}>
            {experience.period}
          </span>
          {experience.location && (
            <>
              <span className="hidden sm:inline text-gray-500">•</span>
              <span className="text-sm md:text-base">{experience.location}</span>
            </>
          )}
        </motion.div>
        
        {experience.description && (
          <motion.p 
            className="mb-4 leading-relaxed text-sm md:text-base"
            style={{ color: 'var(--color-text-secondary)' }}
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
          <h5 className="text-xs md:text-sm uppercase mb-2 tracking-wide font-semibold"
              style={{ color: 'var(--color-primary-500)' }}>
            Key Responsibilities
          </h5>
          <ul className="space-y-2">
            {experience.responsibilities.map((item, i) => (
              <motion.li 
                key={i} 
                className="flex items-start text-xs md:text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.7 + (i * 0.1) }}
              >
                <span className="mr-2 mt-1 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }}>•</span>
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
            <h5 className="text-xs md:text-sm uppercase mb-2 tracking-wide font-semibold"
                style={{ color: 'var(--color-primary-500)' }}>
              Technologies
            </h5>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {experience.technologies.map((tech, i) => (
                <motion.span 
                  key={i} 
                  className="px-2 py-1 rounded-full text-xs border transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(138, 137, 255, 0.1)',
                    borderColor: 'rgba(138, 137, 255, 0.3)',
                    color: 'var(--color-primary-400)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.15 + 0.9 + (i * 0.05) }}
                  whileHover={{ 
                    scale: 1.05,
                    background: 'rgba(138, 137, 255, 0.2)',
                    borderColor: 'rgba(138, 137, 255, 0.5)'
                  }}
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
            <h5 className="text-xs md:text-sm uppercase mb-2 tracking-wide font-semibold"
                style={{ color: 'var(--color-primary-500)' }}>
              Key Achievements
            </h5>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start text-xs md:text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 1.1 + (i * 0.1) }}
                >
                  <span className="mr-2 mt-1 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }}>★</span>
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
      {/* Purple-themed background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, var(--color-primary-700) 0%, transparent 70%)' }}></div>
      </div>

      <div className="mobile-container relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 font-playfair"
            style={{ color: 'var(--color-text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient-primary">
              Work Experience
            </span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto font-inter"
            style={{ color: 'var(--color-text-secondary)' }}
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