import { useEffect, useRef, useMemo } from 'react';

interface FrameSequenceEngineProps {
  scrollProgress: number;
  totalFrames?: number;
  frameFolderUrl?: string;
}

export default function CoffeeScene({
  scrollProgress,
  totalFrames = 60,
}: FrameSequenceEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);

  // Generate SVG Frame Data URIs dynamically so frame sequence works out-of-the-box
  const generatedFrames = useMemo(() => {
    const frames: string[] = [];
    const width = 1200;
    const height = 800;

    for (let i = 0; i < totalFrames; i++) {
      const progress = i / (totalFrames - 1);
      
      const cupY = 520;
      const cupX = 600;
      const streamYEnd = Math.min(progress * 2 * 500, 500);
      const isPouring = progress >= 0.15 && progress <= 0.85;
      const liquidFillHeight = Math.max(0, Math.min((progress - 0.2) * 1.3, 1)) * 120;
      const steamOpacity = Math.max(0, (progress - 0.6) * 2.2);

      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <defs>
            <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#3D1E0B" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#1A0B05" stop-opacity="1" />
            </radialGradient>

            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#653B1A" />
              <stop offset="50%" stop-color="#C67C38" />
              <stop offset="100%" stop-color="#46240E" />
            </linearGradient>

            <linearGradient id="tableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3B1E0B" />
              <stop offset="100%" stop-color="#150803" />
            </linearGradient>

            <linearGradient id="cremaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#D5B79A" />
              <stop offset="50%" stop-color="#C67C38" />
              <stop offset="100%" stop-color="#653B1A" />
            </linearGradient>
          </defs>

          <!-- Dark Espresso Background -->
          <rect width="100%" height="100%" fill="url(#bgGlow)" />

          <!-- Wooden Table Base -->
          <ellipse cx="600" cy="620" rx="460" ry="140" fill="url(#tableGrad)" stroke="#653B1A" stroke-width="3" />
          <ellipse cx="600" cy="620" rx="450" ry="130" fill="none" stroke="#C67C38" stroke-opacity="0.15" stroke-width="2" />

          <!-- Steam Particles (Phase 3: 60%-100%) -->
          ${
            steamOpacity > 0
              ? `
            <g opacity="${steamOpacity * 0.7}">
              <path d="M 540 ${cupY - 120} Q 520 ${cupY - 220} 560 ${cupY - 320}" fill="none" stroke="#F7EFE5" stroke-width="12" stroke-linecap="round" opacity="0.25" />
              <path d="M 600 ${cupY - 130} Q 630 ${cupY - 240} 590 ${cupY - 350}" fill="none" stroke="#FFE8D6" stroke-width="16" stroke-linecap="round" opacity="0.3" />
              <path d="M 660 ${cupY - 110} Q 680 ${cupY - 210} 640 ${cupY - 300}" fill="none" stroke="#F7EFE5" stroke-width="10" stroke-linecap="round" opacity="0.2" />
            </g>
          `
              : ''
          }

          <!-- Pouring Coffee Stream (Phase 1 & 2) -->
          ${
            isPouring
              ? `
            <path d="M 600 0 L 600 ${streamYEnd}" fill="none" stroke="url(#streamGrad)" stroke-width="${14 + Math.sin(progress * 20) * 3}" stroke-linecap="round" />
            <path d="M 598 0 L 598 ${streamYEnd}" fill="none" stroke="#FFE8D6" stroke-width="3" opacity="0.6" />
          `
              : ''
          }

          <!-- Splash Droplets at Surface Hit (Phase 2: 45%-75%) -->
          ${
            progress > 0.4 && progress < 0.8
              ? `
            <circle cx="560" cy="${cupY - liquidFillHeight - 15}" r="6" fill="#C67C38" opacity="0.8" />
            <circle cx="645" cy="${cupY - liquidFillHeight - 20}" r="8" fill="#653B1A" opacity="0.9" />
            <circle cx="580" cy="${cupY - liquidFillHeight - 25}" r="5" fill="#FFE8D6" opacity="0.8" />
            <circle cx="625" cy="${cupY - liquidFillHeight - 30}" r="4" fill="#C67C38" opacity="0.7" />
          `
              : ''
          }

          <!-- Ceramic Cup Back Rim -->
          <ellipse cx="${cupX}" cy="${cupY - 80}" rx="140" ry="40" fill="#2C1305" stroke="#E6D3C1" stroke-width="8" />

          <!-- Rising Liquid Layer Inside Cup -->
          ${
            liquidFillHeight > 0
              ? `
            <path d="M ${cupX - 130} ${cupY - 75} Q ${cupX} ${cupY - 30} ${cupX + 130} ${cupY - 75} L ${cupX + 130 - (liquidFillHeight * 0.1)} ${cupY - 75 - liquidFillHeight} Q ${cupX} ${cupY - 35 - liquidFillHeight} ${cupX - 130 + (liquidFillHeight * 0.1)} ${cupY - 75 - liquidFillHeight} Z" fill="#3D1E0B" />
            <ellipse cx="${cupX}" cy="${cupY - 75 - liquidFillHeight}" rx="${132 - liquidFillHeight * 0.05}" ry="35" fill="url(#cremaGrad)" stroke="#FFE8D6" stroke-opacity="0.5" stroke-width="3" />
          `
              : ''
          }

          <!-- Outer Speckled Ceramic Cup Body -->
          <path d="M ${cupX - 140} ${cupY - 80} C ${cupX - 150} ${cupY + 60}, ${cupX - 90} ${cupY + 120}, ${cupX} ${cupY + 120} C ${cupX + 90} ${cupY + 120}, ${cupX + 150} ${cupY + 60}, ${cupX + 140} ${cupY - 80} Z" fill="#F7EFE5" stroke="#D5B79A" stroke-width="6" />

          <!-- Cup Base Shadow -->
          <ellipse cx="${cupX}" cy="${cupY + 120}" rx="95" ry="25" fill="#1A0902" opacity="0.8" />

          <!-- Cup Handle -->
          <path d="M ${cupX + 135} ${cupY - 40} C ${cupX + 220} ${cupY - 30}, ${cupX + 210} ${cupY + 70}, ${cupX + 115} ${cupY + 80}" fill="none" stroke="#F7EFE5" stroke-width="22" stroke-linecap="round" />
          <path d="M ${cupX + 135} ${cupY - 40} C ${cupX + 220} ${cupY - 30}, ${cupX + 210} ${cupY + 70}, ${cupX + 115} ${cupY + 80}" fill="none" stroke="#D5B79A" stroke-width="6" stroke-linecap="round" />

          <!-- Decorative Cup Texture Dots -->
          <circle cx="${cupX - 40}" cy="${cupY + 10}" r="3" fill="#46240E" opacity="0.3" />
          <circle cx="${cupX + 50}" cy="${cupY + 30}" r="2" fill="#46240E" opacity="0.4" />
          <circle cx="${cupX - 20}" cy="${cupY + 60}" r="4" fill="#46240E" opacity="0.25" />
          <circle cx="${cupX + 30}" cy="${cupY - 10}" r="3" fill="#46240E" opacity="0.3" />
        </svg>
      `;

      frames.push(`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`);
    }

    return frames;
  }, [totalFrames]);

  // Preload frame images
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    loadedCountRef.current = 0;

    generatedFrames.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        loadedCountRef.current++;
        if (canvasRef.current) {
          drawFrame(scrollProgress);
        }
      };
      images[idx] = img;
    });

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, [generatedFrames]);

  // Draw current frame onto HTML Canvas
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
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth * dpr;
    const height = canvas.clientHeight * dpr;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.width / img.height;
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
  }, [scrollProgress]);

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
