
import { useEffect, useRef } from 'react';

interface UseCanvasProps {
  onSetup: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
  onCleanup?: () => void;
}

const useCanvas = ({ onSetup, onCleanup }: UseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Setup canvas
    onSetup(canvas, ctx);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      onCleanup?.();
    };
  }, [onSetup, onCleanup]);

  return canvasRef;
};

export default useCanvas;
