import React from 'react'
import projectbuilder from "@/../public/svg/builders-project.png"
import Image from 'next/image'
import BuilderEnergyFlow from './builder-energy-flow'

export default function BuilderFeature() {
    return (
        <div className='w-full h-fit flex flex-col justify-center items-center gap-16 py-24 max-lg:py-16 max-md:py-10'>
            <div className='flex flex-col text-center gap-5 px-4'>
                <h2 className='text-5xl font-bold text-white max-md:text-3xl'>&quot;Secret Sauce&quot; Feature</h2>
                <h3 className='text-2xl font-normal text-gray-100 max-md:text-base'>Your Project, Upgraded with an AI-Driven Digital</h3>
            </div>

            <div className="w-[1260px] h-[614px] bg-[url('/svg/builder-section.svg')] py-10 flex justify-center items-start gap-16
                max-xl:w-[95%] max-lg:flex-col max-lg:items-center max-lg:gap-10 max-md:bg-none max-md:w-full max-md:px-4 max-md:h-auto">

                <div className='w-[570px] h-[417px] flex justify-center items-center max-lg:w-[80%] max-md:w-full'>
                    <Image src={projectbuilder} width={570} height={417} alt='builder-project' className='w-full h-auto object-contain' />
                </div>

                <div className='flex flex-col gap-12 w-fit h-full max-lg:w-full max-md:gap-8'>
                    <div
                        className="w-[534px] h-[228px] rounded-[20px] flex justify-center items-center p-16 gap-5
                        max-lg:w-full max-md:flex-col max-md:h-auto max-md:p-6"
                        style={{
                            border: '2px solid transparent',
                            borderImageSource: 'linear-gradient(196.23deg, rgba(36, 255, 142, 0.02) 0%, rgba(36, 255, 142, 0.4) 50%, rgba(36, 255, 142, 0.02) 100%)',
                            borderImageSlice: 1,
                        }}
                    >
                        <div className='flex flex-col text-center w-fit h-fit gap-2'>
                            <h4 className='text-xl text-white font-normal max-md:text-base'>Energy Generated</h4>
                            <span className='text-3xl text-white font-bold max-md:text-xl'>1.21 GW</span>
                        </div>
                        <div className='flex flex-col text-center w-fit h-fit gap-2'>
                            <h4 className='text-xl text-white font-normal max-md:text-base'>Co2 Saved</h4>
                            <span className='text-3xl text-white font-bold max-md:text-xl'>850 Tons/Year</span>
                        </div>
                    </div>

                    <div className='w-[534px] h-[208px] flex justify-center items-center max-lg:w-full max-md:w-full'>
                        <BuilderEnergyFlow />
                    </div>
                </div>
            </div>
        </div>
    )
}
