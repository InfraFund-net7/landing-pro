import { partners } from "@/data/partners";
import Image from "next/image";
import React from "react";
import UsersCarousel from "./users-carousel";
import stars from "@/../public/image/stars.png";

export default function TrustedSection() {
  return (
    <div className="w-full h-fit flex flex-col justify-between items-center py-12 gap-20 md:gap-32 mb-20 relative overflow-hidden">
      <h2 className="text-[28px] sm:text-[36px] md:text-[42px] text-white font-bold text-center px-4">
        Trusted by Leaders in Innovation
      </h2>

      <div className="w-[400px] sm:w-[600px] md:w-[1000px] h-[300px] sm:h-[400px] md:h-[600px] absolute z-0 left-1/2 -translate-x-1/2 top-[100px]">
        <div
          className="w-full h-full rounded-full absolute z-10"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
            filter: "blur(200px)",
          }}
        />
        <Image
          src={stars}
          width={400}
          height={400}
          alt="stars"
          className="absolute z-20 left-1/2 -translate-x-1/2 top-0 w-[250px] sm:w-[400px]"
        />
      </div>

      <div className="w-full flex flex-col items-center px-4 sm:px-6 md:px-[90px] relative z-30">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-center items-center w-full max-w-7xl">
          {partners.slice(0, -4).map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={partner.logo}
                alt={partner.alt}
                className="w-[80px] sm:w-[100px] lg:w-[140px] object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-12">
          {partners.slice(-4).map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={partner.logo}
                alt={partner.alt}
                className="w-[80px] sm:w-[100px] lg:w-[140px] lg:h-[140px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <UsersCarousel />
    </div>
  );
}
