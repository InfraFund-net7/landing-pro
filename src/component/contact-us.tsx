'use client';
import React, { useRef } from 'react';
import { CustomButton } from './ui/custom-button';
import ContactUsModal from './contactus/contactus';

interface ContactUsPageProps {
  isopen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ContactUsPage({
  isopen,
  setIsOpen,
}: ContactUsPageProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ContactUsModal
        isOpen={isopen}
        onClose={() => setIsOpen(false)}
        triggerRef={buttonRef}
      />

      <div className="w-full flex flex-col items-center justify-center text-white gap-12 mb-20 px-4 relative py-20 bg-gradient-to-b from-transparent to-black/20">
        <h2 className="text-3xl sm:text-5xl font-bold text-center z-10">
          Let&apos;s Build the Green Future Together
        </h2>
        <p className="text-lg sm:text-2xl text-gray-300 text-center max-w-3xl z-10">
          Whether you&apos;re an investor ready to make an impact or a builder
          with a vision, we&apos;re here to help.
        </p>
        <div ref={buttonRef} className="z-10">
          <CustomButton
            variant="filled"
            onClick={() => setIsOpen(true)}
            className="w-[151px] h-12 text-base font-bold text-center justify-center items-center flex"
          >
            Contact Us
          </CustomButton>
        </div>
      </div>
    </>
  );
}
