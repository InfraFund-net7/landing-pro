'use client';
import Image from 'next/image';
import { partners } from '@/data/partners';

const heroPartnerNames = [
  'Soonami',
  'TechSouthWest',
  'HelixWay',
  'ExeterUniversity',
  'ScalingEdge',
  'Uniswap',
  'Autodesk',
  'Cambridge',
];

const stats = [
  { value: '15', label: 'Supported Chains' },
  { value: '50', label: 'Integrated Projects' },
  { value: '$874M', label: 'TVL' },
  { value: '90 %', label: 'Yieldcoin Market Share' },
];

export default function HeroTrustStats() {
  const heroPartners = heroPartnerNames
    .map((name) => partners.find((p) => p.name === name))
    .filter((p): p is (typeof partners)[number] => Boolean(p));

  return (
    <div className="relative z-10 w-full">
      <div className="w-full flex flex-wrap justify-center sm:justify-between items-center gap-x-8 gap-y-4 px-4 sm:px-6 md:px-[90px] pb-8">
        {heroPartners.map((partner) => (
          <Image
            key={partner.name}
            src={partner.logo || '/placeholder.svg'}
            alt={partner.alt}
            width={120}
            height={40}
            className="h-6 sm:h-8 md:h-9 w-auto object-contain opacity-90"
            unoptimized
          />
        ))}
      </div>

      <div className="w-full border-t border-white/30" />

      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 px-4 sm:px-6 md:px-[90px] py-8 sm:py-10">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
              {stat.value}
            </span>
            <span className="text-gray-300 text-sm sm:text-base">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
