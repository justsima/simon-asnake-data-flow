
import { useEffect, useRef } from 'react';

const GradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pure black colors
    const colors = [
      { r: 0, g: 0, b: 0, a: 1 },      // Pure black
      { r: 2, g: 2, b: 4, a: 1 },      // Very subtle dark blue-black
      { r: 0, g: 0, b: 0, a: 1 },      // Back to pure black
    ];

    // Create very subtle star accent layers - fewer and more subtle for minimalist look
    const accentLayers = [
      { x: 0.2, y: 0.2, radius: canvas.width * 0.4, color: { r: 40, g: 40, b: 45, a: 0.001 } }, // Very subtle glow
      { x: 0.8, y: 0.8, radius: canvas.width * 0.5, color: { r: 20, g: 20, b: 25, a: 0.001 } }, // Very subtle glow
    ];

    // Add stars
    const stars = [];
    const starCount = 100; // Reduced star count for minimalist design
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5, // Smaller stars
        opacity: Math.random() * 0.7, // More subtle stars
        blinkSpeed: Math.random() * 0.01
      });
    }

    let currentColorIndex = 0;
    let nextColorIndex = 1;
    let interpolationFactor = 0;
    const transitionSpeed = 0.0001; // Extremely slow transition

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update accent layers sizes on resize
      accentLayers[0].radius = canvas.width * 0.4;
      accentLayers[1].radius = canvas.width * 0.5;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const lerp = (start: number, end: number, t: number) => {
      return start * (1 - t) + end * t;
    };

    // Animation variables
    let angle = 0;
    const angleSpeed = 0.00003; // Extremely slow animation
    let time = 0;

    const animate = () => {
      time += 0.005;
      
      const currentColor = colors[currentColorIndex];
      const nextColor = colors[nextColorIndex];

      // Smooth color transition
      const r = lerp(currentColor.r, nextColor.r, interpolationFactor);
      const g = lerp(currentColor.g, nextColor.g, interpolationFactor);
      const b = lerp(currentColor.b, nextColor.b, interpolationFactor);
      const a = lerp(currentColor.a, nextColor.a, interpolationFactor);

      // Create solid black background
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw very subtle accent layers
      angle += angleSpeed;
      accentLayers.forEach((layer, index) => {
        // Very subtle movement
        const offsetX = Math.sin(angle + index * 1.5) * canvas.width * 0.005;
        const offsetY = Math.cos(angle * 0.4 + index) * canvas.height * 0.005;
        
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
      
      // Draw stars
      stars.forEach(star => {
        // Make stars twinkle
        const blinkFactor = Math.sin(time * star.blinkSpeed) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * blinkFactor})`;
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
      style={{ opacity: 1 }}
    />
  );
};

export default GradientBackground;
