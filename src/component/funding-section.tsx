import { Zap, CircleDollarSign, ChartSpline, HandHeart } from 'lucide-react';
import React from 'react';
import loan from '@/../public/image/loan.jpg';
import charity from '@/../public/image/charity.jpg';
import PreSale from '@/../public/image/pre-sale.jpg';
import SecurityBase from '@/../public/image/security-base.jpg';

type FundingIconKey = 'zap' | 'chart' | 'dollar' | 'heart';

type FundingItem = {
  background: string;
  title: string;
  iconKey?: FundingIconKey;
  description: string;
};

type FundingSectionProps = {
  title?: string;
  items?: FundingItem[];
};

const iconMap = {
  zap: Zap,
  chart: ChartSpline,
  dollar: CircleDollarSign,
  heart: HandHeart,
};

const fallbackItems: FundingItem[] = [
    {
      background: PreSale.src,
      title: 'Pre-Sale of Energy',
      iconKey: 'zap',
      description:
        'Our flagship model. Fund the development of new renewable energy projects by pre-purchasing their future energy output at a discounted rate. A direct, impactful way to accelerate the NetZero transition.',
    },
    {
      background: SecurityBase.src,
      title: 'Equity-Based',
      iconKey: 'chart',
      description:
        'For accredited investors. Purchase digital tokens that represent a direct equity or debt stake in a project, offering traditional financial returns.',
    },
    {
      background: loan.src,
      title: 'Loan-Based',
      iconKey: 'dollar',
      description:
        'Provide debt financing to projects and earn a fixed return as the loan is repaid. A stable, lower-risk option.',
    },
    {
      background: charity.src,
      title: 'Charity-Based',
      iconKey: 'heart',
      description:
        'Directly support high-impact, non-profit environmental projects where the primary return is a measurable contribution to our planet.',
    },
  ];

export default function FundingSection({
  title = 'Flexible Funding for a Diverse Market',
  items = fallbackItems,
}: FundingSectionProps) {
  return (
    <div className="flex flex-col gap-16 w-full h-fit items-center mb-10">
      <h2 className="text-white font-bold text-4xl md:text-5xl text-center px-4">
        {title}
      </h2>

      <div className="hidden md:flex w-full h-[500px]">
        {items.map((item, index) => {
          const Icon = iconMap[item.iconKey ?? 'zap'];
          return (
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
              backgroundImage: item.background
                ? `url(${item.background})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition:
                item.title === 'Loan-Based' ? 'right' : 'center',
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
            <div className="relative z-0 flex flex-col justify-between  gap-6 px-6 h-full">
              <div className="flex flex-col gap-2 ">
                <Icon className="text-white" size={32} />
                <h3 className="text-white text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
              <div className="w-full h-[100px] flex justify-start items-start ">
                <p
                  className="text-white text-sm"
                  style={{ hyphens: 'auto', textAlign: 'justify' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="flex md:hidden flex-col gap-6 w-full px-4">
        {items.map((item, index) => {
          const Icon = iconMap[item.iconKey ?? 'zap'];
          return (
          <div
            key={index}
            className="
              relative 
              w-full min-h-[300px] 
              rounded-2xl overflow-hidden 
              flex flex-col justify-between p-6
              group
            "
            style={{
              backgroundImage: item.background
                ? `url(${item.background})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Icon className="text-white" size={28} />
                <h3 className="text-white text-lg font-semibold">
                  {item.title}
                </h3>
              </div>
              <p
                className="text-white text-sm leading-relaxed"
                style={{ hyphens: 'auto', textAlign: 'justify' }}
              >
                {item.description}
              </p>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
