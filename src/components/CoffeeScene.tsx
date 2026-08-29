import { useEffect, useRef, useState, useMemo } from 'react';

interface FrameSequenceEngineProps {
  scrollProgress: number;
  totalFrames?: number;
  frameFolderUrl?: string;
  framePrefix?: string;
  frameExtension?: string;
}

export default function CoffeeScene({
  scrollProgress,
  totalFrames = 75,
  frameFolderUrl = './frames',
  framePrefix = 'frame_',
  frameExtension = '.png',
}: FrameSequenceEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate exact image URLs for the 75 frames (frame_001.png to frame_075.png)
  const frameUrls = useMemo(() => {
    const urls: string[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const numStr = String(i).padStart(3, '0');
      urls.push(`${frameFolderUrl}/${framePrefix}${numStr}${frameExtension}`);
    }
    return urls;
  }, [totalFrames, frameFolderUrl, framePrefix, frameExtension]);

  // Preload frames in parallel
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    frameUrls.forEach((url, idx) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (!isMounted) return;
        count++;
        if (count === frameUrls.length) {
          setIsLoaded(true);
        }
        if (canvasRef.current) {
          drawFrame(scrollProgress);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        count++;
        if (count === frameUrls.length) {
          setIsLoaded(true);
        }
      };
      loadedImages[idx] = img;
    });

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, [frameUrls]);

  // Draw current frame image onto HTML5 Canvas
  const drawFrame = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameIndex = Math.min(
      Math.floor(progress * (imagesRef.current.length - 1)),
      imagesRef.current.length - 1
    );

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Retina & high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth * dpr;
    const height = canvas.clientHeight * dpr;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    // Object-fit: cover scaling calculation
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    let animationFrameId: number;
    const render = () => {
      drawFrame(scrollProgress);
    };
    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollProgress, isLoaded]);

  return (
    <div className="relative w-full h-full bg-espresso">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
