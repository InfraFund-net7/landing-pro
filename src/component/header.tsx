"use client";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfraFund from "@/../public/svg/infrafund.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Navigation = [
    { name: "Projects", route: "/project" },
    { name: "Investors", route: "/Investors" },
    { name: "Builders", route: "" },
    { name: "Learn", route: "" },
    { name: "About Us", route: "" },
  ];

  return (
    <header
      className={`w-full h-fit px-[90px] flex flex-col gap-4 text-sm font-medium fixed top-0 left-0 z-50 
    ${scrolled
          ? "backdrop-blur-md bg-black/40 shadow-md"
          : "bg-transparent"
        } transition-all duration-500 ease-in-out`}
    >

      {showBanner && (
        <div className="relative w-full h-11 bg-[#00000080] rounded-b-lg text-white flex justify-center items-center gap-1.5">
          InfraFund&apos;s $INF token is launching soon. Join the
          <span className="text-[#24FF8E]">Waitlist</span>
          <ChevronRight size={20} />
          {scrolled && (
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#24FF8E]"
            >
              <X size={20} />
            </button>
          )}
        </div>
      )}
      <div className="w-full h-fit flex justify-between items-center py-2 transition-all duration-500">
        <div className="gap-8 w-fit h-fit flex justify-center items-center">
          <Image
            src={InfraFund}
            alt="InfraFund"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="flex justify-center items-center gap-4">
            {Navigation.map((item, index) => (
              <Link
                href={item.route}
                className="text-white hover:transition-colors hover:text-[#24FF8E]"
                key={index}
              >
                {item.name}
              </Link>
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
