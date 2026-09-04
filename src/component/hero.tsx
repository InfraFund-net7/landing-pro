'use client';
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full relative overflow-hidden pt-[24vh] sm:pt-[26vh] pb-8 px-4 sm:px-6 md:px-[90px] gap-6 sm:gap-8">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[320px] rounded-full bg-black/45 blur-3xl"
      />

      <h1 className="relative text-white text-center font-bold leading-tight text-5xl sm:text-6xl md:text-7xl tracking-tight">
        Powering the Future...
      </h1>

      <h2 className="relative text-white text-center text-sm sm:text-base md:text-lg max-w-2xl">
        We are the operating system for tokenizing real-world green
        infrastructure, connecting global capital directly to the projects
        building our NetZero future.
      </h2>

      <button
        onClick={() => setShowVideo(true)}
        className="relative w-full sm:w-[176px] h-[44px] sm:h-[48px] sm:cursor-pointer flex justify-center items-center text-white rounded-[13px] border border-white font-bold gap-2"
      >
        Watch Video <Play size={18} />
      </button>

      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="relative w-[90%] max-w-[800px] aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/TQkxcTuK2Dg?autoplay=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
