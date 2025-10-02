import React from 'react'
import infrafund from "@/../public/svg/infrafund.svg";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import telegram from "@/../public/svg/Telegram.svg";
import X from "@/../public/svg/X.svg";
import Link from "next/link";
export default function FooterDefault() {
    const socials = [
        {
            name: "linkedin",
            icon: Linkedin,
            type: "component",
            link: "https://www.linkedin.com/company/infrafund-net/",
        },
        {
            name: "X",
            icon: X,
            type: "image",
            link: "https://x.com/InfraFund_net",
        },
        {
            name: "Telegram",
            icon: telegram,
            type: "image",
            link: "https://t.me/InfraFund",
        },
        {
            name: "Instagram",
            icon: Instagram,
            type: "component",
            link: "https://www.instagram.com/infrafund?igsh=eHhuMWtxeTZsanR2&utm_source=qr",
        },
    ];
    const navItems = [
        {
            title: "Platform",
            items: [
                { name: "Projects", link: "/platform/overview" },
                { name: "Investors", link: "/platform/features" },
                { name: "Builders", link: "/platform/pricing" },
            ],
        },
        {
            title: "Company",
            items: [
                { name: "About Us", link: "/company/about" },
                { name: "Careers", link: "/company/careers" },
                { name: "Contact", link: "/company/contact" },
            ],
        },
        {
            title: "Learn",
            items: [
                { name: "Blog", link: "/company/about" },
                { name: "FAQ", link: "/company/careers" },
                { name: "How InfraFund Works", link: "/company/contact" },
                { name: "Terms & Conditions", link: "/company/contact" },
                { name: "Privacy Policy", link: "/company/contact" },
            ],
        },
    ];

    return (
        <div className='w-full h-[656px] flex flex-col justify-center items-center gap-8 relative  px-[90px]'>
            <div className='w-full  justify-between items-center flex '>
                <div className='flex flex-col gap-6'>
                    <div className="w-[265px] h-fit flex flex-col gap-4 text-base font-normal text-[#D6D6D6]">
                        <Image src={infrafund} width={261} height={63} alt="InfraFund" />
                        <span>📍 London, UK</span>
                        <span>UK Residents - Risk Warning</span>
                        <div className="w-fit h-fit flex gap-2.5 justify-center items-center">
                            {socials.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 border border-[#0A1F4A] rounded-[5px] flex justify-center items-center 
             transition-all duration-300 ease-in-out 
             hover:border-[#24FF8E] hover:bg-[#24FF8E]/10 hover:scale-110"
                                >
                                    {item.type === "component" ? (
                                        <item.icon size={20} className="text-[#D6D6D6]" />
                                    ) : (
                                        <Image src={item.icon} width={20} height={20} alt={item.name} />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="w-[511px] h-[179px]  flex justify-between items-start">
                    {navItems.map((section, i) => (
                        <div key={i}>
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
            <p>
                nfraNetZero LTD is authorised and regulated by the Financial Conduct Authority in the UK. Please be aware that investing in tokenized renewable energy assets through our platform <br /> (www.InfraFund.net) is a high-risk activity where your capital is at risk, and you may lose your entire investment. These investments are not covered by the Financial Services <br /> Compensation Scheme (FSCS). By creating an account, you accept our Terms of Service and Privacy Policy. We do not provide any investment <br />, tax, or legal advice; any investment decisions are solely your responsibility. All personal data is handled in strict compliance with UK GDPR. We strongly advise you to consult with independent professional advisors <br /> before making any investment.
            </p>
            <div className='absolute z-10 w-full h-[101px] text-center bottom-0 border-t-[1px] border-[#FFFFFF1A] flex justify-center items-center'>
                <span className='text-base font-normal text-[#C1C7CB]'>© 2025 InfraNetZero LTD | All rights <br /> reserved.</span>
            </div>
        </div>
    )
}
