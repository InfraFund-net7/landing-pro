import Image from 'next/image';
import React from 'react';
import geo from '@/../public/image/geo-thermal.jpg';
import solarpanel from '@/../public/image/solarpanel.jpg';
import windturbin from '@/../public/image/wind-turbin.jpg';
import factory from '@/../public/image/factory.jpg';

type OperatingSystemImage = {
  image: string;
  alt: string;
};

type OperatingSystemProps = {
  title?: string;
  subtitle?: string;
  images?: OperatingSystemImage[];
};

const fallbackImages: OperatingSystemImage[] = [
  { image: factory.src, alt: 'Factory' },
  { image: windturbin.src, alt: 'Wind Turbine' },
  { image: geo.src, alt: 'Solar Farm' },
  { image: solarpanel.src, alt: 'Solar Panels' },
];

export default function OperatingSystem({
  title = 'The Single Operating System for Real-World Energy Asset Tokenization',
  subtitle = 'From real-world assets to digital tokens in simple approach.',
  images = fallbackImages,
}: OperatingSystemProps) {
  const [first, second, third, fourth] =
    images.length === 4 ? images : fallbackImages;

  return (
    <main className="w-full h-fit  overflow-hidden ">
      <div className="px-4 py-16">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-relaxed">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300">{subtitle}</p>
        </div>

        <div className="hidden md:block relative w-full h-[450px] ">
          <Image
            width={485}
            height={345}
            src={first.image}
            alt={first.alt}
            className="rounded-[60px] absolute top-[10%] -left-[8%]"
          />
          <Image
            width={485}
            height={345}
            src={second.image}
            alt={second.alt}
            className="rounded-[60px] absolute -right-[10%]"
          />
          <Image
            width={485}
            height={345}
            src={third.image}
            alt={third.alt}
            className="rounded-[60px] absolute top-[15%] right-[10%]"
          />
          <Image
            width={485}
            height={345}
            src={fourth.image}
            alt={fourth.alt}
            className="rounded-[60px] absolute top-[50%] left-[10%]"
          />
        </div>

        <div className="md:hidden flex flex-col items-center gap-6 px-2">
          <Image
            src={first.image}
            alt={first.alt}
            width={300}
            height={190}
            className="w-full max-w-[300px] h-auto rounded-[24px]"
          />
          <Image
            src={second.image}
            alt={second.alt}
            width={300}
            height={190}
            className="w-full max-w-[300px] h-auto rounded-[24px]"
          />
          <Image
            src={third.image}
            alt={third.alt}
            width={300}
            height={190}
            className="w-full max-w-[300px] h-auto rounded-[24px]"
          />
          <Image
            src={fourth.image}
            alt={fourth.alt}
            width={300}
            height={190}
            className="w-full max-w-[300px] h-auto rounded-[24px]"
          />
        </div>
      </div>
    </main>
  );
}
