"use client";
import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import Hero from "./hero";
import PartnersSection from "./partner";

export default function HeaderHeroWrapper({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hasWatched = localStorage.getItem("heroVideoWatched");

    if (!hasWatched) {
      video.play();
      video.onended = () => {
        video.pause();
        localStorage.setItem("heroVideoWatched", "true");
      };
    } else {
      video.currentTime = video.duration;
      video.pause();
    }
  }, []);

  if (pathname !== "/") {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return (
    <>
      <div className="relative w-full h-[1024px] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          muted
          playsInline
        >
          <source src="/video/infra-hero.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col w-full h-full">
          <Header />
          <Hero />
          <div
            className="border-t border-white w-full h-[136px]"
            style={{ backdropFilter: "blur(7px)" }}
          >
            <PartnersSection />
          </div>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </>
  );
}