import { useState } from 'react';
import { motion } from 'framer-motion';
import { experiences } from './experience/experienceData';
import ExperienceCard from './experience/ExperienceCard';
import ExperienceTimeline from './experience/ExperienceTimeline';

const ExperienceSection = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  
  // Handle timeline node clicks
  const handleNodeClick = (index: number) => {
    setActiveCard(index);
  };

  return (
    <section 
      id="experience" 
      className="py-20 relative"
    >
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center font-alberobello">
          Work Experience
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-16 font-welland">
          My professional journey in data science and software development
        </p>
        
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 max-w-7xl mx-auto">
          {/* Timeline column */}
          <div className="hidden md:block">
            <div className="sticky top-20 self-start">
              <ExperienceTimeline 
                activeIndex={activeCard} 
                experienceCount={experiences.length} 
                onNodeClick={handleNodeClick}
              />
            </div>
          </div>
          
          {/* Experience cards column */}
          <div className="space-y-6">
            {/* Active card is shown */}
            <ExperienceCard
              experience={experiences[activeCard]}
              index={activeCard}
              isActive={true}
            />
            
            {/* Mobile timeline indicator (only visible on mobile) */}
            <div className="flex md:hidden items-center justify-center mt-8 space-x-2">
              {experiences.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleNodeClick(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeCard === i
                      ? 'bg-[#8A89FF] w-6'
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`View experience ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;