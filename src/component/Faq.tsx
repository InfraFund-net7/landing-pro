import React from 'react'
import FaqList from './ui/FaqList'
import { Investfaqs } from '@/constants/investorData'
import { Builderfaqs } from '@/constants/builderData'
import { Platformfaqs } from '@/constants/platformData'

export default function Faq() {
    return (
        <div className="flex flex-col justify-center items-center gap-8 py-[175px] px-4 md:px-6 lg:px-12 xl:px-[90px]">
            <h2 className="text-2xl font-bold text-white text-center leading-tight md:text-3xl lg:text-4xl xl:text-[42px]">
                FAQ
            </h2>
            <div className="w-full flex flex-col gap-4 md:gap-2">
                <FaqList faqs={Platformfaqs} allowMultiple={true} />
                <FaqList faqs={Investfaqs} allowMultiple={true} />
                <FaqList faqs={Builderfaqs} allowMultiple={true} />
            </div>
        </div>
    )
}