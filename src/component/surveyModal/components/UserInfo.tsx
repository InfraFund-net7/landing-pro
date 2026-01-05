import { FormInput } from '../../ui/form-input';

interface UserInfoProps {
  userType: 'individual' | 'organization' | null;
  personalForm: { firstName: string; lastName: string; phoneNumber: string };
  orgForm: {
    contactFullName: string;
    companyName: string;
    phoneNumber: string;
  };
  errors: Record<string, string>;
  isValid: boolean;
  onBack: () => void;
  onContinue: () => void;
  onChange: (key: string, value: string, isOrg?: boolean) => void;
}

export default function UserInfo({
  userType,
  personalForm,
  orgForm,
  errors,
  isValid,
  onBack,
  onContinue,
  onChange,
}: UserInfoProps) {
  return (
    <div className="w-full text-left flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <span className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6 block">
          Great! Let&apos;s get started.
        </span>
        <div className="space-y-3 sm:space-y-4 px-0 sm:px-1">
          {userType === 'individual' ? (
            <>
              <FormInput
                label="First Name"
                placeholder="First Name"
                type="text"
                value={personalForm.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
                error={errors.firstName}
              />
              <FormInput
                label="Last Name"
                placeholder="Last Name"
                type="text"
                value={personalForm.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
                error={errors.lastName}
              />
              <FormInput
                label="Phone Number"
                placeholder="+44 (XXX) XXX-XXXX"
                type="tel"
                value={personalForm.phoneNumber}
                onChange={(e) => onChange('phoneNumber', e.target.value)}
                error={errors.phoneNumber}
              />
            </>
          ) : (
            <>
              <FormInput
                label="Contact Full Name"
                placeholder="Contact Full Name"
                type="text"
                value={orgForm.contactFullName}
                onChange={(e) =>
                  onChange('contactFullName', e.target.value, true)
                }
                error={errors.contactFullName}
              />
              <FormInput
                label="Company Name"
                placeholder="Company Name"
                type="text"
                value={orgForm.companyName}
                onChange={(e) => onChange('companyName', e.target.value, true)}
                error={errors.companyName}
              />
              <FormInput
                label="Phone Number"
                placeholder="+44 (XXX) XXX-XXXX"
                type="tel"
                value={orgForm.phoneNumber}
                onChange={(e) => onChange('phoneNumber', e.target.value, true)}
                error={errors.phoneNumber}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t border-[#2B3146]">
        <button
          className="w-full sm:w-1/2 py-2.5 sm:py-3 bg-[#1C2332] text-primary rounded-md transition-colors cursor-pointer"
          onClick={onBack}
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!isValid}
          className={`w-full sm:w-1/2 py-2.5 sm:py-3 rounded-md cursor-pointer transition-colors ${
            isValid
              ? 'bg-primary text-black hover:bg-green-500'
              : 'bg-[#C7CAD5] text-black opacity-80 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
