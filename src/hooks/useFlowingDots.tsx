
import { useCallback, useEffect, useRef, useState } from 'react';
import { createDotGrid, animate } from '@/utils/flowingDotsUtils';
import { Vector } from '@/types/vector';

const useFlowingDots = () => {
  const animationRef = useRef<number>(0);
  const mousePosition = useRef<Vector | null>(null);
  const dotsRef = useRef<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const setupAnimation = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // Clean up previous animation if it exists
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Initialize dots grid
    const dots = createDotGrid(canvas);
    dotsRef.current = dots;
    setIsInitialized(true);

    // Animation function
    const animateDots = () => {
      animate(canvas, ctx, dots, mousePosition.current);
      animationRef.current = requestAnimationFrame(animateDots);
    };

    // Start animation
    animateDots();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { setupAnimation, isInitialized };
};

export default useFlowingDots;
