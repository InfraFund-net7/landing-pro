import React from 'react';
import infrafund from '@/../public/svg/infrafund.svg';
import Image from 'next/image';
import Link from 'next/link';
import { socials } from '@/constants/socials';
import { navItems } from '@/constants/FooterNavItem';

export default function FooterDefault() {
  return (
    <div className="w-full min-h-[656px] flex flex-col justify-center items-center gap-8 relative px-6 sm:px-10 md:px-16 lg:px-[90px] overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="flex flex-col gap-6 w-full lg:w-auto">
          <div className="w-full sm:w-[265px] flex flex-col gap-4 text-sm sm:text-base font-normal text-[#D6D6D6]">
            <Image
              src={infrafund}
              width={200}
              height={50}
              alt="InfraFund"
              className="w-[180px] sm:w-[261px] h-auto"
            />
            <span>📍 London, UK</span>
            <span>UK Residents - Risk Warning</span>
            <div className="w-fit flex flex-wrap gap-2.5 justify-start items-center">
              {socials.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-11 sm:h-11 border border-[#0A1F4A] rounded-[5px] flex justify-center items-center 
                  transition-all duration-300 ease-in-out 
                  hover:border-[#24FF8E] hover:bg-[#24FF8E]/10 hover:scale-110"
                >
                  {item.type === 'component' ? (
                    <item.icon size={18} className="text-[#D6D6D6]" />
                  ) : (
                    <Image
                      src={item.icon}
                      width={18}
                      height={18}
                      alt={item.name}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[511px] flex flex-wrap sm:flex-nowrap justify-between items-start gap-6">
          {navItems.map((section, i) => (
            <div key={i} className="min-w-[120px]">
              <h3 className="font-bold text-base sm:text-lg">
                {section.title}
              </h3>
              <ul className="mt-2 space-y-1 text-sm sm:text-base">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <Link
                      href={item.link}
                      className="hover:text-[#24FF8E] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-fit flex justify-start items-center">
        <p className="text-xs sm:text-sm md:text-base text-[#C1C7CB] leading-relaxed">
          InfraNetZero LTD (trading as InfraFund) is an award winning startup,
          incubated & accelerated in SETsquared Partnership delivered by
          University of Exeter. Please be aware that investing in tokenized
          renewable energy assets through our platform (www.InfraFund.net) is a
          high-risk activity where your capital is at risk, and you may lose
          your entire investment. These investments are not covered by the
          Financial Services Compensation Scheme (FSCS). By creating an account,
          you accept our Terms of Service and Privacy Policy. We do not provide
          any investment, tax, or legal advice; any investment decisions are
          solely your responsibility. All personal data is handled in strict
          compliance with UK GDPR. We strongly advise you to consult with
          independent professional advisors before making any investment.
        </p>
      </div>
      <div className="md:absolute md:z-10 w-full h-[90px] sm:h-[101px] text-center bottom-0 border-t border-[#FFFFFF1A] flex justify-center items-center px-4">
        <span className="text-xs sm:text-base font-normal text-[#C1C7CB]">
          © 2025 InfraNetZero LTD | All rights reserved.
        </span>
      </div>
      <div
        className="w-[600px] sm:w-[800px] md:w-[1000px] h-[400px] sm:h-[500px] md:h-[588px] rounded-full absolute -z-10 -bottom-[80%] sm:-bottom-[100%]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 100%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)',
          filter: 'blur(400px)',
        }}
      />
    </div>
  );
}
