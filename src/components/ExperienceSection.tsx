import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { experiences } from './experience/experienceData';
import { Experience } from './experience/types';

const CascadingExperienceCard = ({ 
  experience, 
  index, 
  totalCards 
}: { 
  experience: Experience; 
  index: number; 
  totalCards: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7.5, -7.5]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7.5, 7.5]));

  // Calculate depth and positioning based on index
  const zIndex = totalCards - index;
  const translateZ = -index * 50;
  const delay = index * 0.2;
  
  // Parallax effect - cards move at different speeds
  const parallaxSpeed = 1 - (index * 0.1);
  const y = useTransform(scrollYProgress, [0, 1], [100 * parallaxSpeed, -100 * parallaxSpeed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  
  // Dynamic blur based on scroll position
  const blurAmount = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 4, 4, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full"
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        perspective: "1200px",
        y,
        opacity,
        scale,
      }}
      initial={{ opacity: 0, y: 100, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative mx-auto max-w-4xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transform: `translateZ(${translateZ}px)`,
        }}
      >
        {/* Glass card with dynamic blur */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10"
          style={{
            backdropFilter: useTransform(blurAmount, (value) => `blur(${value}px)`),
            background: `linear-gradient(135deg, 
              rgba(26, 127, 140, ${0.1 + index * 0.05}) 0%, 
              rgba(21, 105, 122, ${0.05 + index * 0.03}) 50%,
              rgba(8, 8, 13, ${0.3 + index * 0.1}) 100%)`,
          }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(45deg, 
                transparent 0%, 
                rgba(26, 127, 140, 0.3) 50%, 
                transparent 100%)`,
              opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.8, 0]),
            }}
          />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-portfolio-teal/40 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Card content - mobile optimized */}
          <div className="relative p-4 md:p-6 lg:p-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: delay + 0.3 }}
            >
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex-1">
                  <motion.h3 
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 font-micuale"
                    whileHover={{ scale: 1.02, color: "#1A7F8C" }}
                    transition={{ duration: 0.2 }}
                  >
                    {experience.title}
                  </motion.h3>
                  
                  <motion.h4 
                    className="text-lg sm:text-xl text-portfolio-teal mb-3 font-kiak"
                    whileHover={{ scale: 1.02 }}
                  >
                    {experience.company}
                  </motion.h4>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-300 mb-3 md:mb-4 font-welland gap-1 md:gap-2 text-sm md:text-base">
                    <span className="text-portfolio-teal font-medium">{experience.period}</span>
                    {experience.location && (
                      <>
                        <span className="hidden sm:inline mx-2">•</span>
                        <span>{experience.location}</span>
                      </>
                    )}
                  </div>
                  
                  {experience.description && (
                    <motion.p 
                      className="text-gray-300 mb-4 md:mb-6 font-welland leading-relaxed text-sm md:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: delay + 0.5 }}
                    >
                      {experience.description}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Responsibilities - mobile optimized */}
              <div className="mb-4 md:mb-6">
                <h5 className="text-xs md:text-sm uppercase text-portfolio-teal mb-2 md:mb-3 font-charis tracking-wide">
                  Key Responsibilities
                </h5>
                <div className="grid gap-1.5 md:gap-2">
                  {experience.responsibilities.slice(0, 3).map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="text-gray-300 flex items-start font-welland group text-sm md:text-base"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: delay + 0.6 + (i * 0.1) }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-portfolio-teal mr-2 md:mr-3 mt-0.5 md:mt-1 group-hover:scale-125 transition-transform duration-200 text-sm">→</span>
                      <span className="leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies - mobile optimized */}
              {experience.technologies && (
                <div className="mb-4 md:mb-6">
                  <h5 className="text-xs md:text-sm uppercase text-portfolio-teal mb-2 md:mb-3 font-charis tracking-wide">
                    Technologies
                  </h5>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {experience.technologies.slice(0, 6).map((tech, i) => (
                      <motion.span 
                        key={i} 
                        className="px-2 md:px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-xs text-gray-300 font-shunsine border border-white/10 hover:border-portfolio-teal/50 hover:bg-portfolio-teal/10 hover:text-portfolio-teal transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delay + 0.8 + (i * 0.05) }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements - mobile optimized */}
              {experience.achievements && (
                <div>
                  <h5 className="text-xs md:text-sm uppercase text-portfolio-teal mb-2 md:mb-3 font-charis tracking-wide">
                    Key Achievements
                  </h5>
                  <div className="grid gap-1.5 md:gap-2">
                    {experience.achievements.slice(0, 2).map((achievement, i) => (
                      <motion.div 
                        key={i} 
                        className="text-gray-300 flex items-start font-welland group text-sm md:text-base"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 1.0 + (i * 0.1) }}
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-portfolio-teal mr-2 md:mr-3 mt-0.5 md:mt-1 group-hover:scale-125 transition-transform duration-200 text-sm">★</span>
                        <span className="leading-relaxed">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="experience" 
      className="py-20 relative overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-portfolio-navy/10 to-transparent" />
      
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-alberobello"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Work Experience
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto font-welland"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My professional journey through data science and software development
          </motion.p>
        </div>
        
        {/* Cascading cards container - mobile responsive */}
        <div 
          ref={containerRef}
          className="relative min-h-[2500px] md:min-h-[3500px] lg:min-h-[4000px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {experiences.map((experience, index) => (
            <CascadingExperienceCard
              key={index}
              experience={experience}
              index={index}
              totalCards={experiences.length}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;