import React from 'react';
import FaqList from './ui/FaqList';
import { combinedFaqs } from '@/constants/faqs';

export default function Faq() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 py-[175px] px-4 md:px-6 lg:px-12 xl:px-[90px]">
      <h2 className="text-2xl font-bold text-white text-center leading-tight md:text-3xl lg:text-4xl xl:text-[42px]">
        FAQs
      </h2>
      <div className="w-full">
        <FaqList faqs={combinedFaqs} allowMultiple={true} />
      </div>
    </div>
  );
}
