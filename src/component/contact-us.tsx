'use client';
import React, { useRef } from 'react';
import { CustomButton } from './ui/custom-button';
import ContactUsModal from './contactus/contactus';

interface ContactUsPageProps {
  isopen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
  actions?: Array<{
    title: string;
    description: string;
    type: 'booking' | 'email';
  }>;
}

export default function ContactUsPage({
  isopen,
  setIsOpen,
  heading = "Let's Build the Green Future Together",
  subheading = "Whether you're an investor ready to make an impact or a builder with a vision, we're here to help.",
  buttonLabel = 'Contact Us',
  actions,
}: ContactUsPageProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ContactUsModal
        isOpen={isopen}
        onClose={() => setIsOpen(false)}
        triggerRef={buttonRef}
        actions={actions}
      />

      <div className="w-full flex flex-col items-center justify-center text-white gap-12 mb-20 px-4 relative py-20 bg-gradient-to-b from-transparent to-black/20">
        <h2 className="text-3xl sm:text-5xl font-bold text-center z-10">
          {heading}
        </h2>
        <p className="text-lg sm:text-2xl text-gray-300 text-center max-w-3xl z-10">
          {subheading}
        </p>
        <div ref={buttonRef} className="z-10">
          <CustomButton
            variant="filled"
            onClick={() => setIsOpen(true)}
            className="w-[151px] h-12 text-base font-bold text-center justify-center items-center flex"
          >
            {buttonLabel}
          </CustomButton>
        </div>
      </div>
    </>
  );
}
