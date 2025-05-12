
import { useState } from 'react';

interface TimelineNodeProps {
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const TimelineNode = ({ isActive, onClick, index }: TimelineNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline connector line above */}
      {index > 0 && (
        <div 
          className="absolute w-0.5 bg-gradient-to-b from-gray-700 to-gray-500 left-1/2 -translate-x-1/2 top-[-40px] h-10"
          style={{ opacity: 0.6 }}
        />
      )}
      
      {/* Node circle */}
      <button 
        onClick={onClick}
        className={`
          h-6 w-6 rounded-full flex items-center justify-center z-10 relative
          transition-all duration-300
          ${isActive 
            ? 'bg-[#8A89FF] scale-125 shadow-[0_0_15px_rgba(138,137,255,0.5)]' 
            : 'bg-gray-700 hover:bg-gray-600'}
        `}
        aria-label={`View experience ${index + 1}`}
      >
        <span 
          className={`
            absolute inset-0 rounded-full animate-ping 
            ${isActive ? 'bg-[#8A89FF] opacity-30' : 'bg-transparent opacity-0'}
            ${isHovered && !isActive ? 'bg-gray-600 opacity-20' : ''}
          `}
        />
        <span 
          className={`
            w-1.5 h-1.5 rounded-full bg-white
            transition-transform duration-300
            ${isActive ? 'scale-100' : 'scale-0'}
          `}
        />
      </button>
      
      {/* Timeline connector line below */}
      <div 
        className="absolute w-0.5 bg-gradient-to-b from-gray-500 to-gray-700 left-1/2 -translate-x-1/2 top-6 h-[calc(100%-6px)]"
        style={{ opacity: 0.6 }}
      />
    </div>
  );
};

export default TimelineNode;
