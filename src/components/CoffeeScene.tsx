import { useEffect, useRef } from 'react';
import videoUrl from '/Pouring_coffee_into_cup_202608261706.mp4?url';

export default function CoffeeScene() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;
    let forward = true;
    let duration = 0;
    let intervalId: any;

    const onLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        duration = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);

    // Explicitly call play to start buffering/decoding
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});

    // High frequency interval (every 30ms ~ 33 FPS) to update currentTime for smooth forward & rewind
    intervalId = setInterval(() => {
      if (!isMounted || !video) return;

      if (!duration && video.duration && !isNaN(video.duration)) {
        duration = video.duration;
      }

      if (duration > 0) {
        // Step size (0.04s per 30ms step)
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
          // Reverse rewind step
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
    }, 30);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-espresso overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover block"
      />
    </div>
  );
}
