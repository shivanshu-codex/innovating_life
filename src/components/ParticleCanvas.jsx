import { useEffect, useRef } from 'react';
import { LuminaParticles } from '../js/animations/particles';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new LuminaParticles(canvasRef.current);
    return () => instance.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
