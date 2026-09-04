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

export default function HeroTrustStats() {
  const heroPartners = heroPartnerNames
    .map((name) => partners.find((p) => p.name === name))
    .filter((p): p is (typeof partners)[number] => Boolean(p));

  return (
    <div className="relative z-10 w-full overflow-hidden pb-8">
      <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-slide-infinite">
          {[...heroPartners, ...heroPartners].map((partner, index) => (
            <Image
              key={`${partner.name}-${index}`}
              src={partner.logo || '/placeholder.svg'}
              alt={partner.alt}
              width={120}
              height={40}
              className="h-6 sm:h-8 md:h-9 w-auto object-contain opacity-90 shrink-0"
              unoptimized
            />
          ))}
        </div>
      </div>
    </div>
  );
}
