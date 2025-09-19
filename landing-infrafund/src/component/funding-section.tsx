import { Zap, CircleDollarSign, ChartSpline, HandHeart } from "lucide-react";
import React from "react";
import loan from "@/../public/image/loan.jpg";
import charity from "@/../public/image/charity.jpg";
import PreSale from "@/../public/image/pre-sale.jpg";
import SecurityBase from "@/../public/image/security-base.jpg";
export default function FundingSection() {
  const fundingitems = [
    {
      background: PreSale,
      title: "Pre-Sale of Energy",
      icon: Zap,
      description:
        "Our flagship model. Fund the development of new renewable energy projects by pre-purchasing their future energy output at a discounted rate. A direct, impactful way to accelerate the NetZero transition.",
    },
    {
      background: SecurityBase,
      title: "Security-Based",
      icon: ChartSpline,
      description:
        "For accredited investors. Purchase digital tokens that represent a direct equity or debt stake in a project, offering traditional financial returns.",
    },
    {
      background: loan,
      title: "Loan-Based",
      icon: CircleDollarSign,
      description:
        "Provide debt financing to projects and earn a fixed return as the loan is repaid. A stable, lower-risk option.",
    },
    {
      background: charity,
      title: "Charity-Based",
      icon: HandHeart,
      description:
        "Directly support high-impact, non-profit environmental projects where the primary return is a measurable contribution to our planet.",
    },
  ];
  return (
    <div className="flex flex-col gap-16 w-full h-fit items-center">
      <h2 className="text-white font-bold text-5xl">
        Flexible Funding for a Diverse Market
      </h2>
      <div className="w-full h-[720px] bg-green-500 flex">
        {fundingitems.map((item, index) => (
          <div
            key={index}
            className="
    relative 
    w-1/4 h-full 
    border-r border-[#7D7878] 
    flex flex-col justify-between items-center py-12
    overflow-hidden
    group
  "
            style={{
              backgroundImage: `url(${item.background.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="
      absolute inset-0 
      bg-black/70 
      transition-all duration-300 
      group-hover:bg-black/40
    "
            />
            <div className="relative z-0 flex flex-col justify-between gap-6 px-6 h-full">
              <div className="flex flex-col gap-2">
                <item.icon className="text-white" size={32} />
                <h3 className="text-white text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
