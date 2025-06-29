import { useEffect, useState } from "react";
import "./ReactStyles/TikTokCarousel.css";
type VideoType = {videoId: string, duration?:number}
export default function TikTokCarousel({ videos, height = 30, width = 15 }:{videos:VideoType[], height?:number, width?:number}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animating, setAnimating] = useState(false);
  console.log(videos)

  useEffect(() => {
    const duration = videos[currentIndex].duration ?? 15;

    const timeout = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setAnimating(false);
      }, 600); // tiempo de animación
    }, duration * 1000);

    return () => clearTimeout(timeout);
  }, [currentIndex, videos]);

  const tiktokOptions = [
    "play_button=0",
    "progress_bar=0",
    "fullscreen_button=0",
    "timestamp=0",
    "loop=1",
    "autoplay=1",
    "music_info=0",
    "description=0",
    "rel=0",
    "native_context_menu=0",
    "closed_caption=0",
  ].join("&");

  const currentVideo = videos[currentIndex];
  const nextVideo = videos[(currentIndex + 1) % videos.length];

  return (
    <div className="carousel-container" style={{ height: `${height}rem`, width: `${width}rem` }}>
      <div className={`slide current ${animating ? "slide-out" : ""}`}>
        <iframe
          key={currentVideo.videoId}
          src={`https://www.tiktok.com/player/v1/${currentVideo.videoId}?${tiktokOptions}`}
        />
      </div>

      {animating && (
        <div className="slide next slide-in">
          <iframe
            key={nextVideo.videoId}
            src={`https://www.tiktok.com/player/v1/${nextVideo.videoId}?${tiktokOptions}`}
            allow="autoplay"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}



