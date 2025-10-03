"use client"

import { partners } from "@/data/partners"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
type TimelineItem = {
    quarter: string
    description: string
    logos?: string[]
}

export default function Timeline() {
    const timelineData: TimelineItem[] = [
        {
            quarter: "Q1 2024",
            description:
                "The Spark of Innovation Our journey began when InfraFund was incubated and accelerated by the prestigious SETsquared Partnership, delivered by the University of Exeter.",
            logos: ["SETSquared", "ExeterStudent", "ExeterSustainability"],
        },
        {
            quarter: "Q2 2024",
            description:
                "Building with World-Class Partners Momentum grew quickly. By April 2024, we were accepted into the Innovate UK ICURe programme, securing £3,700 in funding to deeply explore the market and validate our assumptions with renewable energy developers. We also secured a significant boost from the Microsoft for Startups program, receiving $150,000 in credits to build our platform on a world-class infrastructure. This support was critical in turning our vision into a technical reality.",
            logos: ["ICURe", "Microsoft", "MicrosoftStartup", "InnovateUK"],
        },
        {
            quarter: "Q3 2024",
            description:
                "Gaining Industry-Wide Recognition By September, our innovative approach was recognized across the industry. We were honored with the Autodesk Technology Impact award, securing $53,400 in software donation to develop our AI-driven digital twins for a more transparent investment platform.",
            logos: ["Autodesk"],
        },
        {
            quarter: "Q4 2024",
            description:
                "We were also accepted into the Innovate UK Scaling the Edge NetZero program, securing £10,000 in funding to further our market validation. We were named a FinTech Award Finalist by Tech South West , a Sustainability Award Finalist in Exeter , and joined the Barclays Eagle Labs-funded Forge Accelerator for ClimateTech, solidifying our position as a leader in the space.",
            logos: ["InnovateUK", "ScalingEdge", "ExeterSustainability", "HelixWay"],
        },
        {
            quarter: "Q1 2025",
            description:
                "Deepening our Web3 Credentials Entering 2025, we validated our cutting-edge blockchain technology on a global stage. We secured a place in the Soonami.io web3 Accelerator (with $20,000 in funding commitment) ",
            logos: ["Soonami"],
        },
        {
            quarter: "Q2 2025",
            description:
                "Also were selected for the Uniswap Hook Incubator, placing us at the forefront of decentralized finance innovation.",
            logos: ["Uniswap", "UniswapHook", "TechSouthWest", "Growth"],
        },
        {
            quarter: "Q3 2025",
            description:
                "Poised for Impact With the backing of over a dozen leading innovation ecosystems and more than 16 expressions of interest from renewable energy developers, InfraFund is poised to redefine the future of sustainable energy finance.",
        },
        {
            quarter: "Today",
            description:
                "Poised for Impact With the backing of over a dozen leading innovation ecosystems and more than 16 expressions of interest from renewable energy developers, InfraFund is poised to redefine the future of sustainable energy finance.",
        },
    ]

    const [nodeStates, setNodeStates] = useState<number[]>(() => {
        const arr = new Array(timelineData.length).fill(0);
        arr[0] = 1;
        return arr;
    })
    const [lineProgress, setLineProgress] = useState<number[]>(() => new Array(timelineData.length - 1).fill(0))
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const handleScroll = () => {
            const newNodeStates = [...nodeStates]
            const newLineProgress = [...lineProgress]

            nodeRefs.current.forEach((node, index) => {
                if (!node) return

                const rect = node.getBoundingClientRect()
                const windowHeight = window.innerHeight
                const triggerPoint = windowHeight / 2

                if (index > 0) {
                    const prevNode = nodeRefs.current[index - 1]
                    if (prevNode) {
                        const prevRect = prevNode.getBoundingClientRect()
                        const segmentHeight = rect.top - prevRect.top
                        const scrolledPast = triggerPoint - prevRect.top
                        const progress = Math.max(0, Math.min(100, (scrolledPast / segmentHeight) * 100))

                        newLineProgress[index - 1] = progress

                        if (progress >= 100) {
                            newNodeStates[index] = 1
                        }
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

    const isQuarterLeft = (index: number) => index % 2 === 0;

    return (
        <div className="min-h-screen w-full  py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="relative">
                    {timelineData.map((_, index) => {
                        if (index === timelineData.length - 1) return null
                        const progress = lineProgress[index] || 0
                        return (
                            <div
                                key={`line-${index}`}
                                className="absolute left-1/2 w-0.5 -translate-x-1/2"
                                style={{
                                    top: `${(index * 100) / (timelineData.length - 1)}%`,
                                    height: `${100 / (timelineData.length - 1)}%`,
                                    background: `linear-gradient(to bottom, rgb(34, 197, 94) ${progress}%, rgb(209, 213, 219) ${progress}%)`,
                                    transition: "background 0.1s linear",
                                }}
                            />
                        )
                    })}

                    {timelineData.map((item, index) => {
                        const isGreen = nodeStates[index] === 1
                        const quarterLeft = isQuarterLeft(index)
                        return (
                            <div key={index} className="relative mb-32 last:mb-0">
                                <div
                                    ref={(el) => {
                                        nodeRefs.current[index] = el
                                    }}
                                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 z-10"
                                    style={{
                                        backgroundColor: isGreen ? "rgb(34, 197, 94)" : "rgb(255, 255, 255)",
                                        borderColor: isGreen ? "rgb(34, 197, 94)" : "rgb(209, 213, 219)",
                                        transition: "all 0.3s ease",
                                    }}
                                />
                                <div className="flex flex-row items-start gap-8">
                                    <div className="flex-1 pr-8">
                                        {quarterLeft ? (
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-3xl font-medium text-right">{item.quarter}</h3>
                                                <p className="text-base font-bold text-left">{item.description}</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-4">
                                                {item.logos?.map((name, logoIndex) => {
                                                    const partner = partners.find((p) => p.name === name)
                                                    if (!partner) return null
                                                    return (
                                                        <div
                                                            key={`${item.quarter}-${logoIndex}`}
                                                            className="flex justify-center items-center w-fit h-fit p-4">
                                                            <Image
                                                                src={partner.logo.src}
                                                                alt={partner.alt}
                                                                width={0}
                                                                height={0}
                                                                sizes="100vw"
                                                                className="h-auto w-[193px] max-h-20 object-contain"
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 pl-8">
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
                                                            className="flex justify-center items-center w-fit h-fit p-4">
                                                            <Image
                                                                src={partner.logo.src}
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
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}