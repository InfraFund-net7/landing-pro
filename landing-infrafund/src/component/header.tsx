"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfraFund from "@/../public/svg/infrafund.svg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Navigation = [
    { name: "Projects", route: "" },
    { name: "Investors", route: "" },
    { name: "Builders", route: "" },
    { name: "Learn", route: "" },
    { name: "About Us", route: "" },
  ];

  return (
    <header className="w-full h-fit px-[90px] flex flex-col gap-4 text-sm font-medium fixed top-0 left-0 z-50">
      <div className="w-full h-11 bg-[#00000080] rounded-b-lg text-white flex justify-center items-center gap-1.5">
        InfraFund&apos;s $INF token is launching soon. Join the
        <span className="text-[#24FF8E]">Waitlist</span>
        <ChevronRight size={20} />
      </div>

      <div
        className={`w-full h-fit flex justify-between items-center py-2 transition-all duration-500 ${
          scrolled ? "backdrop-blur-md bg-black/40 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="gap-8 w-fit h-fit flex justify-center items-center">
          <Image src={InfraFund} alt="InfraFund" />
          <div className="flex justify-center items-center gap-4">
            {Navigation.map((item, index) => (
              <span
                className="text-white hover:transition-colors hover:text-[#24FF8E]"
                key={index}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 h-12">
          <button className="w-[110px] h-full bg-white flex justify-center items-center text-black rounded-md">
            Login
          </button>
          <button className="w-[184px] h-full bg-[#24FF8E] flex justify-center items-center text-black rounded-md">
            Create Account
          </button>
        </div>
      </div>
    </header>
  );
}
