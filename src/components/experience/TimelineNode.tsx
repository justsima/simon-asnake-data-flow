
import { motion } from 'framer-motion';

interface TimelineNodeProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
  isFirstNode: boolean;
  isLastNode: boolean;
}

const TimelineNode = ({ 
  index, 
  isActive, 
  onClick, 
  isFirstNode, 
  isLastNode 
}: TimelineNodeProps) => {
  return (
    <div className="relative">
      {/* Connecting line above */}
      {!isFirstNode && (
        <motion.div 
          className="absolute left-1/2 -top-20 w-0.5 h-20 bg-gray-700"
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ duration: 1, delay: 0.2 * index }}
        />
      )}
      
      {/* The node */}
      <button 
        onClick={onClick}
        className={`
          relative z-10 w-5 h-5 rounded-full 
          transition-all duration-500 ease-in-out
          ${isActive ? 'bg-[#8A89FF] scale-150' : 'bg-gray-600 hover:bg-gray-500'}
        `}
        aria-label={`Timeline node ${index + 1}`}
      />
      
      {/* Connecting line below */}
      {!isLastNode && (
        <motion.div 
          className="absolute left-1/2 top-5 w-0.5 h-20 bg-gray-700"
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ duration: 1, delay: 0.2 * index + 0.1 }}
        />
      )}
      
      {/* Year indicator for active node */}
      {isActive && (
        <div className="absolute -left-16 top-0 w-12 text-right">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-[#8A89FF]"
          >
            {2022 - index}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TimelineNode;
