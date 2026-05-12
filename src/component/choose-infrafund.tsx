'use client';
import React from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import stars from '@/../public/image/stars.png';
import { chosenItems } from '@/constants/chooseData';

type WhyChooseCard = {
  title: string;
  description: string;
  icon?: string;
  bottom?: string;
  order?: number;
};

type ChooseInfraFundProps = {
  title?: string;
  cards?: WhyChooseCard[];
};

const fallbackCards: WhyChooseCard[] = chosenItems.map((item) => ({
  title: item.title,
  description: item.description,
  icon: item.icon.src,
  bottom: item.bottom,
}));

export default function ChooseInfraFund({
  title = 'Why Choose InfraFund?',
  cards = fallbackCards,
}: ChooseInfraFundProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const sortedCards = [...cards].sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) -
      (b.order ?? Number.MAX_SAFE_INTEGER)
  );

  return (
    <section className="relative w-full flex flex-col items-center justify-center px-6 sm:px-10 md:px-20 py-20 gap-16 md:gap-20 overflow-hidden">
      <h2 className=" text-3xl sm:text-4xl md:text-[42px] text-white font-bold text-center">
        {title}
      </h2>
      <div className="absolute inset-0 z-0 flex justify-end items-center pointer-events-none">
        <div className="relative w-[600px] sm:w-[800px] md:w-[1000px] h-[400px] md:h-[600px]">
          <Image
            src={stars}
            width={588}
            height={588}
            alt="stars"
            className="absolute top-[5%] right-[10%] opacity-80"
          />
          <div
            className="absolute inset-0 rounded-full blur-[300px]"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)',
            }}
          />
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-x-16 sm:gap-y-16 w-full max-w-[1100px]">
        {sortedCards.map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: !isMobile && item.bottom ? item.bottom : '0px',
            }}
            className="flex items-start  sm:items-center gap-5 sm:gap-6"
          >
            {item.icon ? (
              <Image
                src={item.icon}
                alt={item.title}
                width={100}
                height={100}
                unoptimized={item.icon.endsWith('.svg')}
                className="w-[80px] sm:w-[100px] md:w-[135px] h-auto"
              />
            ) : (
              <div className="w-[80px] sm:w-[100px] md:w-[135px] h-[80px] sm:h-[100px] md:h-[135px] rounded-full bg-white/10" />
            )}
            <div className="flex flex-col gap-2 sm:gap-3 max-w-[400px]">
              <h3 className="text-white font-semibold text-xl sm:text-2xl leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
