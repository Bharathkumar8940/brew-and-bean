import { useEffect, useRef } from 'react';

interface AutoPlayVideoProps {
  scrollProgress?: number;
  videoSrc?: string;
}

export default function CoffeeScene({
  videoSrc = './Pouring_coffee_into_cup_202608261706.mp4',
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays continuously on loop
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Autoplay prevented by browser:', err);
      }
    };

    playVideo();
  }, [videoSrc]);

  return (
    <div className="relative w-full h-full bg-espresso overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover block"
      />
    </div>
  );
}
