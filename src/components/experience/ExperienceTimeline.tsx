
import { motion } from 'framer-motion';
import TimelineNode from './TimelineNode';

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
  return (
    <motion.div 
      className="h-full flex flex-col items-center justify-around"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {Array.from({ length: experienceCount }).map((_, index) => (
        <TimelineNode
          key={index}
          index={index}
          isActive={activeIndex === index}
          onClick={() => onNodeClick(index)}
          isFirstNode={index === 0}
          isLastNode={index === experienceCount - 1}
        />
      ))}
    </motion.div>
  );
};

export default ExperienceTimeline;
