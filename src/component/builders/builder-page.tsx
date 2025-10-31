import React from 'react'
import BlockchainDiagram from './blockchain-diagram'
import BuilderFeature from './builder-feature'
import { Builderfaqs } from '@/constants/builderData'
import { CustomButton } from '../ui/custom-button'
import FaqList from '../ui/FaqList'

export default function BuilderPage() {
    return (
        <>
            <div className='w-full h-fit flex flex-col justify-center items-center py-[175px] sm:py-0'>
                <div
                    className="fade-in w-full h-[1024px] relative flex justify-start items-center overflow-hidden bg-[url('/image/builders-hero.jpg')] bg-cover bg-no-repeat max-lg:h-auto max-lg:py-20 max-md:flex-col max-md:text-center max-md:px-6 max-md:bg-none max-sm:h-auto max-sm:py-12"
                >

                    <div className='space-y-12 absolute z-10 px-[90px] max-md:static max-md:px-6'>
                        <h1
                            className="text-[64px] text-white font-bold max-md:text-4xl"
                        >
                            Stop Pitching Banks.<br />
                            Start Building Your Future
                        </h1>
                        <h2 className='text-2xl text-white font-normal max-md:text-base'>
                            InfraFund provides the full-stack toolkit to fund your NetZero project,<br className='max-md:hidden' />
                            from tokenisation to global distribution.
                        </h2>
                        <CustomButton variant='filled' className='w-fit h-12 px-4 flex justify-center items-center text-sm sm:text-lg  rounded-lg '>
                            Start Your Project Application
                        </CustomButton>
                    </div>
                </div>
                <div className="fade-in min-h-screen w-full overflow-hidden mt-10 relative flex justify-center items-center py-20 px-[90px] rounded-3xl max-md:px-4 max-md:py-10">
                    <div className="w-full">
                        <BlockchainDiagram />
                    </div>
                </div>
                    <BuilderFeature />
                <div className="fade-in py-24 flex flex-col relative justify-center items-center gap-6 max-md:py-12">
                    <div
                        className="absolute inset-0 rounded-full blur-[300px]"
                        style={{
                            background:
                                "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
                        }}
                    />
                    <h2 className="text-[42px] text-white font-bold max-md:text-[28px]">For Builders FAQ</h2>
                    <div className="space-y-4 w-[834px] max-lg:w-[90%] max-md:w-full max-md:px-4">
                        <FaqList faqs={Builderfaqs} />
                    </div>
                </div>
                    <div className="fade-in w-full py-36 flex flex-col justify-center items-center gap-20 max-md:py-16 max-md:gap-10">
                        <h2 className="text-5xl font-bold text-white max-md:text-3xl text-center">Ready to Accelerate Your Funding?</h2>
                        <CustomButton variant='filled' className='w-fit h-12 px-4 flex justify-center items-center text-sm sm:text-lg rounded-lg '>
                            Apply to list your project
                        </CustomButton>
                    </div>
            </div >
        </>
    )
}
