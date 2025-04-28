
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

    let currentColorIndex = 0;
    let nextColorIndex = 1;
    let interpolationFactor = 0;
    const transitionSpeed = 0.001;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const lerp = (start: number, end: number, t: number) => {
      return start * (1 - t) + end * t;
    };

    const animate = () => {
      const currentColor = colors[currentColorIndex];
      const nextColor = colors[nextColorIndex];

      const r = lerp(currentColor.r, nextColor.r, interpolationFactor);
      const g = lerp(currentColor.g, nextColor.g, interpolationFactor);
      const b = lerp(currentColor.b, nextColor.b, interpolationFactor);
      const a = lerp(currentColor.a, nextColor.a, interpolationFactor);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
      gradient.addColorStop(1, `rgba(${r + 10}, ${g + 10}, ${b + 15}, ${a})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      style={{ opacity: 0.6 }}
    />
  );
};

export default GradientBackground;
