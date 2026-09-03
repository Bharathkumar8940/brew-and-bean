import { useEffect, useRef } from 'react';
import videoUrl from '/Pouring_coffee_into_cup_202608261706.mp4?url';

export default function CoffeeScene() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if device is mobile/tablet using window width or touch points
    const isMobileDevice = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    // On mobile devices, do not run reverse seeking intervals
    if (isMobileDevice) {
      return;
    }

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

    // Laptop / Desktop: Smooth forward & reverse rewind loop
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
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-espresso overflow-hidden">
      {/* 
        Tailwind CSS Responsive Display:
        - hidden md:block: Video element ONLY renders on Desktop / Laptop screens (md breakpoint and up >=768px).
        - block md:hidden: High-resolution static image renders ONLY on Mobile screens (<768px).
      */}
      
      {/* Mobile-Only Static Image Background */}
      <div className="block md:hidden w-full h-full relative">
        <img
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80"
          alt="Artisanal Coffee"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/40 to-espresso" />
      </div>

      {/* Laptop & Desktop-Only Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="hidden md:block w-full h-full object-cover transform-gpu translate-z-0"
      />
    </div>
  );
}
