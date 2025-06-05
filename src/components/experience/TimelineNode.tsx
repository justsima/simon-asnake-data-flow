import { motion } from 'framer-motion';

interface TimelineNodeProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
  isFirstNode: boolean;
  isLastNode: boolean;
  year: number;
}

const TimelineNode = ({ 
  index, 
  isActive, 
  onClick, 
  isFirstNode, 
  isLastNode,
  year
}: TimelineNodeProps) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Connecting line above */}
      {!isFirstNode && (
        <motion.div 
          className="absolute left-1/2 -top-10 w-0.5 h-10 bg-gray-700"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
        />
      )}
      
      {/* The node */}
      <motion.button 
        onClick={onClick}
        className={`
          relative z-10 w-6 h-6 rounded-full flex items-center justify-center
          transition-all duration-300 ease-in-out border-2 group
          ${isActive 
            ? 'bg-[#8A89FF] border-white scale-125 shadow-[0_0_15px_5px_rgba(138,137,255,0.3)]' 
            : 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-400 hover:scale-115 hover:shadow-[0_0_10px_3px_rgba(138,137,255,0.2)]'}
        `}
        aria-label={`Timeline node ${index + 1}`}
        whileHover={{ scale: isActive ? 1.25 : 1.15 }}
        whileTap={{ scale: isActive ? 1.2 : 1.1 }}
      />
      
      {/* Connecting line below */}
      {!isLastNode && (
        <motion.div 
          className="absolute left-1/2 top-6 w-0.5 h-10 bg-gray-700"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
        />
      )}
      
      {/* Year label with enhanced hover effects */}
      <motion.div 
        className={`absolute left-10 top-1 whitespace-nowrap transition-all duration-300 group-hover:font-medium ${
          isActive 
            ? 'text-[#8A89FF] font-medium' 
            : 'text-gray-400 group-hover:text-[#8A89FF]'
        }`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
      >
        <div className="text-sm">
          {year}
          <span className="ml-2 text-xs text-gray-500 hidden md:inline">
            {isActive ? '• Selected' : ''}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineNode;