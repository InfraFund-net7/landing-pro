import { partners } from "@/data/partners";
import Image from "next/image";
import React from "react";
import UsersCarousel from "./users-carousel";
import stars from "@/../public/image/stars.png";

export default function TrustedSection() {
  return (
    <div className="w-full h-fit flex flex-col justify-between items-center py-12 gap-32 mb-20 relative ">
      <h2 className="text-[42px] text-white font-bold">
        Trusted by Leaders in Innovation
      </h2>
      <div className="w-[1000px] h-[600px] absolute z-0 left-[20%] right-0 ">
        <div className="w-[1000px] h-[588px] rounded-full absolute z-10" style={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
          filter: "blur(400px)",
        }} />
        <Image src={stars} width={588} height={588} alt="stars" className="absolute z-20" />
      </div>
      <div className="grid grid-cols-6 gap-10 justify-center items-center w-full h-fit px-[90px]">
        {partners.slice(0, -2).map((partner, index) => (
          <div key={`${partner.name}-${index}`} className="flex items-center justify-center">
            <Image src={partner.logo} alt={partner.alt} />
          </div>
        ))}
        <div className="col-span-6 flex justify-center gap-10">
          {partners.slice(-2).map((partner, index) => (
            <div key={`${partner.name}-bottom-${index}`} className="flex items-center justify-center">
              <Image src={partner.logo} alt={partner.alt} />
            </div>
          ))}
        </div>
      </div>
      <UsersCarousel />
    </div>
  );
}
