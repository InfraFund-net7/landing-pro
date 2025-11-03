'use client';

import Image, { StaticImageData } from 'next/image';

interface Contributor {
  img: string | StaticImageData;
  name: string;
  role: string;
  description: string;
  linkedin: string;
}

interface Props {
  contributors: Contributor[];
  linkedin: string;
}

export default function ContributorsSection({ contributors, linkedin }: Props) {
  return (
    <section className="w-full px-4 py-8">
      <div className="hidden md:grid grid-cols-5 gap-6">
        {contributors.map((item, index) => (
          <ContributorCard key={index} item={item} linkedin={linkedin} />
        ))}
      </div>

      <div className="md:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {contributors.map((item, index) => (
          <div key={index} className="snap-start flex-shrink-0 w-[190px]">
            <ContributorCard item={item} linkedin={linkedin} />
          </div>
        ))}
      </div>
    </section>
  );
}

const ContributorCard = ({ item, linkedin }: { item: Contributor; linkedin: string }) => {
  return (
    <div className="group relative w-full min-h-[280px] flex flex-col items-center justify-between ">
      <div className="relative w-[190px] h-[190px] bg-white rounded-[30px] overflow-hidden">
        <Image
          src={item.img}
          width={190}
          height={190}
          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
          alt={item.name}
        />
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-[30px] p-2 bg-[#191C2980] backdrop-blur-md text-[10px] w-full h-fit text-white text-center 
            opacity-0 scale-y-0 origin-bottom transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-y-100"
        >
          {item.description}
        </div>
      </div>

      <div className=" text-center w-full">
        <div className="flex justify-center items-center gap-2">
          <a
            href={item.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${item.name} on LinkedIn`}
          >
            <Image src={linkedin} alt="linkedin" width={20} height={20} />
          </a>
          <h3 className="text-base font-normal truncate max-w-[160px]">
            {item.name}
          </h3>
        </div>
        <h4 className="text-xs text-gray-500 text-center mt-1">
          {item.role}
        </h4>
      </div>
    </div>
  );
};