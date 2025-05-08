
import { Vector } from '@/types/vector';

// Configuration for the flowing dots
const config = {
  dotSize: 2,
  dotSpacing: 30,
  dotColor: '#1A7F8C', // Teal color from original theme
  accentColor: '#6A4C93', // Purple for accent
  dotOpacityFactor: 0.7,
  lineMaxLength: 150,
  lineOpacityFactor: 0.15,
  waveSpeed: 0.02,
  waveAmplitude: 20,
  mouseInfluenceRadius: 200,
  mouseForce: 0.15,
};

export const createDotGrid = (canvas: HTMLCanvasElement) => {
  const { dotSpacing } = config;
  const dots = [];

  // Calculate grid dimensions based on canvas size
  const cols = Math.ceil(canvas.width / dotSpacing) + 2;
  const rows = Math.ceil(canvas.height / dotSpacing) + 2;

  // Create grid of dots with initial positions and properties
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * dotSpacing;
      const y = j * dotSpacing;
      const baseY = y;

      dots.push({
        x,
        y,
        baseY,
        size: config.dotSize,
        color: i % 5 === 0 && j % 5 === 0 ? config.accentColor : config.dotColor,
        vx: 0,
        vy: 0,
      });
    }
  }

  return dots;
};

export const animate = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dots: any[],
  mousePosition: Vector | null
) => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set up dark background
  ctx.fillStyle = 'rgba(13, 17, 23, 0.01)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw connecting lines first (so they appear behind dots)
  drawConnectingLines(ctx, dots);

  // Update and draw each dot
  dots.forEach((dot, index) => {
    updateDotPosition(dot, canvas, mousePosition);
    drawDot(ctx, dot);
  });
};

const updateDotPosition = (dot: any, canvas: HTMLCanvasElement, mousePosition: Vector | null) => {
  const { waveSpeed, waveAmplitude, mouseInfluenceRadius, mouseForce } = config;

  // Calculate wave motion
  const time = Date.now() * waveSpeed;
  const waveOffset = Math.sin(time + dot.x * 0.02) * waveAmplitude;
  
  // Target position includes wave motion
  let targetY = dot.baseY + waveOffset;

  // Add mouse influence if mouse is present
  if (mousePosition) {
    const dx = mousePosition.x - dot.x;
    const dy = mousePosition.y - dot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouseInfluenceRadius) {
      // Calculate force based on distance (closer = stronger)
      const force = (1 - distance / mouseInfluenceRadius) * mouseForce;
      
      // Apply force vector away from mouse
      const angle = Math.atan2(dy, dx);
      const forceX = Math.cos(angle) * force;
      const forceY = Math.sin(angle) * force;
      
      dot.vx -= forceX;
      dot.vy -= forceY;
    }
  }

  // Apply velocity with damping
  dot.vy = (dot.vy * 0.9) + ((targetY - dot.y) * 0.1);
  dot.vx = dot.vx * 0.9;
  
  // Update position
  dot.y += dot.vy;
  dot.x += dot.vx;

  // Handle edges of screen
  if (dot.x < 0) dot.x = canvas.width;
  if (dot.x > canvas.width) dot.x = 0;
  if (dot.y < 0) dot.y = 0;
  if (dot.y > canvas.height) dot.y = canvas.height;
};

const drawDot = (ctx: CanvasRenderingContext2D, dot: any) => {
  const { dotOpacityFactor } = config;
  
  // Draw dot with subtle glow effect
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
  ctx.fillStyle = dot.color;
  ctx.globalAlpha = dotOpacityFactor;
  ctx.fill();
  ctx.closePath();

  // Reset global alpha
  ctx.globalAlpha = 1;
};

const drawConnectingLines = (ctx: CanvasRenderingContext2D, dots: any[]) => {
  const { lineMaxLength, lineOpacityFactor } = config;

  ctx.beginPath();
  
  // Draw lines between nearby dots
  for (let i = 0; i < dots.length; i++) {
    const dot1 = dots[i];
    
    // Only check a subset of dots for performance
    for (let j = i + 1; j < dots.length; j += 3) {
      const dot2 = dots[j];
      
      const dx = dot1.x - dot2.x;
      const dy = dot1.y - dot2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < lineMaxLength) {
        // Make line opacity proportional to distance
        const opacity = (1 - distance / lineMaxLength) * lineOpacityFactor;
        
        ctx.moveTo(dot1.x, dot1.y);
        ctx.lineTo(dot2.x, dot2.y);
        
        // Change line color based on dot colors
        if (dot1.color === config.accentColor || dot2.color === config.accentColor) {
          ctx.strokeStyle = `rgba(106, 76, 147, ${opacity})`; // Purple with opacity
        } else {
          ctx.strokeStyle = `rgba(26, 127, 140, ${opacity})`; // Teal with opacity
        }
        
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  
  ctx.closePath();
};
