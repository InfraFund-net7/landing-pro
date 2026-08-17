'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Play, X } from 'lucide-react';
import { CustomButton } from './ui/custom-button';

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full relative overflow-hidden pt-[26vh] sm:pt-[28vh] pb-8 gap-10 sm:gap-16">
      <div className="w-full flex justify-start items-center px-4 sm:px-6 md:px-[90px]">
        <h1 className="text-white font-bold leading-tight text-5xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
          Finance the <br /> Future of <br /> Energy
        </h1>
      </div>

      <div className="w-full flex flex-col justify-center items-end px-4 sm:px-6 md:px-[90px]">
        <div className="w-full max-w-[590px]  flex flex-col gap-6 sm:gap-7 ">
          <h2
            className="text-white text-sm sm:text-[15px] md:text-[17px]"
            style={{ hyphens: 'auto', textAlign: 'justify' }}
          >
            We are the operating system for tokenizing real-world green{' '}
            infrastructure, connecting global capital directly to the projects{' '}
            building our NetZero future.
          </h2>

          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 sm:gap-4 md:justify-end">
            <Link href="/Investors" className="w-full sm:w-auto">
              <CustomButton
                variant="filled"
                className="w-full sm:w-[176px] h-[44px] sm:h-[48px] !py-0 rounded-[4px] flex justify-center items-center text-base font-bold"
              >
                Start Investing
              </CustomButton>
            </Link>
            <Link href="/builders" className="w-full sm:w-auto">
              <button className="w-full sm:w-[176px] h-[44px] sm:h-[48px] sm:cursor-pointer flex justify-center items-center bg-white text-black rounded-[4px] font-bold">
                Fund a Project
              </button>
            </Link>
            <button
              onClick={() => setShowVideo(true)}
              className="w-full sm:w-[176px] h-[44px] sm:h-[48px] sm:cursor-pointer flex justify-center items-center text-white rounded-[4px] border border-white font-bold gap-2"
            >
              Watch Video <Play size={18} />
            </button>
          </div>
        </div>
      </div>

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
