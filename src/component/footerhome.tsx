import React from "react";
import world from "@/../public/svg/world.svg";
import infrafund from "@/../public/svg/infrafund.svg";
import Image from "next/image";
import Link from "next/link";
import Uk from "@/../public/svg/englandflag.svg";
import { socials } from "@/constants/socials";
import { navItems } from "@/constants/FooterNavItem";

export default function FooterHome() {
  return (
    <div
      className="
        w-full 
        h-auto lg:h-[600px] 
        px-5 sm:px-10 lg:px-[90px] 
        py-10 lg:py-0 
        flex flex-col lg:flex-row 
        justify-center lg:justify-between 
        items-center lg:items-center 
        relative gap-10 lg:gap-0
      "
    >
      <div className="absolute bottom-4 right-4 -z-10 w-[200px] sm:w-[300px] lg:w-auto opacity-70">
        <Image src={world} alt="world-footer" className="w-full h-auto" />
        <Image
          src={Uk}
          className="absolute right-[34%] top-[27%] w-[18px] sm:w-[25px] lg:w-auto"
          alt="Uk"
        />
      </div>
      <div className="w-full lg:w-[749px] h-fit flex flex-col gap-4 text-sm sm:text-base font-normal text-[#D6D6D6] text-center lg:text-left">
        <div className="flex justify-center lg:justify-start">
          <Image src={infrafund} width={261} height={63} alt="InfraFund" />
        </div>
        <p className="leading-relaxed">
          InfraNetZero LTD is authorised and regulated by the Financial Conduct
          Authority in the UK. Please be aware that investing in tokenized
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
        <span>📍 London, UK</span>
        <span>UK Residents - Risk Warning</span>

        <div className="w-full flex flex-wrap justify-center lg:justify-start gap-3 mt-3">
          {socials.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-11 md:h-11 border border-[#0A1F4A] rounded-[5px] flex justify-center items-center 
               transition-all duration-300 ease-in-out 
               hover:border-[#24FF8E] hover:bg-[#24FF8E]/10 hover:scale-110"
            >
              {item.type === "component" ? (
                <item.icon size={20} className="text-[#D6D6D6]" />
              ) : (
                <Image
                  src={item.icon}
                  width={20}
                  height={20}
                  alt={item.name}
                />
              )}
            </a>
          ))}
        </div>
      </div>
      <div
        className="
          w-full lg:w-[511px] 
          h-auto lg:h-full 
          flex justify-center lg:justify-center 
          items-start lg:items-end 
          relative z-10
        "
      >
        <div
          className="
            w-full sm:w-[80%] md:w-[70%] lg:w-full 
            flex flex-wrap justify-center lg:justify-between 
            gap-8 lg:gap-0
          "
        >
          {navItems.map((section, i) => (
            <div key={i} className="text-center lg:text-left">
              <h3 className="font-bold text-lg">{section.title}</h3>
              <ul className="mt-2 space-y-1">
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
    </div>
  );
}
