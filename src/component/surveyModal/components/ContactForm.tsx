import { FormInput } from '../../ui/form-input';

interface ContactFormProps {
  userType: 'individual' | 'organization' | null;
  form: {
    country: string;
    email: string;
    firstName?: string;
    lastName?: string;
    contactFullName?: string;
    companyName?: string;
  };
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
}

export default function ContactForm({
  userType,
  form,
  onChange,
  onSubmit,
}: ContactFormProps) {
  const isIndividual = userType === 'individual';
  const ContactFormFields = isIndividual
    ? {
        firstName: form.firstName || '',
        lastName: form.lastName || '',
        country: form.country || '',
        email: form.email || '',
      }
    : {
        contactFullName: form.contactFullName || '',
        companyName: form.companyName || '',
        country: form.country || '',
        email: form.email || '',
      };

  const isFormValid = Object.values(ContactFormFields).every(
    (val) => val.trim() !== ''
  );

  const disclaimerText = isIndividual
    ? "Unfortunately, at this point in time, we cannot accept investments from people who are not UK residents or don't have a valid UK national insurance number."
    : 'Unfortunately, at this point in time, we cannot accept investments from organizations who are not in the UK.';

  return (
    <div className="flex flex-col gap-6 sm:gap-12 justify-center items-start">
      <span className="text-xl sm:text-2xl text-white font-semibold block">
        Contact Form
      </span>
      <div className="flex flex-col gap-2 sm:gap-4 text-left">
        <p className="text-white text-xs sm:text-sm">{disclaimerText}</p>
        <p className="text-white text-xs sm:text-sm font-bold">
          If you would like to be notified when we are able to accept
          investments from your country, complete the form below.
        </p>
      </div>
      <div className="w-full text-left flex flex-col gap-2 sm:gap-3">
        {isIndividual ? (
          <>
            <FormInput
              label="First Name"
              placeholder="First Name"
              type="text"
              value={form.firstName || ''}
              onChange={(e) => onChange('firstName', e.target.value)}
            />
            <FormInput
              label="Last Name"
              placeholder="Last Name"
              type="text"
              value={form.lastName || ''}
              onChange={(e) => onChange('lastName', e.target.value)}
            />
          </>
        ) : (
          <>
            <FormInput
              label="Contact Full Name"
              placeholder="Contact Full Name"
              type="text"
              value={form.contactFullName || ''}
              onChange={(e) => onChange('contactFullName', e.target.value)}
            />
            <FormInput
              label="Company Name"
              placeholder="Company Name"
              type="text"
              value={form.companyName || ''}
              onChange={(e) => onChange('companyName', e.target.value)}
            />
          </>
        )}
        <FormInput
          label="Country"
          placeholder="Country"
          value={form.country}
          onChange={(e) => onChange('country', e.target.value)}
        />
        <FormInput
          label={isIndividual ? 'Email' : 'Work Email'}
          placeholder={isIndividual ? 'Email' : 'Work Email'}
          type="email"
          value={form.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>
      <div className="w-full h-fit flex justify-center items-center">
        <button
          className={`w-full max-w-[237px] py-2.5 sm:py-3 rounded-md transition-colors ${
            isFormValid
              ? 'bg-primary text-black cursor-pointer'
              : 'bg-gray-300 text-black cursor-not-allowed'
          }`}
          disabled={!isFormValid}
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
