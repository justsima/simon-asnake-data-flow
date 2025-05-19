
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
    <div className="relative">
      {/* Connecting line above */}
      {!isFirstNode && (
        <motion.div 
          className="absolute left-1/2 -top-10 w-0.5 h-10 bg-gray-700"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* The node */}
      <button 
        onClick={onClick}
        className={`
          relative z-10 w-6 h-6 rounded-full flex items-center justify-center
          transition-all duration-300 ease-in-out border-2
          ${isActive 
            ? 'bg-[#8A89FF] border-white scale-125' 
            : 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-400'}
        `}
        aria-label={`Timeline node ${index + 1}`}
      />
      
      {/* Connecting line below */}
      {!isLastNode && (
        <motion.div 
          className="absolute left-1/2 top-6 w-0.5 h-10 bg-gray-700"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Year label for all nodes */}
      <div className={`absolute left-10 top-1 whitespace-nowrap ${isActive ? 'text-[#8A89FF] font-medium' : 'text-gray-400'}`}>
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm"
        >
          {year}
          <span className="ml-2 text-xs text-gray-500 hidden md:inline">
            {isActive ? '• Selected' : ''}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineNode;
