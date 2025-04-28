
import { useEffect, useRef } from 'react';

const GradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = [
      { r: 22, g: 27, b: 34, a: 0.8 },
      { r: 26, g: 31, b: 44, a: 0.8 },
      { r: 38, g: 41, b: 56, a: 0.8 },
    ];

    // Create floating blobs
    const blobs = [
      { x: 0.2, y: 0.3, radius: canvas.width * 0.3, color: { r: 155, g: 135, b: 245, a: 0.05 } }, // Purple
      { x: 0.8, y: 0.7, radius: canvas.width * 0.2, color: { r: 126, g: 105, b: 171, a: 0.04 } }, // Darker purple
      { x: 0.5, y: 0.5, radius: canvas.width * 0.4, color: { r: 30, g: 31, b: 44, a: 0.06 } },   // Dark background
    ];

    let currentColorIndex = 0;
    let nextColorIndex = 1;
    let interpolationFactor = 0;
    const transitionSpeed = 0.001;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update blob sizes on resize
      blobs[0].radius = canvas.width * 0.3;
      blobs[1].radius = canvas.width * 0.2;
      blobs[2].radius = canvas.width * 0.4;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const lerp = (start: number, end: number, t: number) => {
      return start * (1 - t) + end * t;
    };

    // Animation variables for blobs
    let angle = 0;
    const angleSpeed = 0.0005;

    const animate = () => {
      const currentColor = colors[currentColorIndex];
      const nextColor = colors[nextColorIndex];

      const r = lerp(currentColor.r, nextColor.r, interpolationFactor);
      const g = lerp(currentColor.g, nextColor.g, interpolationFactor);
      const b = lerp(currentColor.b, nextColor.b, interpolationFactor);
      const a = lerp(currentColor.a, nextColor.a, interpolationFactor);

      // Create base gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
      gradient.addColorStop(1, `rgba(${r + 10}, ${g + 10}, ${b + 15}, ${a})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated blobs
      angle += angleSpeed;
      blobs.forEach((blob, index) => {
        // Animating the position of the blobs
        const offsetX = Math.sin(angle + index) * canvas.width * 0.05;
        const offsetY = Math.cos(angle * 1.3 + index) * canvas.height * 0.05;
        
        const xPos = blob.x * canvas.width + offsetX;
        const yPos = blob.y * canvas.height + offsetY;
        
        const grd = ctx.createRadialGradient(
          xPos, yPos, 0, 
          xPos, yPos, blob.radius
        );
        
        grd.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.color.a})`);
        grd.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`);
        
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(xPos, yPos, blob.radius, 0, Math.PI * 2);
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
      style={{ opacity: 0.8 }}
    />
  );
};

export default GradientBackground;
