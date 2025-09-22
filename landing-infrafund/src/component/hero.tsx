"use client";
import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full relative">
      <div className="w-full flex justify-start items-center px-[90px]">
        <h1 className="text-white text-7xl font-bold">
          Finance the <br /> Future of <br /> Energy
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-end px-[90px] gap-10">
        <h2 className="text-white text-lg">
          We are the operating system for tokenizing real-world green <br />
          infrastructure, connecting global capital directly to the projects
          <br />
          building our NetZero future.
        </h2>
        <div className="flex gap-6">
          <button className="px-6 py-3 bg-white text-black rounded-lg">
            StartInventing
          </button>
          <button className="px-6 py-3 bg-white text-black rounded-lg">
            FundProject
          </button>
          <button className="px-6 py-3 bg-white text-black rounded-lg">
            WatchVideo
          </button>
        </div>
      </div>
    </div>
  );
}
