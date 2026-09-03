import { useEffect, useRef, useState } from 'react';
import videoUrl from '/Pouring_coffee_into_cup_202608261706.mp4?url';

export default function CoffeeScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile viewport (width <= 768px)
    const checkMobile = () => {
      const mobileQuery = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(mobileQuery);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const video = videoRef.current;
    if (!video || isMobile) return () => window.removeEventListener('resize', checkMobile);

    let isMounted = true;
    let forward = true;
    let duration = 0;
    let intervalId: any;

    video.muted = true;
    video.playsInline = true;

    const onLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        duration = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.play().catch(() => {});

    // Desktop/Laptop: Smooth forward & reverse rewind loop
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
      {/* Show beautiful static fallback background on Mobile; Show Video on Laptop/Desktop */}
      {isMobile ? (
        <div
          className="w-full h-full bg-cover bg-center brightness-90 transform-gpu"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/50 to-espresso" />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover block transform-gpu translate-z-0"
        />
      )}
    </div>
  );
}
