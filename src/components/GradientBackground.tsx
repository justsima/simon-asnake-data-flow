
import { useEffect, useRef } from 'react';

const GradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark, subtle colors inspired by kidus.engineer
    const colors = [
      { r: 13, g: 17, b: 23, a: 0.95 }, // Very dark blue-black (#0D1117)
      { r: 22, g: 27, b: 34, a: 0.95 }, // Dark navy (#161B22)
      { r: 17, g: 22, b: 29, a: 0.95 }, // In between
    ];

    // Create very subtle accent layers
    const accentLayers = [
      { x: 0.2, y: 0.2, radius: canvas.width * 0.3, color: { r: 155, g: 135, b: 245, a: 0.01 } }, // Purple (accent1)
      { x: 0.8, y: 0.8, radius: canvas.width * 0.4, color: { r: 126, g: 105, b: 171, a: 0.01 } }, // Purple (accent2)
      { x: 0.5, y: 0.3, radius: canvas.width * 0.5, color: { r: 30, g: 31, b: 44, a: 0.015 } }, // Dark accent
    ];

    let currentColorIndex = 0;
    let nextColorIndex = 1;
    let interpolationFactor = 0;
    const transitionSpeed = 0.0003; // Very slow transition for background

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update accent layers sizes on resize
      accentLayers[0].radius = canvas.width * 0.3;
      accentLayers[1].radius = canvas.width * 0.4;
      accentLayers[2].radius = canvas.width * 0.5;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const lerp = (start: number, end: number, t: number) => {
      return start * (1 - t) + end * t;
    };

    // Animation variables
    let angle = 0;
    const angleSpeed = 0.0001; // Very slow animation

    const animate = () => {
      const currentColor = colors[currentColorIndex];
      const nextColor = colors[nextColorIndex];

      // Smooth color transition
      const r = lerp(currentColor.r, nextColor.r, interpolationFactor);
      const g = lerp(currentColor.g, nextColor.g, interpolationFactor);
      const b = lerp(currentColor.b, nextColor.b, interpolationFactor);
      const a = lerp(currentColor.a, nextColor.a, interpolationFactor);

      // Create very subtle gradient background
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw very subtle accent layers
      angle += angleSpeed;
      accentLayers.forEach((layer, index) => {
        // Very subtle movement
        const offsetX = Math.sin(angle + index * 1.5) * canvas.width * 0.02;
        const offsetY = Math.cos(angle * 0.8 + index) * canvas.height * 0.02;
        
        const xPos = layer.x * canvas.width + offsetX;
        const yPos = layer.y * canvas.height + offsetY;
        
        const grd = ctx.createRadialGradient(
          xPos, yPos, 0, 
          xPos, yPos, layer.radius
        );
        
        grd.addColorStop(0, `rgba(${layer.color.r}, ${layer.color.g}, ${layer.color.b}, ${layer.color.a})`);
        grd.addColorStop(1, `rgba(${layer.color.r}, ${layer.color.g}, ${layer.color.b}, 0)`);
        
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(xPos, yPos, layer.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      interpolationFactor += transitionSpeed;

      if (interpolationFactor >= 1) {
        interpolationFactor = 0;
        currentColorIndex = nextColorIndex;
        nextColorIndex = (nextColorIndex + 1) % colors.length;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.99 }}
    />
  );
};

export default GradientBackground;
