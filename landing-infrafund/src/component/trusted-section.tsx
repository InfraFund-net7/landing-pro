import { partners } from "@/data/partners";
import Image from "next/image";
import React from "react";
import UsersCarousel from "./users-carousel";

export default function TrustedSection() {
  return (
    <div className="w-full h-fit flex flex-col justify-between items-center py-12 gap-32 mb-20">
      <h2 className="text-[42px] text-white font-bold">
        Trusted by Leaders in Innovation
      </h2>
      <div className="grid grid-cols-6 gap-10 justify-center items-center w-full h-fit px-[90px]">
        {partners.map((partner) => (
          <div key={partner.name} className="flex items-center justify-center">
            <Image src={partner.logo} alt={partner.alt} />
          </div>
        ))}
      </div>
      <UsersCarousel/>
    </div>
  );
}
