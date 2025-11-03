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
    <section className="w-full">
      <div
        className="fade-in grid gap-x-6 gap-y-6 
                            grid-cols-2 sm:grid-cols-2 md:grid-cols-5 
                            max-xl:grid-cols-3 max-lg:grid-cols-2"
      >
        {contributors.map((item, index) => (
          <div
            className="flex flex-col gap-4 justify-center items-center group relative w-full max-w-[190px] md:max-w-[190px]"
            key={index}
          >
            <div className="relative w-full">
              <Image
                src={item.img}
                width={150}
                height={150}
                className="rounded-[30px] w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                alt={item.name}
              />
              <div
                className="absolute bottom-0 left-0 right-0 rounded-b-[30px] p-2 bg-[#191C2980] backdrop-blur-md text-[10px] w-full h-fit text-white text-center 
        opacity-0 scale-y-0 origin-bottom transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-y-100"
              >
                {item.description}
              </div>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center text-center">
              <div className="flex justify-center items-center gap-2">
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${item.name} on LinkedIn`}
                >
                  <Image src={linkedin} alt="linkedin" width={20} height={20} />
                </a>
                <h3 className="text-base md:text-[20px] font-normal">
                  {item.name}
                </h3>
              </div>
              <h4 className="text-xs md:text-sm text-gray-500">{item.role}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
