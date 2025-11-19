"use client"
import React, { useState, useRef } from 'react';
import { CustomButton } from './ui/custom-button';
import ContactUsModal from './contactus/contactus';

export default function ContactUsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {isOpen && <ContactUsModal isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={buttonRef} />}
      <div className="w-full flex flex-col items-center justify-center text-white gap-12 mb-20 px-4 relative">


        <h2 className="text-3xl sm:text-5xl font-bold text-center z-10">
          Let&apos;s Build the Green Future Together
        </h2>

        <p className="text-lg sm:text-2xl text-gray-300 text-center max-w-3xl z-10">
          Whether you&apos;re an investor ready to make an impact or a builder with a vision, we&apos;re here to help.
        </p>

        <div ref={buttonRef} className="z-10">
          <CustomButton
            variant="filled"
            onClick={() => setIsOpen(true)}
            className="w-[151px] h-[48px] text-base font-bold"
          >
            Contact Us
          </CustomButton>
        </div>
      </div>

    </>
  );
}