import { useEffect, useRef } from 'react';
import coffeeVideoUrl from '/Pouring_coffee_into_cup_202608261706.mp4?url';

interface AutoPlayVideoProps {
  videoSrc?: string;
}

export default function CoffeeScene({
  videoSrc,
}: AutoPlayVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const srcToUse = videoSrc || coffeeVideoUrl;

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;
    let animId: number;
    let forward = true;
    let duration = 0;
    let currentTime = 0;

    // Preload video into memory
    video.src = srcToUse;
    video.muted = true;
    video.playsInline = true;

    const onLoaded = () => {
      if (video.duration && !isNaN(video.duration)) {
        duration = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', onLoaded);

    // Smooth Ping-Pong Animation Loop (Forward -> Reverse Rewind -> Forward)
    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      if (!isMounted) return;

      const delta = (now - lastTimestamp) / 1000; // time in seconds
      lastTimestamp = now;

      // Update virtual playback head at 1.0x natural speed
      if (duration > 0) {
        if (forward) {
          currentTime += delta;
          if (currentTime >= duration) {
            currentTime = duration;
            forward = false; // Trigger smooth rewind
          }
        } else {
          currentTime -= delta; // Smooth reverse rewind
          if (currentTime <= 0) {
            currentTime = 0;
            forward = true; // Trigger forward play
          }
        }

        // Seek video frame
        if (Math.abs(video.currentTime - currentTime) > 0.03) {
          video.currentTime = currentTime;
        }
      }

      // Draw current video frame to HTML Canvas with high performance object-fit: cover
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const videoWidth = video.videoWidth || 1280;
      const videoHeight = video.videoHeight || 720;
      const videoRatio = videoWidth / videoHeight;
      const canvasRatio = width / height;

      let drawW = width;
      let drawH = height;
      let offX = 0;
      let offY = 0;

      if (canvasRatio > videoRatio) {
        drawH = width / videoRatio;
        offY = (height - drawH) / 2;
      } else {
        drawW = height * videoRatio;
        offX = (width - drawW) / 2;
      }

      try {
        ctx.drawImage(video, offX, offY, drawW, drawH);
      } catch (e) {
        // Video seeking frame loading
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      video.removeEventListener('loadedmetadata', onLoaded);
    };
  }, [srcToUse]);

  return (
    <div className="relative w-full h-full bg-espresso overflow-hidden">
      {/* Hidden HTML5 Video element for frame decoding */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="hidden"
      />
      {/* High performance Canvas renderer */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
