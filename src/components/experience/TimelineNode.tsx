
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TimelineNodeProps {
  isActive: boolean;
  onClick: () => void;
  index: number;
  isFirstNode: boolean;
  isLastNode: boolean;
}

const TimelineNode = ({ 
  isActive, 
  onClick, 
  index,
  isFirstNode,
  isLastNode 
}: TimelineNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline connector line above - only hide for the first node */}
      {!isFirstNode && (
        <motion.div 
          className="absolute w-0.5 bg-gradient-to-b from-gray-600 to-gray-500 left-1/2 -translate-x-1/2 top-[-150px] h-[150px]"
          initial={{ height: 0 }}
          animate={{ height: '150px' }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          style={{ opacity: isActive || isHovered ? 0.9 : 0.6 }}
        />
      )}
      
      {/* Node circle */}
      <motion.button 
        onClick={onClick}
        className={`
          h-8 w-8 rounded-full flex items-center justify-center z-10 relative
          transition-all duration-300
          ${isActive 
            ? 'bg-[#8A89FF] scale-125 shadow-[0_0_15px_rgba(138,137,255,0.5)]' 
            : 'bg-gray-700 hover:bg-gray-600'}
        `}
        aria-label={`View experience ${index + 1}`}
        whileHover={{ scale: isActive ? 1.3 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span 
          className={`
            absolute inset-0 rounded-full animate-ping 
            ${isActive ? 'bg-[#8A89FF] opacity-30' : 'bg-transparent opacity-0'}
            ${isHovered && !isActive ? 'bg-gray-600 opacity-20' : ''}
          `}
        />
        <motion.span 
          className={`
            w-2 h-2 rounded-full bg-white
            transition-transform duration-300
            ${isActive ? 'scale-100' : 'scale-0'}
          `}
          animate={isActive ? { scale: [0, 1.2, 1] } : { scale: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
      
      {/* Timeline connector line below - only hide for the last node */}
      {!isLastNode && (
        <motion.div 
          className="absolute w-0.5 bg-gradient-to-b from-gray-500 to-gray-700 left-1/2 -translate-x-1/2 top-8 h-[150px]"
          initial={{ height: 0 }}
          animate={{ height: '150px' }}
          transition={{ duration: 0.8, delay: (index + 1) * 0.2 }}
          style={{ opacity: isActive || isHovered ? 0.9 : 0.6 }}
        />
      )}
    </div>
  );
};

export default TimelineNode;
