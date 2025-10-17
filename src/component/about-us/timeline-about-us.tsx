"use client"

import { timelineData } from "@/constants/TimelineData"
import { partners } from "@/data/partners"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"

export default function Timeline() {
    const [nodeStates, setNodeStates] = useState<number[]>(() => {
        const arr = new Array(timelineData.length).fill(0)
        arr[0] = 1
        return arr
    })
    const [lineProgress, setLineProgress] = useState<number[]>(() => new Array(timelineData.length - 1).fill(0))

    const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
    const nodeStatesRef = useRef(nodeStates)
    const lineProgressRef = useRef(lineProgress)

    useEffect(() => {
        nodeStatesRef.current = nodeStates
    }, [nodeStates])

    useEffect(() => {
        lineProgressRef.current = lineProgress
    }, [lineProgress])
    useEffect(() => {
        const handleScroll = () => {
            const newNodeStates = [...nodeStatesRef.current]
            const newLineProgress = [...lineProgressRef.current]

            nodeRefs.current.forEach((node, index) => {
                if (!node) return

                const rect = node.getBoundingClientRect()
                const windowHeight = window.innerHeight
                const triggerPoint = windowHeight * 0.2

                if (rect.top < triggerPoint && rect.bottom > triggerPoint) {
                    newNodeStates[index] = 1
                } else {
                    if (rect.bottom < triggerPoint) newNodeStates[index] = 1
                    else newNodeStates[index] = 0
                }
                if (index > 0) {
                    const prevNode = nodeRefs.current[index - 1]
                    if (prevNode) {
                        const prevRect = prevNode.getBoundingClientRect()
                        const segmentHeight = rect.top - prevRect.top
                        const scrolledPast = triggerPoint - prevRect.top
                        const progress = Math.max(0, Math.min(100, (scrolledPast / segmentHeight) * 100))
                        newLineProgress[index - 1] = progress
                    }
                }
            })

            setNodeStates(newNodeStates)
            setLineProgress(newLineProgress)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isQuarterLeft = (index: number) => index % 2 === 0

    return (
        <div className="min-h-screen w-full py-10 md:py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="relative">
                    {timelineData.map((item, index) => {
                        if (item.quarter === "Today") return null
                        if (timelineData[index + 1]?.quarter === "Today") return null

                        const progress = lineProgress[index] || 0
                        return (
                            <div
                                key={`line-${index}`}
                                className="absolute left-8 md:left-1/2 w-0.5 md:-translate-x-1/2"
                                style={{
                                    top: `${(index * 100) / (timelineData.length - 1)}%`,
                                    height: `${100 / (timelineData.length - 3.4)}%`,
                                    background: `linear-gradient(to bottom, rgb(34, 197, 94) ${progress}%, rgb(209, 213, 219) ${progress}%)`,
                                    transition: "background 0.2s linear",
                                }}
                            />
                        )
                    })}

                    {timelineData.map((item, index) => {
                        const isGreen = nodeStates[index] === 1
                        const quarterLeft = isQuarterLeft(index)
                        return (
                            <div key={index} className="relative mb-16 md:mb-32 last:mb-0">
                                <div
                                    ref={(el) => {
                                        nodeRefs.current[index] = el
                                    }}
                                    className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 z-20 bg-[#0f172a]"
                                    style={{
                                        borderColor: isGreen ? "rgb(34, 197, 94)" : "rgb(209, 213, 219)",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <div
                                        className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                                        style={{
                                            backgroundColor: isGreen ? "rgb(34, 197, 94)" : "rgb(255, 255, 255)",
                                            transition: "all 0.3s ease",
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 pl-20 md:pl-0">
                                    <div className="w-full md:flex-1 md:pr-8">
                                        {quarterLeft ? (
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-xl md:text-3xl font-medium text-left md:text-right">{item.quarter}</h3>
                                                <p className="text-sm md:text-base font-bold text-left">{item.description}</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {item.logos?.map((name, logoIndex) => {
                                                    const partner = partners.find((p) => p.name === name)
                                                    if (!partner) return null
                                                    return (
                                                        <div
                                                            key={`${item.quarter}-${logoIndex}`}
                                                            className="flex justify-center items-center w-fit h-fit p-2 md:p-4"
                                                        >
                                                            <Image
                                                                src={partner.logo.src || "/placeholder.svg"}
                                                                alt={partner.alt}
                                                                width={0}
                                                                height={0}
                                                                sizes="100vw"
                                                                className="h-auto w-[120px] md:w-[193px] max-h-12 md:max-h-20 object-contain"
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    <div className="hidden md:block md:flex-1 md:pl-8">
                                        {!quarterLeft ? (
                                            <div className="flex flex-col gap-2 text-left">
                                                <h3 className="text-3xl font-medium ">{item.quarter}</h3>
                                                <p className="text-base font-bold ">{item.description}</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap gap-4">
                                                {item.logos?.map((name, logoIndex) => {
                                                    const partner = partners.find((p) => p.name === name)
                                                    if (!partner) return null
                                                    return (
                                                        <div
                                                            key={`${item.quarter}-${logoIndex}`}
                                                            className="flex justify-center items-center w-fit h-fit p-4"
                                                        >
                                                            <Image
                                                                src={partner.logo.src || "/placeholder.svg"}
                                                                alt={partner.alt}
                                                                width={0}
                                                                height={0}
                                                                sizes="100vw"
                                                                className="h-auto w-auto max-h-16 object-contain"
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full md:hidden">
                                        {!quarterLeft && (
                                            <div className="flex flex-col gap-2 text-left mt-4">
                                                <h3 className="text-xl font-medium">{item.quarter}</h3>
                                                <p className="text-sm font-bold">{item.description}</p>
                                            </div>
                                        )}
                                        {quarterLeft && (
                                            <div className="grid grid-cols-1 gap-4 mt-4">
                                                {item.logos?.map((name, logoIndex) => {
                                                    const partner = partners.find((p) => p.name === name)
                                                    if (!partner) return null
                                                    return (
                                                        <div
                                                            key={`${item.quarter}-${logoIndex}-mobile`}
                                                            className="flex justify-center items-center w-fit h-fit p-2"
                                                        >
                                                            <Image
                                                                src={partner.logo.src || "/placeholder.svg"}
                                                                alt={partner.alt}
                                                                width={0}
                                                                height={0}
                                                                sizes="100vw"
                                                                className="h-auto w-[120px] max-h-12 object-contain"
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
