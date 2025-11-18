import Image from 'next/image'
import React from 'react'
import geo from "@/../public/image/geo-thermal.jpg"
import solarpanel from "@/../public/image/solarpanel.jpg"
import windturbin from "@/../public/image/wind-turbin.jpg"
import factory from "@/../public/image/factory.jpg"

export default function OperatingSystem() {
    return (
        <main className="w-full h-fit  overflow-hidden ">
            <div className="px-4 py-16">
                <div className="text-center max-w-5xl mx-auto relative -z-10 ">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        The Single Operating System for Real-World Energy Asset Tokenization
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        From real-world assets to digital tokens in simple approach.
                    </p>
                </div>

                <div className="hidden md:block relative w-full h-[450px] ">
                    <Image
                        width={485}
                        height={345}
                        src={factory}
                        alt="Factory"
                        className="rounded-[60px] absolute top-[10%] -left-[8%]"
                    />
                    <Image
                        width={485}
                        height={345}
                        src={windturbin}
                        alt="Wind Turbine"
                        className="rounded-[60px] absolute -right-[10%]"
                    />
                    <Image
                        width={485}
                        height={345}
                        src={geo}
                        alt="Solar Farm"
                        className="rounded-[60px] absolute top-[15%] right-[10%]"
                    />
                    <Image
                        width={485}
                        height={345}
                        src={solarpanel}
                        alt="Solar Panels"
                        className="rounded-[60px] absolute top-[50%] left-[10%]"
                    />
                </div>

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
                        src={geo}
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