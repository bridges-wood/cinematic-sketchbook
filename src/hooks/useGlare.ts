import { RefObject, useState } from 'react';

export const useGlare = (containerRef: RefObject<HTMLDivElement | null>) => {
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: '50%', y: '50%', opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    );

    // Update glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlare({
      x: `${glareX}%`,
      y: `${glareY}%`,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    setGlare({ x: '50%', y: '50%', opacity: 0 });
  };

  return {
    transform,
    glare,
    handleMouseMove,
    handleMouseLeave,
  };
};
