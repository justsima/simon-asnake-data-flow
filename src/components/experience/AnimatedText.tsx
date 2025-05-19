
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  delay: number;
  visible: boolean;
  className?: string;
}

export const AnimatedText = ({ text, delay, visible, className = "" }: AnimatedTextProps) => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        setShow(true);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [visible, delay]);
  
  return (
    <div className={className}>
      {show ? (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {text}
        </motion.span>
      ) : (
        <span style={{ opacity: 0 }}>{text}</span>
      )}
    </div>
  );
};
