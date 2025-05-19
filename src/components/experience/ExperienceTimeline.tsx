
import { motion } from 'framer-motion';
import TimelineNode from './TimelineNode';
import { experiences } from './experienceData';

interface ExperienceTimelineProps {
  activeIndex: number | null;
  experienceCount: number;
  onNodeClick: (index: number) => void;
}

const ExperienceTimeline = ({ 
  activeIndex, 
  experienceCount, 
  onNodeClick 
}: ExperienceTimelineProps) => {
  // Calculate years based on current year and experience period
  const getCurrentYear = (index: number) => {
    // Extract the year from period string (e.g., "January 2022 - Present" → 2022)
    const experience = experiences[index];
    const periodMatch = experience.period.match(/\d{4}/);
    return periodMatch ? parseInt(periodMatch[0]) : new Date().getFullYear() - index;
  };

  return (
    <motion.div 
      className="mx-auto py-8 flex flex-col space-y-8 h-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl text-white/80 mb-6 font-welland">Career Timeline</h3>
      
      {Array.from({ length: experienceCount }).map((_, index) => (
        <TimelineNode
          key={index}
          index={index}
          isActive={activeIndex === index}
          onClick={() => onNodeClick(index)}
          isFirstNode={index === 0}
          isLastNode={index === experienceCount - 1}
          year={getCurrentYear(index)}
        />
      ))}
    </motion.div>
  );
};

export default ExperienceTimeline;
