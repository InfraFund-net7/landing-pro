"use client";
import React from "react";
import { CustomButton } from "./ui/custom-button";
import { Play } from "lucide-react";
import FadeInStagger from "./animations/FadeInStagger";

export default function Hero() {
  return (
    <FadeInStagger className="flex flex-col justify-center items-center w-full h-full relative overflow-hidden">
      <div className="w-full flex justify-start items-center px-4 sm:px-6 md:px-[90px] absolute top-[18%] sm:top-[20%]">
        <h1 className="text-white font-bold leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
          Finance the <br /> Future of <br /> Energy
        </h1>
      </div>

      <div className="w-full flex flex-col justify-center items-end px-4 sm:px-6 md:px-[90px] absolute bottom-6 sm:bottom-10">
        <div className="w-full max-w-[592px] flex flex-col gap-6 sm:gap-8 md:gap-10">
          <h2 className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
            We are the operating system for tokenizing real-world green{" "}
            <br className="hidden sm:block" />
            infrastructure, connecting global capital directly to the projects{" "}
            <br className="hidden sm:block" />
            building our NetZero future.
          </h2>

          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 sm:gap-4 md:gap-6">
            <CustomButton
              variant="filled"
              className="w-full sm:w-[176px] h-[44px] sm:h-[48px] rounded-[4px] flex justify-center items-center text-sm font-bold"
            >
              Start Inventing
            </CustomButton>

            <button className="w-full sm:w-[176px] h-[44px] sm:h-[48px] bg-white flex justify-center items-center text-black rounded-[4px] border border-white font-bold">
              Fund Project
            </button>

            <button className="w-full sm:w-[176px] h-[44px] sm:h-[48px] flex justify-center items-center text-white rounded-[4px] border border-white font-bold gap-2">
              Watch Video <Play size={18} />
            </button>
          </div>
        </div>
      </div>
    </FadeInStagger>
  );
}
