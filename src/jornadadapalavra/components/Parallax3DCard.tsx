import React, { useState, useRef, useEffect } from 'react';

interface Parallax3DCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTiltDeg?: number;
  scaleOnHover?: number;
}

export const Parallax3DCard: React.FC<Parallax3DCardProps> = ({
  children,
  className = '',
  style = {},
  maxTiltDeg = 12,
  scaleOnHover = 1.02
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number; s: number }>({ rx: 0, ry: 0, s: 1 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Calculate 3D tilt angles
    const rx = -mouseY * maxTiltDeg; // Rotate X around horizontal axis
    const ry = mouseX * maxTiltDeg;  // Rotate Y around vertical axis

    setTilt({ rx, ry, s: scaleOnHover });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, s: 1 });
  };

  // Gyroscope tilt support for mobile touch devices
  useEffect(() => {
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      // Clamp gamma (-30 to 30) and beta (-30 to 30)
      const ry = Math.min(Math.max((e.gamma / 30) * maxTiltDeg, -maxTiltDeg), maxTiltDeg);
      const rx = Math.min(Math.max((-e.beta / 30) * maxTiltDeg, -maxTiltDeg), maxTiltDeg);
      setTilt({ rx, ry, s: 1 });
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
  }, [maxTiltDeg]);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: `perspective(1000px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) scale3d(${tilt.s}, ${tilt.s}, 1)`,
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </div>
  );
};
