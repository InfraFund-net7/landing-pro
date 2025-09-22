"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import solarpanel from "@/../public/image/solarpanel.jpg"
import Image from "next/image"
const projects = [
    {
        id: 1,
        category: "Solar Energy",
        title: "Solar Home California, USA",
        fundingTarget: "$18M",
        projectedReturn: "6.5%",
        fundingStatus: 68,
        image: solarpanel,
    },
    {
        id: 2,
        category: "Wind Energy",
        title: "North Sea Wind Farm, Denmark",
        fundingTarget: "$25M",
        projectedReturn: "7%",
        fundingStatus: 52,
        image: solarpanel,
    },
    {
        id: 3,
        category: "Solar Energy",
        title: "Solar Rooftops, UK",
        fundingTarget: "$15M",
        projectedReturn: "6.2%",
        fundingStatus: 62,
        image: solarpanel,
    },
]

export default function InvestmentPlatform() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const cardsPerSlide = 3;
    const gap = 20;
    const cardWidth = 320;
    const totalSlides = Math.ceil(projects.length / cardsPerSlide);
    const slideWidth = cardsPerSlide * (cardWidth + gap);
    const visibleProjects = projects.slice(
        currentSlide * cardsPerSlide,
        currentSlide * cardsPerSlide + cardsPerSlide
    );
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % projects.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)
    }

    return (
        <div className="min-h-screen bg-slate-900  overflow-hidden">
            <div className=" z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                <h2 className="text-[42px] lg:text-6xl font-bold text-white text-center mb-16 max-w-4xl">
                    Invest in the Future, Today
                </h2>
                <div className="w-full max-w-7xl  flex justify-center items-center gap-9 ">
                    <ChevronLeft size={40} onClick={prevSlide} />
                    <div className="w-full  py-10 flex flex-col items-center overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * (cardWidth + gap)}px)`,
                                width: `${projects.length * (cardWidth + gap)}px`,
                            }}
                        >
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="
      group relative w-[403px] h-[577px] flex-shrink-0 rounded-[50px] 
      overflow-hidden shadow-lg mr-6
      cursor-pointer
    "
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        className="
        w-full h-full object-cover absolute top-0 left-0
        transition-transform duration-500 ease-in-out
        group-hover:scale-105
      "
                                    />
                                    <div
                                        className="
        absolute bottom-0 w-full 
        bg-[#C4C4C466] backdrop-blur-md shadow-md 
        p-6 
        h-[230px] 
        transition-all duration-500 ease-in-out
        group-hover:h-[245px]
      "
                                    >
                                        <h3 className="text-xl font-semibold text-white mb-4">
                                            {project.title}
                                        </h3>

                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between text-gray-300">
                                                <span className="text-base font-normal">Funding Target:</span>
                                                <span className="text-white font-medium">{project.fundingTarget}</span>
                                            </div>

                                            <div className="flex justify-between text-gray-300">
                                                <span className="text-base font-normal">Projected Return:</span>
                                                <span className="text-white font-medium">{project.projectedReturn}</span>
                                            </div>

                                            <div className="flex justify-center text-gray-300 gap-1 w-full items-center">
                                                <span className="text-base font-normal">Funding Status:</span>
                                                <div className="w-full bg-white rounded-full h-2">
                                                    <div
                                                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${project.fundingStatus}%` }}
                                                    />
                                                </div>
                                                <span className="text-white font-medium">{project.fundingStatus}%</span>
                                            </div>
                                            <button
                                                className="
            opacity-0 translate-y-4
            group-hover:opacity-100 group-hover:translate-y-0
            mt-4 px-4 py-2 text-sm 
            text-emerald-500
            transition-all duration-500 ease-in-out
          "
                                            >
                                                See Project
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <ChevronRight size={40} onClick={nextSlide} />
                </div>
                <div className="flex gap-2 mt-8 mb-8">
                    {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                                ? "bg-emerald-500"
                                : "bg-gray-600 hover:bg-gray-500"
                                }`}
                        />
                    ))}
                </div>
                <button className="bg-transparent border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:bg-opacity-50">
                    Explore All Projects
                </button>
            </div>
        </div >
    )
}
