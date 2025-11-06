'use client';

import { useState, useEffect, useRef } from 'react';

interface Video {
  src: string;
  title: string;
  description: string;
}

const videos: Video[] = [
  {
    src: '/video1.mp4',
    title: '2025 Yılında Türkiye Ekonomisi',
    description: 'Türkiye ekonomisi ve piyasalar hakkında güncel analizler',
  },
  {
    src: '/video2.mp4',
    title: 'Teknik Analiz Kavramları',
    description: 'Yatırımda başarı için teknik analiz temellerini öğrenin',
  },
  {
    src: '/video3.mp4',
    title: 'Yeni Yatırımcılar İçin Rehber',
    description: 'Yatırıma başlayanlar için pratik ipuçları ve stratejiler',
  },
];

export default function VideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video bittiğinde sonraki videoya geç
  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  // Manuel video değiştirme
  const goToVideo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  // Sonraki video
  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  // Önceki video
  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Play/Pause toggle
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

  // Mute/Unmute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Video değiştiğinde otomatik oynat
  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch((err) => {
        console.log('Autoplay prevented:', err);
        setIsPlaying(false);
      });
    }
  }, [currentIndex, isPlaying]);

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl">
      {/* Video Container */}
      <div className="relative aspect-video w-full">
        {/* Video Element */}
        <video
          ref={videoRef}
          key={currentIndex}
          src={videos[currentIndex].src}
          className="h-full w-full object-cover"
          onEnded={handleVideoEnd}
          autoPlay
          muted={isMuted}
          playsInline
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Video Info - Bottom Left */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="animate-fade-in">
            <h3 className="mb-1 text-lg font-bold drop-shadow-lg">
              {videos[currentIndex].title}
            </h3>
            <p className="text-xs opacity-90 drop-shadow-md">
              {videos[currentIndex].description}
            </p>
          </div>
        </div>

        {/* Controls - Center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
          <div className="flex items-center gap-4">
            {/* Previous Button */}
            <button
              onClick={prevVideo}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all hover:bg-white/30 hover:scale-110"
              aria-label="Önceki Video"
            >
              <svg
                className="h-5 w-5 text-white transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-md transition-all hover:bg-white/40 hover:scale-110"
              aria-label={isPlaying ? 'Duraklat' : 'Oynat'}
            >
              {isPlaying ? (
                <svg
                  className="h-7 w-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7 text-white translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={nextVideo}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all hover:bg-white/30 hover:scale-110"
              aria-label="Sonraki Video"
            >
              <svg
                className="h-5 w-5 text-white transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mute Button - Top Right */}
        <button
          onClick={toggleMute}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-all hover:bg-black/60"
          aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
        >
          {isMuted ? (
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>

        {/* Video Counter - Top Left */}
        <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-md">
          {currentIndex + 1} / {videos.length}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex items-center justify-center gap-2 bg-gradient-to-b from-black/50 to-black/70 py-3">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToVideo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Video ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / videos.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
