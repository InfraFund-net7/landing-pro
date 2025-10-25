import React from "react";
import { CustomButton } from "./ui/custom-button";
import FadeInStagger from "./animations/FadeInStagger";

export default function ContactUs() {
  return (
    <FadeInStagger>
      <div className="w-full h-fit flex flex-col justify-center items-center text-white gap-12 mb-20 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight">
          Let&apos;s Build the Green Future Together
        </h2>

        <span className="text-base sm:text-lg md:text-2xl font-normal text-center text-gray-300 leading-relaxed max-w-3xl">
          Whether you&apos;re an investor ready to make an impact or a builder
          with a vision, we&apos;re <br className="hidden md:block" />
          here to help. Reach out to our team to get started.
        </span>
        <CustomButton variant="filled" className="w-[140px] sm:w-[151px] h-[45px] sm:h-[48px] flex justify-center items-center   text-black text-sm sm:text-base font-bold 
          rounded-md hover:scale-105 transition-all duration-300">
          Contact Us
        </CustomButton>
      </div>
    </FadeInStagger>
  );
}
