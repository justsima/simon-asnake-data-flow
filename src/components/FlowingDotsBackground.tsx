
import { useEffect, useRef } from 'react';

interface Vector {
  x: number;
  y: number;
}

const FlowingDotsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef<Vector>({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const dotSpacing = 25; // Space between dots
    const amplitude = 30; // Wave height
    const frequency = 0.02; // Wave frequency
    const waveSpeed = 0.03; // Wave movement speed
    
    // Colors for the gradient effect
    const colors = [
      { r: 83, g: 36, b: 118, a: 0.8 },    // Deep purple
      { r: 130, g: 60, b: 180, a: 0.8 },   // Medium purple
      { r: 180, g: 70, b: 170, a: 0.8 },   // Pink-purple
      { r: 200, g: 80, b: 192, a: 0.7 },   // Bright pink
      { r: 120, g: 40, b: 170, a: 0.9 },   // Vibrant purple
      { r: 90, g: 30, b: 150, a: 0.85 }    // Rich purple
    ];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // Background color
    const drawBackground = () => {
      // Create a dark purple gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#170926');
      gradient.addColorStop(1, '#1d0a30');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Set up grid of dots
    const createGrid = () => {
      const cols = Math.floor(canvas.width / dotSpacing) + 2;
      const rows = Math.floor(canvas.height / dotSpacing) + 2;
      
      return { cols, rows };
    };

    // Calculate wave height at a given position and time
    const calculateWaveHeight = (x: number, y: number, time: number) => {
      // Multiple wave frequencies for more organic look
      const wave1 = Math.sin(x * frequency * 0.5 + time * waveSpeed) * amplitude * 0.5;
      const wave2 = Math.sin(y * frequency * 0.3 + time * waveSpeed * 0.7) * amplitude * 0.3;
      const wave3 = Math.sin((x + y) * frequency * 0.2 + time * waveSpeed * 0.5) * amplitude * 0.7;
      const wave4 = Math.cos(x * frequency * 0.4 - y * frequency * 0.3 + time * waveSpeed * 0.8) * amplitude * 0.4;
      
      // Combine waves
      return wave1 + wave2 + wave3 + wave4;
    };

    // Calculate dot size based on wave position
    const calculateDotSize = (waveHeight: number) => {
      const baseSize = 2;
      const variableSize = 1.5;
      
      // Dots at wave peaks or troughs appear larger
      return baseSize + variableSize * Math.abs(waveHeight / amplitude);
    };

    // Calculate dot opacity based on wave position
    const calculateDotOpacity = (x: number, y: number, waveHeight: number) => {
      // Base opacity
      let opacity = 0.3 + (Math.abs(waveHeight) / amplitude) * 0.7;
      
      // Distance from mouse for interactivity
      const dx = x - mousePosition.current.x;
      const dy = y - mousePosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        opacity += (1 - distance / 200) * 0.5;
      }
      
      return Math.min(opacity, 1);
    };

    // Get color based on position and wave height
    const getColorAtPosition = (x: number, y: number, waveHeight: number) => {
      // Use wave height to determine color index
      const normalizedHeight = (waveHeight + amplitude) / (amplitude * 2); // 0 to 1
      const colorIndex = Math.floor(normalizedHeight * (colors.length - 1));
      const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
      
      // Interpolate between two colors
      const colorRatio = (normalizedHeight * (colors.length - 1)) - colorIndex;
      
      const color1 = colors[colorIndex];
      const color2 = colors[nextColorIndex];
      
      return {
        r: Math.floor(color1.r * (1 - colorRatio) + color2.r * colorRatio),
        g: Math.floor(color1.g * (1 - colorRatio) + color2.g * colorRatio),
        b: Math.floor(color1.b * (1 - colorRatio) + color2.b * colorRatio),
        a: color1.a * (1 - colorRatio) + color2.a * colorRatio
      };
    };

    // Render dots
    const renderDots = (time: number) => {
      const { cols, rows } = createGrid();
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;
          
          const waveHeight = calculateWaveHeight(x, y, time);
          
          // Apply the wave effect to the y position
          const displayY = y + waveHeight;
          
          const dotSize = calculateDotSize(waveHeight);
          const opacity = calculateDotOpacity(x, y, waveHeight);
          const color = getColorAtPosition(x, y, waveHeight);
          
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

    // Draw connecting lines between nearby dots
    const drawConnections = (time: number) => {
      const { cols, rows } = createGrid();
      const connectionDistance = dotSpacing * 1.5;
      
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;
          const waveHeight1 = calculateWaveHeight(x, y, time);
          const displayY1 = y + waveHeight1;
          const color1 = getColorAtPosition(x, y, waveHeight1);
          
          // Check neighboring dots
          for (let ni = i; ni < i + 2 && ni < cols; ni++) {
            for (let nj = j; nj < j + 2 && nj < rows; nj++) {
              // Skip self
              if (ni === i && nj === j) continue;
              
              const nx = ni * dotSpacing;
              const ny = nj * dotSpacing;
              const waveHeight2 = calculateWaveHeight(nx, ny, time);
              const displayY2 = ny + waveHeight2;
              const color2 = getColorAtPosition(nx, ny, waveHeight2);
              
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

    const render = () => {
      // Increment time for animation
      timeRef.current += 0.01;
      
      // Clear canvas
      drawBackground();
      
      // Check for reduced motion preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!prefersReducedMotion) {
        // Draw connections first so they appear behind dots
        drawConnections(timeRef.current);
        
        // Render dots on top
        renderDots(timeRef.current);
      } else {
        // Simplified static version for reduced motion
        const { cols, rows } = createGrid();
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * dotSpacing;
            const y = j * dotSpacing;
            
            ctx.beginPath();
            ctx.fillStyle = 'rgba(150, 70, 180, 0.5)';
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      // Continue animation
      animationRef.current = requestAnimationFrame(render);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default FlowingDotsBackground;
