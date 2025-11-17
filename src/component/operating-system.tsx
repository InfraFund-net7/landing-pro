import Image from 'next/image'
import React from 'react'
import solar from "@/../public/image/solar.jpg"
import solarpanel from "@/../public/image/solarpanel.jpg"
import windturbin from "@/../public/image/wind-turbin.jpg"
import factory from "@/../public/image/factory.jpg"

export default function OperatingSystem() {
    return (
        <main className="w-full h-fit overflow-hidden mb-10">
            <div className="px-4 py-16 md:py-24">
                {/* Hero Text */}
                <div className="text-center mb-16 md:mb-32 max-w-5xl mx-auto relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        The Single Operating System for Real-World Energy Asset Tokenization
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        From real-world assets to digital tokens in simple approach.
                    </p>
                </div>

                {/* Desktop (md and up) — unchanged */}
                <div className="hidden md:block relative w-full h-[1000px]">
                    <div
                        className="w-[1000px] h-[588px] rounded-full absolute -z-10 top-[10%] left-0 -translate-x-1/2"
                        style={{
                            background:
                                'radial-gradient(50% 50% at 50% 100%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)',
                            filter: 'blur(400px)',
                        }}
                    />
                    <Image
                        width={385}
                        height={245}
                        src={factory}
                        alt="Factory"
                        className="rounded-[60px] absolute top-[10%] -left-[8%]"
                    />
                    <Image
                        width={385}
                        height={245}
                        src={windturbin}
                        alt="Wind Turbine"
                        className="rounded-[60px] absolute -right-[5%]"
                    />
                    <Image
                        width={385}
                        height={245}
                        src={solar}
                        alt="Solar Farm"
                        className="rounded-[60px] absolute top-[45%] right-[10%]"
                    />
                    <Image
                        width={385}
                        height={245}
                        src={solarpanel}
                        alt="Solar Panels"
                        className="rounded-[60px] absolute top-[60%] left-[10%]"
                    />
                </div>

                {/* Mobile (only) — fixed version */}
                <div className="md:hidden flex flex-col items-center gap-6 px-2">
                    <Image
                        src={factory}
                        alt="Factory"
                        width={300}
                        height={190}
                        className="w-full max-w-[300px] h-auto rounded-[24px]"
                    />
                    <Image
                        src={windturbin}
                        alt="Wind Turbine"
                        width={300}
                        height={190}
                        className="w-full max-w-[300px] h-auto rounded-[24px]"
                    />
                    <Image
                        src={solar}
                        alt="Solar Farm"
                        width={300}
                        height={190}
                        className="w-full max-w-[300px] h-auto rounded-[24px]"
                    />
                    <Image
                        src={solarpanel}
                        alt="Solar Panels"
                        width={300}
                        height={190}
                        className="w-full max-w-[300px] h-auto rounded-[24px]"
                    />
                </div>
            </div>
        </main>
    )
}