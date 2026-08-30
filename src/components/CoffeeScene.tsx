import { useEffect, useRef, useState } from 'react';

interface ScrollVideoEngineProps {
  scrollProgress: number;
  videoSrc?: string;
}

export default function CoffeeScene({
  scrollProgress,
  videoSrc = './Pouring_coffee_into_cup_202608261706.mp4',
}: ScrollVideoEngineProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
        setIsVideoReady(true);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1 && video.duration) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoSrc]);

  // Sync video currentTime to scroll progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoReady || duration === 0) return;

    const targetTime = Math.min(Math.max(scrollProgress * duration, 0), duration - 0.01);
    
    // Smooth time update using requestAnimationFrame to prevent stutter
    let animationFrameId: number;
    const syncVideo = () => {
      if (Math.abs(video.currentTime - targetTime) > 0.02) {
        video.currentTime = targetTime;
      }
    };

    animationFrameId = requestAnimationFrame(syncVideo);
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollProgress, duration, isVideoReady]);

  return (
    <div className="relative w-full h-full bg-espresso overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover block"
      />
    </div>
  );
}
