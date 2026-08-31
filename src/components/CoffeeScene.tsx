import { useEffect, useRef, useState } from 'react';
import videoUrl from '/Pouring_coffee_into_cup_202608261706.mp4?url';

export default function CoffeeScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile / low power devices
    const checkMobile = () => {
      const mobileQuery = window.matchMedia('(max-width: 768px)').matches;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(mobileQuery || isTouch);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const video = videoRef.current;
    if (!video) return () => window.removeEventListener('resize', checkMobile);

    let isMounted = true;
    let forward = true;
    let duration = 0;
    let intervalId: any;

    video.muted = true;
    video.playsInline = true;
    
    // On mobile devices, use native GPU video decoding & looping to avoid CPU seeking lag
    if (isMobile) {
      video.loop = true;
      video.play().catch(() => {});
      return () => window.removeEventListener('resize', checkMobile);
    }

    const onLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        duration = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.play().catch(() => {});

    // Desktop: High-performance smooth rewind cycle
    intervalId = setInterval(() => {
      if (!isMounted || !video) return;

      if (!duration && video.duration && !isNaN(video.duration)) {
        duration = video.duration;
      }

      if (duration > 0) {
        const step = 0.04;

        if (forward) {
          if (video.paused) {
            video.play().catch(() => {});
          }
          if (video.currentTime >= duration - 0.1) {
            forward = false;
            video.pause();
          }
        } else {
          const nextTime = video.currentTime - step;
          if (nextTime <= 0.05) {
            video.currentTime = 0;
            forward = true;
            video.play().catch(() => {});
          } else {
            video.currentTime = nextTime;
          }
        }
      }
    }, 35);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div className="relative w-full h-full bg-espresso overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover block transform-gpu translate-z-0"
      />
    </div>
  );
}
