
import { Vector } from '@/types/vector';

// Colors for the gradient effect
export const dotColors = [
  { r: 83, g: 36, b: 118, a: 0.8 },    // Deep purple
  { r: 130, g: 60, b: 180, a: 0.8 },   // Medium purple
  { r: 180, g: 70, b: 170, a: 0.8 },   // Pink-purple
  { r: 200, g: 80, b: 192, a: 0.7 },   // Bright pink
  { r: 120, g: 40, b: 170, a: 0.9 },   // Vibrant purple
  { r: 90, g: 30, b: 150, a: 0.85 }    // Rich purple
];

// Configuration
export const dotConfig = {
  spacing: 25,      // Space between dots
  amplitude: 30,    // Wave height
  frequency: 0.02,  // Wave frequency
  waveSpeed: 0.03,  // Wave movement speed
};

// Draw background
export const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Create a dark purple gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#170926');
  gradient.addColorStop(1, '#1d0a30');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

// Set up grid of dots
export const createGrid = (width: number, height: number, spacing: number) => {
  const cols = Math.floor(width / spacing) + 2;
  const rows = Math.floor(height / spacing) + 2;
  
  return { cols, rows };
};

// Calculate wave height at a given position and time
export const calculateWaveHeight = (x: number, y: number, time: number, frequency: number, amplitude: number, waveSpeed: number) => {
  // Multiple wave frequencies for more organic look
  const wave1 = Math.sin(x * frequency * 0.5 + time * waveSpeed) * amplitude * 0.5;
  const wave2 = Math.sin(y * frequency * 0.3 + time * waveSpeed * 0.7) * amplitude * 0.3;
  const wave3 = Math.sin((x + y) * frequency * 0.2 + time * waveSpeed * 0.5) * amplitude * 0.7;
  const wave4 = Math.cos(x * frequency * 0.4 - y * frequency * 0.3 + time * waveSpeed * 0.8) * amplitude * 0.4;
  
  // Combine waves
  return wave1 + wave2 + wave3 + wave4;
};

// Calculate dot size based on wave position
export const calculateDotSize = (waveHeight: number, amplitude: number) => {
  const baseSize = 2;
  const variableSize = 1.5;
  
  // Dots at wave peaks or troughs appear larger
  return baseSize + variableSize * Math.abs(waveHeight / amplitude);
};

// Calculate dot opacity based on wave position and mouse distance
export const calculateDotOpacity = (x: number, y: number, waveHeight: number, amplitude: number, mousePosition: Vector) => {
  // Base opacity
  let opacity = 0.3 + (Math.abs(waveHeight) / amplitude) * 0.7;
  
  // Distance from mouse for interactivity
  const dx = x - mousePosition.x;
  const dy = y - mousePosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < 200) {
    opacity += (1 - distance / 200) * 0.5;
  }
  
  return Math.min(opacity, 1);
};

// Get color based on position and wave height
export const getColorAtPosition = (x: number, y: number, waveHeight: number, amplitude: number, colors: typeof dotColors) => {
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
