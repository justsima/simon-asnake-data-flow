
import { useRef, useCallback } from 'react';
import { Vector } from '@/types/vector';
import { 
  dotColors, 
  dotConfig,
  drawBackground,
  createGrid,
  calculateWaveHeight,
  calculateDotSize,
  calculateDotOpacity,
  getColorAtPosition
} from '@/utils/flowingDotsUtils';

const useFlowingDots = () => {
  const mousePosition = useRef<Vector>({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePosition.current = {
      x: e.clientX,
      y: e.clientY
    };
  }, []);

  const renderDots = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) => {
    const { cols, rows } = createGrid(canvas.width, canvas.height, dotConfig.spacing);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * dotConfig.spacing;
        const y = j * dotConfig.spacing;
        
        const waveHeight = calculateWaveHeight(
          x, y, time, dotConfig.frequency, dotConfig.amplitude, dotConfig.waveSpeed
        );
        
        // Apply the wave effect to the y position
        const displayY = y + waveHeight;
        
        const dotSize = calculateDotSize(waveHeight, dotConfig.amplitude);
        const opacity = calculateDotOpacity(x, y, waveHeight, dotConfig.amplitude, mousePosition.current);
        const color = getColorAtPosition(x, y, waveHeight, dotConfig.amplitude, dotColors);
        
        // Draw the dot with glow effect
        const glowSize = dotSize * 3;
        const gradient = ctx.createRadialGradient(x, displayY, 0, x, displayY, glowSize);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, displayY, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 1.2})`;
        ctx.arc(x, displayY, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) => {
    const { cols, rows } = createGrid(canvas.width, canvas.height, dotConfig.spacing);
    const connectionDistance = dotConfig.spacing * 1.5;
    
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * dotConfig.spacing;
        const y = j * dotConfig.spacing;
        const waveHeight1 = calculateWaveHeight(
          x, y, time, dotConfig.frequency, dotConfig.amplitude, dotConfig.waveSpeed
        );
        const displayY1 = y + waveHeight1;
        const color1 = getColorAtPosition(x, y, waveHeight1, dotConfig.amplitude, dotColors);
        
        // Check neighboring dots
        for (let ni = i; ni < i + 2 && ni < cols; ni++) {
          for (let nj = j; nj < j + 2 && nj < rows; nj++) {
            // Skip self
            if (ni === i && nj === j) continue;
            
            const nx = ni * dotConfig.spacing;
            const ny = nj * dotConfig.spacing;
            const waveHeight2 = calculateWaveHeight(
              nx, ny, time, dotConfig.frequency, dotConfig.amplitude, dotConfig.waveSpeed
            );
            const displayY2 = ny + waveHeight2;
            const color2 = getColorAtPosition(nx, ny, waveHeight2, dotConfig.amplitude, dotColors);
            
            // Calculate distance
            const dx = x - nx;
            const dy = displayY1 - displayY2;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              // Create gradient line
              const opacity = (1 - distance / connectionDistance) * 0.5;
              const gradient = ctx.createLinearGradient(x, displayY1, nx, displayY2);
              gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${opacity})`);
              gradient.addColorStop(1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${opacity})`);
              
              ctx.strokeStyle = gradient;
              ctx.beginPath();
              ctx.moveTo(x, displayY1);
              ctx.lineTo(nx, displayY2);
              ctx.stroke();
            }
          }
        }
      }
    }
  };

  const renderSimplifiedDots = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { cols, rows } = createGrid(canvas.width, canvas.height, dotConfig.spacing);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * dotConfig.spacing;
        const y = j * dotConfig.spacing;
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(150, 70, 180, 0.5)';
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const setupAnimation = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Increment time for animation
      timeRef.current += 0.01;
      
      // Clear canvas
      drawBackground(ctx, canvas.width, canvas.height);
      
      // Check for reduced motion preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!prefersReducedMotion) {
        // Draw connections first so they appear behind dots
        drawConnections(ctx, canvas, timeRef.current);
        
        // Render dots on top
        renderDots(ctx, canvas, timeRef.current);
      } else {
        // Simplified static version for reduced motion
        renderSimplifiedDots(ctx, canvas);
      }
      
      // Continue animation
      animationRef.current = requestAnimationFrame(render);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { setupAnimation };
};

export default useFlowingDots;
