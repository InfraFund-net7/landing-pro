"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import AnimatedChevrons from './ui/animated-chevrons';
import stars from '@/../public/image/stars.png';
import { infradiffrence, invest, Investfaqs } from '@/constants/investorData';
import { CustomButton } from './ui/custom-button';
import FaqList from './ui/FaqList';
import ContactUs from './contactus/contactus';
export default function Investors() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  return (
    <div className="fade-in flex flex-col justify-center items-center gap-12">
      <div
        className="w-full h-[900px] relative flex justify-start items-center overflow-hidden 
                  max-lg:h-auto max-lg:py-20 max-md:flex-col max-md:text-center max-md:px-6"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 35%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 80%), 
          url('/image/investor-hero.png')
        `,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
          }}
        ></div>

        <div
          className="relative z-10 w-full h-full flex justify-start items-center px-[90px] 
                    max-lg:px-12 max-md:px-6 max-md:py-12 max-md:justify-center"
        >
          <div
            className="max-w-[820px] flex flex-col justify-center items-start gap-12 text-white 
                      max-md:items-center max-md:text-center"
          >
            <h1 className="text-[64px] font-bold leading-tight max-lg:text-[48px] max-md:text-[32px]">
              Invest Directly in the <br className="max-md:hidden" /> Future of
              Our Planet
            </h1>
            <h2 className="text-2xl font-normal text-white/90 max-md:text-lg">
              Access transparent, liquid, and high-impact green infrastructure
              projects,
              <br className="max-md:hidden" /> powered by the security of the
              blockchain
            </h2>
            <CustomButton
              variant="filled"
              className="w-fit h-12 flex justify-center items-center px-6 text-base font-semibold
             max-md:w-[130px] max-md:h-10 max-md:text-[13px] max-md:px-3 max-md:font-medium"
            >
              Get Started
            </CustomButton>
          </div>
        </div>
      </div>
      <section className="fade-in">
        <div className="fade-in w-full h-fit flex flex-col justify-center items-center px-[90px] py-12 gap-24 max-lg:px-12 max-md:px-6 max-md:gap-12">
          <h2 className="text-[42px] text-white font-bold max-md:text-[28px]">
            The InfraFund Difference
          </h2>
          <div
            className="w-full h-[700px] border border-[#5D5D5D] rounded-[50px] flex justify-center items-center 
                    max-lg:flex-col max-lg:h-auto max-lg:rounded-[30px] max-md:rounded-[20px]"
          >
            {infradiffrence.map((item, index) => (
              <div
                key={index}
                className={`w-1/3 h-full ${index !== infradiffrence.length - 1 ? 'border-r border-[#5D5D5D]' : ''} 
                      flex flex-col justify-between items-center px-6 pt-[80px] py-28 text-center text-white
                      max-lg:w-full max-lg:border-r-0 max-lg:border-b max-lg:py-12`}
              >
                <div className="flex flex-col gap-12 justify-center items-center max-md:gap-6">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="max-md:w-[70px]"
                  />
                  <h2 className="text-4xl font-bold max-md:text-2xl">
                    {item.title}
                  </h2>
                </div>
                <p className="text-2xl font-normal max-md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fade-in">
        <div className="fade-in flex flex-col justify-center items-center gap-10 p-10 w-full relative max-md:p-6">
          <Image
            src={stars}
            width={588}
            height={588}
            alt="stars"
            className="absolute z-20 -top-[10%] right-[1%] max-md:hidden"
          />
          <h2 className="text-5xl font-bold text-white max-md:text-3xl">
            How to Invest
          </h2>
          <div className="flex flex-col gap-8 justify-center items-center">
            {invest.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-6 max-md:gap-4"
                >
                  <div className="flex flex-col items-center gap-4 text-center max-w-md">
                    <div className="flex justify-center items-center gap-4 text-white">
                      <Icon className="w-11 h-11 max-md:w-8 max-md:h-8" />
                      <h3 className="text-[32px] font-medium max-md:text-xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-white/90 text-2xl font-normal max-md:text-base">
                      {item.description}
                    </p>
                  </div>
                  {index < invest.length - 1 && <AnimatedChevrons />}
                </div>
              );
            })}
          </div>
          <Image
            src={stars}
            width={588}
            height={588}
            alt="stars"
            className="absolute z-20 -bottom-[10%] left-[1%] max-md:hidden"
          />
        </div>
      </section>
      <section className="fade-in">
        <div className="w-full h-fit relative max-md:px-4">
          <div className="fade-in py-24 flex flex-col justify-center items-center gap-6 max-md:py-12">
            <h2 className="text-[42px] text-white font-bold max-md:text-[28px]">
              FAQs
            </h2>
            <div className="space-y-4 w-[834px] max-lg:w-[90%] max-md:w-full">
              <FaqList faqs={Investfaqs} />
            </div>
          </div>
          <ContactUs isOpen={isContactModalOpen} onClose={closeContactModal} />
          <div className="fade-in w-full py-36 flex flex-col justify-center items-center gap-20 max-md:py-16 max-md:gap-10">
            <h2 className="text-5xl font-bold text-white max-md:text-3xl text-center">
              Ready to build your impact portfolio?
            </h2>
            <CustomButton
              variant="filled"
              className="w-fit h-12 flex justify-center items-center px-6 text-base font-semibold
             max-md:w-[130px] max-md:h-10 max-md:text-[13px] max-md:px-3 max-md:font-medium"
              onClick={openContactModal}
            >
              Get Started
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
}
