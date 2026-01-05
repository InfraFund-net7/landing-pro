'use client';

import Image, { type StaticImageData } from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Modal } from '../ui/modal';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const chunkArray = (arr: Contributor[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const mobileGroups = chunkArray(contributors, 4);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.offsetWidth;
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const slideWidth = container.offsetWidth;
    container.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full px-4 py-8">
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {contributors.map((item, index) => (
          <ContributorCard key={index} item={item} linkedin={linkedin} />
        ))}
      </div>
      <div
        ref={scrollContainerRef}
        className="sm:hidden overflow-x-auto snap-x snap-mandatory -mx-4 px-4 hide-scrollbar"
      >
        <div className="flex gap-6">
          {mobileGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex-shrink-0 w-full snap-center grid grid-cols-2 gap-4"
            >
              {group.map((item, index) => (
                <ContributorCard key={index} item={item} linkedin={linkedin} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {mobileGroups.length > 1 && (
        <div className="sm:hidden flex justify-center gap-3 mt-6">
          {mobileGroups.map((_, index) => (
            <div
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentSlide
                  ? 'w-[52px] bg-[#24FF8E]'
                  : 'w-3 bg-gray-500 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const ContributorCard = ({
  item,
  linkedin,
}: {
  item: Contributor;
  linkedin: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group relative w-full flex flex-col items-center gap-3">
        <div
          className="relative w-full aspect-square max-w-[190px] mx-auto rounded-[30px] overflow-hidden cursor-pointer sm:cursor-default"
          onClick={() => {
            const isMobile =
              typeof window !== 'undefined' && window.innerWidth < 640;
            if (isMobile) setIsModalOpen(true);
          }}
        >
          <Image
            src={item.img || '/placeholder.svg'}
            width={190}
            height={190}
            className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
            alt={item.name}
          />
          <div
            className="
    hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2 
    w-[85%] px-3 py-2
    rounded-2xl 
    bg-white/10 backdrop-blur-xl
    text-[10px] text-white text-center
    opacity-0 translate-y-3 scale-[0.95]
    transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]
    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
    shadow-[0_8px_30px_rgba(0,0,0,0.2)]
  "
          >
            {item.description}
          </div>
        </div>

        <div className="text-center w-full min-h-[60px] flex flex-col justify-start">
          <div className="flex justify-center items-center gap-2">
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.name} on LinkedIn`}
              className="flex-shrink-0"
            >
              <Image
                src={linkedin || '/placeholder.svg'}
                alt="linkedin"
                width={20}
                height={20}
              />
            </a>
            <h3 className="text-sm sm:text-base text-white font-normal truncate max-w-[120px] sm:max-w-[160px] text-foreground">
              {item.name}
            </h3>
          </div>
          <h4 className="text-xs text-muted-foreground text-white text-center mt-1 line-clamp-2">
            {item.role}
          </h4>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="90vw"
        height="auto"
        className="sm:hidden"
      >
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden">
            <Image
              src={item.img || '/placeholder.svg'}
              width={128}
              height={128}
              className="w-full h-full object-contain"
              alt={item.name}
            />
          </div>

          <h3 className="text-lg font-semibold text-center text-white">
            {item.name}
          </h3>
          <p className="text-sm text-gray-300 text-center">{item.role}</p>
          <p className="text-sm text-center leading-relaxed text-white">
            {item.description}
          </p>

          <a
            href={item.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm hover:underline text-[#24FF8E]"
          >
            <Image
              src={linkedin || '/placeholder.svg'}
              alt="linkedin"
              width={20}
              height={20}
            />
            View LinkedIn Profile
          </a>
        </div>
      </Modal>
    </>
  );
};
