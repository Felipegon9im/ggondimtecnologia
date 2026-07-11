import { useEffect, useRef } from 'react';

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameIndexRef = useRef<number>(0);
  const totalFrames = 766; // 00000 to 00765

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to screen size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Keep an image object cache to avoid recreating them
    const imagesCache: HTMLImageElement[] = [];
    const maxCache = 120; // Cache next 120 frames dynamically

    const preloadNextFrames = (startIndex: number) => {
      for (let i = 0; i < maxCache; i++) {
        const index = (startIndex + i) % totalFrames;
        if (!imagesCache[index]) {
          const img = new Image();
          const pad = String(index).padStart(5, '0');
          img.src = `/frames/PinGrab_1783740406596/PinGrab_1783740406596_${pad}.png`;
          imagesCache[index] = img;
        }
      }
    };

    let animationId: number;
    let lastTime = 0;
    const fps = 24; // Play at 24fps
    const interval = 1000 / fps;

    const render = (time: number) => {
      animationId = requestAnimationFrame(render);

      if (time - lastTime < interval) return;
      lastTime = time;

      const currentIndex = frameIndexRef.current;
      preloadNextFrames(currentIndex);

      const img = imagesCache[currentIndex];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image covering the entire canvas (like background-size: cover)
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      frameIndexRef.current = (currentIndex + 1) % totalFrames;
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        opacity: 0.16, // Subtle texture transparency
      }}
    />
  );
}
