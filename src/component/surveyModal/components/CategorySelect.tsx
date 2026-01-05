import contract from '@/../public/svg/Contract.svg';
import dao from '@/../public/svg/Dao.svg';
import invest from '@/../public/svg/Invest-flow.svg';
import fund from '@/../public/svg/Raise-Fund.svg';
import Image from 'next/image';
import { CustomButton } from '../../ui/custom-button';

interface CategorySelectProps {
  selectedAction: string;
  selectedItem: string | null;
  onActionSelect: (action: string) => void;
  onContinue: () => void;
}

export default function CategorySelect({
  selectedAction,
  selectedItem,
  onActionSelect,
  onContinue,
}: CategorySelectProps) {
  const survey = [
    {
      roles: ['client'],
      name: 'Raise Funds (Project Developer)',
      icon: fund,
      description:
        'I am a project owner or developer seeking capital for a renewable energy infrastructure or NetZero project.',
    },
    {
      roles: ['investor'],
      name: 'Invest in Assets (Investor)',
      icon: invest,
      description:
        'I want to discover, fund, and track high-impact, transparent green project.',
    },
    {
      roles: ['contractor'],
      name: 'Manage Construction (Contractor)',
      icon: contract,
      description:
        'I am an EPC or General Contractor to build a project and will be reporting on milestone progress.',
    },
    {
      roles: ['dao'],
      name: 'Join the DAO (Governance Member)',
      icon: dao,
      description:
        "I want to participate in protocol governance, vote on which projects get listed, and help manage the platform's treasury.",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2 justify-center items-start">
      <span className="text-sm sm:text-base text-white block">
        Let&apos;s Get Started
      </span>
      <span className="text-xl sm:text-2xl text-white font-semibold">
        What brings you to InfraFund?
      </span>
      <div className="w-full flex flex-col gap-3 sm:gap-4">
        {survey.map((item, index) => (
          <div
            key={index}
            onClick={() => onActionSelect(item.roles[0])}
            className={`w-full h-fit py-3 sm:py-4 px-3 sm:px-6 flex justify-start items-center gap-3 sm:gap-4 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedItem === item.roles[0]
                ? 'bg-[#343C52] border border-[#777777] backdrop-blur-[70px]'
                : 'bg-[#131C2F] hover:bg-[#1E283D] border border-transparent'
            }`}
          >
            <Image
              src={item.icon}
              width={40}
              height={40}
              alt={item.name}
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div className="flex flex-col gap-1 sm:gap-2 justify-center text-left">
              <span className="text-base sm:text-lg text-white font-medium">
                {item.name}
              </span>
              <span className="text-xs sm:text-xs text-[#A3A3A3] font-normal">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
      <CustomButton
        variant="filled"
        disabled={!selectedAction}
        onClick={() => selectedAction && onContinue()}
        className="w-full mt-2"
      >
        Continue
      </CustomButton>
    </div>
  );
}
