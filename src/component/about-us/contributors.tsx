"use client";

import Image, { StaticImageData } from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface Contributor {
    img: string | StaticImageData;
    name: string;
    role: string;
    description: string;
    linkedin: string;
}

interface Props {
    contributors: Contributor[];
    linkedin: string;
}

export default function ContributorsSection({ contributors, linkedin }: Props) {
    return (
        <section className="w-full">
            <div className="hidden md:grid grid-cols-5 gap-x-[78px] gap-y-[48px] max-xl:grid-cols-3 max-lg:grid-cols-2">
                {contributors.map((item, index) => (
                    <div
                        className="w-fit h-[256px] flex flex-col gap-4 justify-center items-center group relative"
                        key={index}
                    >
                        <div className="relative">
                            <Image
                                src={item.img}
                                width={190}
                                height={190}
                                className="rounded-[40px] w-[190px] h-[190px] grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                                alt={item.name}
                            />
                            <div className="absolute bottom-1 left-1 right-1 rounded-[40px] bg-[#191C2980] backdrop-blur-md text-[10px] p-3 text-white text-center opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                                {item.description}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 justify-center items-center">
                            <div className="flex justify-center items-center gap-2">
                                <a
                                    href={item.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${item.name} on LinkedIn`}
                                >
                                    <Image src={linkedin} alt="linkedin" width={20} height={20} />
                                </a>
                                <h3 className="text-[20px] font-normal">{item.name}</h3>
                            </div>
                            <h4 className="w-[225px] text-sm font-normal text-gray-500 text-center">
                                {item.role}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:hidden">
                <ContributorsMobileWave
                    contributors={contributors}
                    linkedin={linkedin}
                />
            </div>
        </section>
    );
}

function ContributorsMobileWave({
    contributors,
    linkedin,
}: {
    contributors: Contributor[];
    linkedin: string;
}) {
    const topRowRef = useRef<HTMLDivElement | null>(null);
    const bottomRowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!topRowRef.current || !bottomRowRef.current) return;

        const topRow = topRowRef.current;
        const bottomRow = bottomRowRef.current;

        const cardWidth = 150;
        const gap = 24;
        const topCount = topRow.children.length;
        const bottomCount = bottomRow.children.length;

        const topDistance = (cardWidth + gap) * topCount / 2;
        const bottomDistance = (cardWidth + gap) * bottomCount / 2;
        const tlTop = gsap.to(topRow, {
            x: -topDistance,
            duration: 8,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
        });
        const tlBottom = gsap.to(bottomRow, {
            x: -bottomDistance,
            duration: 6,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1,
        });

        return () => {
            tlTop.kill();
            tlBottom.kill();
        };
    }, []);

    const half = Math.ceil(contributors.length / 2);
    const top = contributors.slice(0, half);
    const bottom = contributors.slice(half);

    return (
        <div className="overflow-hidden pb-4 px-4">
            <div className="flex flex-col gap-6">
                <div
                    ref={topRowRef}
                    className="flex gap-6 items-center"
                    style={{ width: "max-content" }}
                >
                    {top.concat(top).map((item, i) => (
                        <ContributorCard key={`top-${i}`} item={item} linkedin={linkedin} />
                    ))}
                </div>
                <div
                    ref={bottomRowRef}
                    className="flex gap-6 items-center"
                    style={{ width: "max-content" }}
                >
                    {bottom.concat(bottom).map((item, i) => (
                        <ContributorCard key={`bottom-${i}`} item={item} linkedin={linkedin} />
                    ))}
                </div>
            </div>
        </div>
    );
}


function ContributorCard({
    item,
    linkedin,
}: {
    item: Contributor;
    linkedin: string;
}) {
    return (
        <div className="w-[150px] flex-shrink-0 flex flex-col gap-3 justify-center items-center group relative">
            <div className="relative">
                <Image
                    src={item.img}
                    width={150}
                    height={150}
                    className="rounded-[30px] grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                    alt={item.name}
                />
                <div className="absolute bottom-1 left-1 right-1 rounded-[30px] bg-[#191C2980] backdrop-blur-md text-[9px] p-2 text-white text-center opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                    {item.description}
                </div>
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex items-center gap-1">
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer">
                        <Image src={linkedin} alt="linkedin" width={16} height={16} />
                    </a>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                </div>
                <h4 className="text-xs text-gray-400 w-[120px]">{item.role}</h4>
            </div>
        </div>
    );
}
