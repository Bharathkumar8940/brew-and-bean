import { useEffect, useRef } from 'react';

interface AutoPlayVideoProps {
  videoSrc?: string;
}

export default function CoffeeScene({
  videoSrc = './Pouring_coffee_into_cup_202608261706.mp4',
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isRewindingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = false; // Disable standard loop to handle reverse rewind manually

    let animationFrameId: number;

    const handleEnded = () => {
      isRewindingRef.current = true;
    };

    const updateFrame = () => {
      if (isRewindingRef.current && video) {
        // Rewind speed step (0.04 seconds per frame ~ 25 FPS reverse speed)
        const nextTime = video.currentTime - 0.04;
        
        if (nextTime <= 0.05) {
          video.currentTime = 0;
          isRewindingRef.current = false;
          video.play().catch(() => {});
        } else {
          video.currentTime = nextTime;
        }
      }

      animationFrameId = requestAnimationFrame(updateFrame);
    };

    video.addEventListener('ended', handleEnded);

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Autoplay prevented:', err);
      }
    };

    playVideo();
    animationFrameId = requestAnimationFrame(updateFrame);

    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationFrameId);
    };
  }, [videoSrc]);

  return (
    <div className="relative w-full h-full bg-espresso overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover block"
      />
    </div>
  );
}
