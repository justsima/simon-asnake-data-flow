
import useCanvas from '@/hooks/useCanvas';
import useFlowingDots from '@/hooks/useFlowingDots';

const FlowingDotsBackground = () => {
  const { setupAnimation } = useFlowingDots();
  const canvasRef = useCanvas({
    onSetup: setupAnimation
  });

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default FlowingDotsBackground;
