
import { CSSProperties } from 'react';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
  visible?: boolean;
}

export const AnimatedText = ({ text, delay = 0, className = "", visible = false }: AnimatedTextProps) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <span 
          key={`${text}-${index}`}
          className={`inline-block transition-all duration-500 ${
            visible 
              ? "opacity-100 transform-none" 
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${delay + index * 30}ms` } as CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};
