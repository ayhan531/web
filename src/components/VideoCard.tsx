'use client';

import { useRef, useState } from 'react';

interface VideoCardProps {
  src: string;
  title: string;
  description: string;
}

export default function VideoCard({ src, title, description }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleVideoEnd = () => {
    // Video bitince başa dön ve tekrar oynat
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div className="group relative overflow-hidden rounded-xl bg-black shadow-lg transition-all hover:shadow-2xl">
      {/* Video */}
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          onEnded={handleVideoEnd}
          onPlay={handlePlay}
          onPause={handlePause}
          loop
          muted={isMuted}
          playsInline
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

        {/* Play/Pause Overlay - Center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={togglePlayPause}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-md transition-all hover:bg-white/40 hover:scale-110"
            aria-label={isPlaying ? 'Duraklat' : 'Oynat'}
          >
            {isPlaying ? (
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mute Button - Top Right */}
        <button
          onClick={toggleMute}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-md opacity-0 transition-all hover:bg-black/60 group-hover:opacity-100"
          aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
        >
          {isMuted ? (
            <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* Video Info - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h4 className="mb-0.5 text-sm font-bold drop-shadow-lg line-clamp-1">
            {title}
          </h4>
          <p className="text-xs opacity-90 drop-shadow-md line-clamp-2">
            {description}
          </p>
        </div>

        {/* Playing Indicator */}
        {isPlaying && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
            <span className="text-xs font-medium text-white">CANLI</span>
          </div>
        )}
      </div>
    </div>
  );
}
