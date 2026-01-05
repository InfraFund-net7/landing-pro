import Individual from '@/../public/svg/Individual.svg';
import organization from '@/../public/svg/organization.svg';
import Image from 'next/image';
import { CustomButton } from '../../ui/custom-button';

interface OrganisationTypeProps {
  userType: 'individual' | 'organization' | null;
  onTypeSelect: (type: 'individual' | 'organization') => void;
  onContinue: () => void;
}

export default function OrganisationType({
  userType,
  onTypeSelect,
  onContinue,
}: OrganisationTypeProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center py-1 sm:py-2">
      <div className="flex flex-col gap-6 sm:gap-12 mb-6 sm:mb-12 w-full max-w-3xl">
        <span className="text-xl sm:text-2xl text-white font-semibold text-center">
          Are you an Individual or Organization?
        </span>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
          <div
            className={`rounded-xl p-4 sm:p-5 flex flex-col h-[200px] sm:h-[242px] items-center justify-center cursor-pointer transition-colors duration-200 ${
              userType === 'individual'
                ? 'bg-[#343C52] border border-[#777777] backdrop-blur-[70px]'
                : 'bg-[#131C2F] hover:bg-gray-700'
            }`}
            onClick={() => onTypeSelect('individual')}
          >
            <Image
              src={Individual}
              width={48}
              height={48}
              alt="Individual"
              className="mb-3 sm:mb-4"
            />
            <span className="text-white font-medium text-center text-sm sm:text-base">
              Individual
            </span>
          </div>
          <div
            className={`rounded-xl p-4 sm:p-5 flex flex-col h-[200px] sm:h-[242px] items-center justify-center cursor-pointer transition-colors duration-200 ${
              userType === 'organization'
                ? 'bg-[#343C52] border border-[#777777] backdrop-blur-[70px]'
                : 'bg-[#131C2F] hover:bg-gray-700'
            }`}
            onClick={() => onTypeSelect('organization')}
          >
            <Image
              src={organization}
              width={48}
              height={48}
              alt="Organization"
              className="mb-3 sm:mb-4"
            />
            <span className="text-white font-medium text-center text-sm sm:text-base">
              Organization
            </span>
          </div>
        </div>
      </div>
      <CustomButton
        variant="filled"
        className="w-full py-3 sm:py-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50"
        disabled={!userType}
        onClick={() => userType && onContinue()}
      >
        Continue
      </CustomButton>
    </div>
  );
}
