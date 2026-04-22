'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import fund from '@/../public/svg/Raise-Fund.svg';
import contract from '@/../public/svg/Contract.svg';
import dao from '@/../public/svg/Dao.svg';
import invest from '@/../public/svg/Invest-flow.svg';
import infafund from '@/../public/svg/infrafund.svg';
import Individual from '@/../public/svg/Individual.svg';
import organization from '@/../public/svg/organization.svg';
import { Modal } from './ui/modal';
import { CustomButton } from './ui/custom-button';
import { Check } from 'lucide-react';
import { useAccount, useModal } from '@particle-network/connectkit';
import { FormInput } from './ui/form-input';
import { individualStep5Schema, orgStep5Schema } from '@/schema/survey.schema';
import apiService from '@/services/apiService';
import { useFetchLocations } from '@/hooks/useFetchLocations';
import { useLocationStore } from '@/stores/locationStore';
import { withCaptcha } from '@/lib/apiCaptcha';
import { isParticleConfigured } from '@/lib/particle-config';
import { Dropdown } from './ui/dropdown';
import { getDashLoginUrl } from '@/utils/dash-login-url';
import {
  clearParticleDashRedirectIntent,
  markParticleDashRedirectIntent,
  peekParticleDashRedirectIntent,
} from '@/utils/particle-dash-redirect-intent';
import { ApiError } from '@/utils/interceptors.utils';

type SurveyData = {
  role: string;
  type: 'individual' | 'organization';
  confirm_tos: boolean;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email: string;
  contact_fullname?: string;
  company_name?: string;
};

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface SurveyOnlyFormProps {
  onSuccess?: (data: SurveyData) => void;
  onError?: (error: Error) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  initialRole?: string;
}

type Step4Payload = {
  country_id: number | null;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
};

export default function SurveyOnlyForm({
  onSuccess,
  onError,
  isModalOpen,
  setIsModalOpen,
  initialRole,
}: SurveyOnlyFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedAction, setSelectedAction] = useState('');
  const [userType, setUserType] = useState<
    'individual' | 'organization' | null
  >(null);
  const [confirmations, setConfirmations] = useState({
    ukResident: true,
    niNumber: true,
    over18: true,
  });
  const [orgConfirmations, setOrgConfirmations] = useState({
    ukBased: true,
    companyHouse: true,
    active: true,
  });
  const [individualErrors, setIndividualErrors] = useState<
    Record<keyof typeof confirmations, string | null>
  >({
    ukResident: null,
    niNumber: null,
    over18: null,
  });
  const [orgErrors, setOrgErrors] = useState<
    Record<'ukBased' | 'companyHouse' | 'active', string | null>
  >({
    ukBased: null,
    companyHouse: null,
    active: null,
  });
  const [step4Form, setStep4Form] = useState({
    countryId: null as number | null,
    email: '',
    firstName: '',
    lastName: '',
    contactFullName: '',
    companyName: '',
  });
  const [personalForm, setPersonalForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [orgForm, setOrgForm] = useState({
    contactFullName: '',
    companyName: '',
    phoneNumber: '',
  });
  const [accountForm, setAccountForm] = useState({
    email: '',
    termsAgreed: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [, setSubmitSuccess] = useState(false);
  const [step4Success, setStep4Success] = useState(false);
  const [step4Message, setStep4Message] = useState<string | null>(null);
  const [step4MessageType, setStep4MessageType] = useState<'error' | 'success'>(
    'error'
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [openParticleLogin, setOpenParticleLogin] = useState<
    (() => void) | null
  >(null);
  const surveyDataRef = useRef<SurveyData | null>(null);
  const countries = useLocationStore((state) => state.countries);
  useFetchLocations();
  const formatPhoneNumber = (value: string): string => {
    let cleaned = value.replace(/[^+\d]/g, '');
    if (!cleaned.startsWith('+44')) {
      if (cleaned.startsWith('44')) {
        cleaned = '+' + cleaned;
      } else if (cleaned.startsWith('+')) {
        cleaned = '+44' + cleaned.slice(1);
      } else {
        cleaned = '+44' + cleaned;
      }
    }
    const digits = cleaned.slice(3);
    const len = digits.length;
    let formatted = '+44 ';
    if (len === 0) return formatted;
    if (len <= 3) {
      formatted += `(${digits}`;
    } else {
      formatted += `(${digits.slice(0, 3)})`;
      if (len > 3) {
        const part2 = digits.slice(3, 6);
        if (part2) formatted += ` ${part2}`;
      }
      if (len > 6) {
        const part3 = digits.slice(6, 10);
        if (part3) formatted += `-${part3}`;
      }
    }
    return formatted;
  };

  const getNonResidentEndpoint = () => {
    if (userType === 'individual') {
      return '/non-resident/individual';
    }

    return '/non-resident/company';
  };
  const submitStep4 = async () => {
    const endpoint = getNonResidentEndpoint();
    const fullName = step4Form.contactFullName?.trim() ?? '';
    const spaceIndex = fullName.indexOf(' ');
    const derivedFirstName =
      spaceIndex !== -1 ? fullName.slice(0, spaceIndex) : fullName;
    const derivedLastName =
      spaceIndex !== -1 ? fullName.slice(spaceIndex + 1) : '';

    const payload: Step4Payload =
      userType === 'organization'
        ? {
            country_id: step4Form.countryId,
            email: step4Form.email.trim().toLowerCase(),
            first_name: derivedFirstName,
            last_name: derivedLastName,
            company_name: step4Form.companyName?.trim(),
          }
        : {
            country_id: step4Form.countryId,
            email: step4Form.email.trim().toLowerCase(),
            first_name: step4Form.firstName?.trim(),
            last_name: step4Form.lastName?.trim(),
          };

    try {
      setSubmitting(true);
      setStep4Message(null);
      await apiService.post(
        endpoint,
        payload,
        await withCaptcha('non_resident')
      );

      setStep4Form({
        countryId: null,
        email: '',
        firstName: '',
        lastName: '',
        contactFullName: '',
        companyName: '',
      });
      setStep4Success(true);
    } catch (err) {
      console.error('submitStep4 error:', err);
      if (err instanceof ApiError && err.status === 409) {
        setStep4MessageType('error');
        setStep4Message('This email is already on the wishlist.');
        return;
      }

      setStep4MessageType('error');
      setStep4Message(
        err instanceof ApiError
          ? err.detail
          : err instanceof Error
            ? err.message
            : 'Request failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    if (isModalOpen && initialRole && currentStep === 1) {
      setSelectedAction(initialRole);
      setSelectedItem(initialRole);
      setCurrentStep(2);
    }
  }, [isModalOpen, initialRole, currentStep]);

  useEffect(() => {
    if (!isModalOpen) {
      setCurrentStep(1);
      setSelectedAction('');
      setSelectedItem(null);
      setUserType(null);
      setConfirmations({
        ukResident: true,
        niNumber: true,
        over18: true,
      });
      setOrgConfirmations({
        ukBased: true,
        companyHouse: true,
        active: true,
      });
      setIndividualErrors({
        ukResident: null,
        niNumber: null,
        over18: null,
      });
      setOrgErrors({
        ukBased: null,
        active: null,
        companyHouse: null,
      });
      setPersonalForm({
        firstName: '',
        lastName: '',
        phoneNumber: '',
      });
      setOrgForm({
        contactFullName: '',
        companyName: '',
        phoneNumber: '',
      });
      setAccountForm({
        email: '',
        termsAgreed: false,
      });
      setErrors({});
      setSubmitting(false);
      setSubmitSuccess(false);
      setStep4Success(false);
      setStep4Message(null);
      setStep4MessageType('error');
      surveyDataRef.current = null;
    }
  }, [isModalOpen]);

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

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
    setSelectedItem(action);
  };

  const handleTypeSelect = (type: 'individual' | 'organization') => {
    setUserType(type);
    setStep4Form({
      countryId: null,
      email: '',
      firstName: '',
      lastName: '',
      contactFullName: '',
      companyName: '',
    });
  };

  const handleIndividualConfirm = (
    key: keyof typeof confirmations,
    checked: boolean
  ) => {
    setConfirmations((prev) => {
      const newConf = { ...prev, [key]: checked };
      return newConf;
    });
    if (!checked) {
      const errorMsg =
        key === 'ukResident'
          ? 'We are currently only accepting investments from UK residents.'
          : key === 'niNumber'
            ? 'A valid UK national insurance number is required.'
            : 'We do not provide services to individuals under 18 years old.';
      setIndividualErrors((prev) => ({ ...prev, [key]: errorMsg }));
    } else {
      setIndividualErrors((prev) => ({ ...prev, [key]: null }));
    }
    if (
      currentStep === 3 &&
      (key === 'ukResident' || key === 'niNumber') &&
      !checked
    ) {
      setCurrentStep(4);
    }
  };

  const handleOrgConfirm = (
    key: keyof typeof orgConfirmations,
    checked: boolean
  ) => {
    setOrgConfirmations((prev) => {
      const newConf = { ...prev, [key]: checked };
      return newConf;
    });
    if (key === 'ukBased' || key === 'companyHouse' || key === 'active') {
      let errorMsg: string | null = null;
      if (!checked) {
        if (key === 'ukBased') {
          errorMsg =
            'We are currently only accepting investments from UK-based companies.';
        } else if (key === 'companyHouse') {
          errorMsg = 'A valid UK Companies House number is required.';
        } else if (key === 'active') {
          errorMsg =
            'We only accept applications from currently active companies.';
        }
      }
      setOrgErrors((prev) => ({ ...prev, [key]: errorMsg }));
    }
    if (!checked) {
      setCurrentStep(4);
      return;
    }
    const newConf = { ...orgConfirmations, [key]: true };
    if (newConf.ukBased && newConf.companyHouse && newConf.active) {
      setCurrentStep(3);
    }
  };

  const buildSurveyData = (): SurveyData => ({
    role: selectedAction,
    type: userType!,
    confirm_tos: accountForm.termsAgreed,
    email: accountForm.email,
    ...(userType === 'individual'
      ? {
          first_name: personalForm.firstName,
          last_name: personalForm.lastName,
          phone_number: personalForm.phoneNumber,
        }
      : {
          contact_fullname: orgForm.contactFullName,
          company_name: orgForm.companyName,
          phone_number: orgForm.phoneNumber,
        }),
  });

  const isStep5Valid = () => {
    if (userType === 'individual') {
      if (
        !personalForm.firstName.trim() ||
        !personalForm.lastName.trim() ||
        !personalForm.phoneNumber.trim()
      ) {
        return false;
      }
      if (!isPhoneNumberComplete(personalForm.phoneNumber)) {
        return false;
      }
      const result = individualStep5Schema.safeParse(personalForm);
      return result.success;
    } else {
      if (
        !orgForm.contactFullName.trim() ||
        !orgForm.companyName.trim() ||
        !orgForm.phoneNumber.trim()
      ) {
        return false;
      }
      if (!isPhoneNumberComplete(orgForm.phoneNumber)) {
        return false;
      }
      const result = orgStep5Schema.safeParse(orgForm);
      return result.success;
    }
  };

  const handleConfirmContinue = () => {
    if (userType === 'individual') {
      if (!confirmations.ukResident || !confirmations.niNumber) {
        setCurrentStep(4);
        return;
      }
      const newErrors: Record<keyof typeof confirmations, string | null> = {
        ukResident: confirmations.ukResident
          ? null
          : 'We are currently only accepting investments from UK residents.',
        niNumber: confirmations.niNumber
          ? null
          : 'A valid UK national insurance number is required.',
        over18: confirmations.over18
          ? null
          : 'We do not provide services to individuals under 18 years old.',
      };
      setIndividualErrors(newErrors);
      const hasErrors = Object.values(newErrors).some((e) => e !== null);
      if (hasErrors) return;
      setCurrentStep(5);
    } else {
      if (!orgConfirmations.ukBased) {
        setCurrentStep(4);
        return;
      }
      const newOrgErrors: Record<
        'ukBased' | 'companyHouse' | 'active',
        string | null
      > = {
        ukBased: orgConfirmations.ukBased
          ? null
          : 'We are currently only accepting investments from UK-based companies.',
        companyHouse: orgConfirmations.companyHouse
          ? null
          : 'A valid UK Companies House number is required.',
        active: orgConfirmations.active
          ? null
          : 'We only accept applications from currently active companies.',
      };
      setOrgErrors(newOrgErrors);
      const hasErrors = Object.values(newOrgErrors).some((e) => e !== null);
      if (hasErrors) return;
      setCurrentStep(5);
    }
  };

  const validateStep5 = () => {
    const result =
      userType === 'individual'
        ? individualStep5Schema.safeParse(personalForm)
        : orgStep5Schema.safeParse(orgForm);
    if (result.success) {
      setErrors({});
      return true;
    }
    const formatted: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      if (key) formatted[key] = issue.message;
    });
    setErrors(formatted);
    return false;
  };

  const handlePersonalChange = (key: string, value: string, isOrg = false) => {
    if (key === 'phoneNumber') {
      value = formatPhoneNumber(value);
    }
    if (isOrg) setOrgForm((prev) => ({ ...prev, [key]: value }));
    else setPersonalForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleAccountChange = (key: string, value: string | boolean) => {
    setAccountForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleSubmitSurvey = async () => {
    const data = buildSurveyData();
    surveyDataRef.current = data;
    setSubmitting(true);
    try {
      const captchaHeaders = await withCaptcha('signup');
      const captchaToken = captchaHeaders['X-Captcha-Token'];

      const payload = {
        role: data.role || '',
        type: data.type,
        confirm_tos: data.confirm_tos || false,
        first_name: data.type === 'individual' ? data.first_name || '' : '',
        last_name: data.type === 'individual' ? data.last_name || '' : '',
        phone_number: data.phone_number || '',
        email: data.email || '',
        contact_fullname:
          data.type === 'organization' ? data.contact_fullname || '' : '',
        company_name:
          data.type === 'organization' ? data.company_name || '' : '',
        country: 'uk',
        captcha_token: captchaToken,
      };

      const setDomainCookie = (
        name: string,
        value: Record<string, unknown>,
        minutes = 15
      ) => {
        const encoded = encodeURIComponent(JSON.stringify(value));
        const domainAttr = process.env.NEXT_PUBLIC_SURVEY_COOKIE_DOMAIN
          ? `; Domain=${process.env.NEXT_PUBLIC_SURVEY_COOKIE_DOMAIN}`
          : '';
        const secureAttr =
          typeof window !== 'undefined' && window.location.protocol === 'https:'
            ? '; Secure'
            : '';
        document.cookie = `${name}=${encoded}; Path=/${domainAttr}; Max-Age=${minutes * 60}; SameSite=Lax${secureAttr}`;
      };

      setDomainCookie('survey_data', payload, 15);
      setSubmitSuccess(true);
      onSuccess?.(data);
      if (isParticleConfigured && openParticleLogin) {
        openParticleLogin();
      } else {
        window.location.href = getDashLoginUrl();
      }
    } catch (err: unknown) {
      console.error('Client-side error:', err);
      const error = new Error('Failed to store the data. Please try again.');
      onError?.(error);
      alert(`Error:\n${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const isPhoneNumberComplete = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    if (!cleaned.startsWith('44')) return false;
    const digitsAfter44 = cleaned.slice(2);
    return digitsAfter44.length === 10;
  };

  const renderStep1 = () => (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2 justify-center items-start">
      <span className="text-sm sm:text-base text-white block">
        Let’s Get Started
      </span>
      <span className="text-xl sm:text-2xl text-white font-semibold">
        What brings you to InfraFund?
      </span>
      <div className="w-full flex flex-col gap-3 sm:gap-4">
        {survey.map((item, index) => (
          <div
            key={index}
            onClick={() => handleActionSelect(item.roles[0])}
            className={`w-full h-fit py-3 sm:py-4 px-3 sm:px-6 flex justify-start items-center gap-3 sm:gap-4 rounded-[12px] cursor-pointer transition-all duration-300 ${
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
        onClick={() => selectedAction && setCurrentStep(2)}
        className="w-full mt-2"
      >
        Continue
      </CustomButton>
    </div>
  );

  const renderStep2 = () => (
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
            onClick={() => handleTypeSelect('individual')}
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
            onClick={() => handleTypeSelect('organization')}
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
        onClick={() => userType && setCurrentStep(3)}
      >
        Continue
      </CustomButton>
    </div>
  );

  const renderStep3 = () => {
    const canContinue =
      userType === 'individual'
        ? confirmations.over18
        : orgConfirmations.ukBased && orgConfirmations.companyHouse;
    return (
      <div className="w-full space-y-4 sm:space-y-6 h-full flex flex-col justify-between py-1 sm:py-2">
        <div className="space-y-4">
          <span className="text-lg sm:text-xl md:text-2xl text-white font-semibold block text-center md:text-left">
            First, please confirm the following.
          </span>
          <div className="space-y-3 sm:space-y-4">
            {userType === 'individual' ? (
              <>
                <div className="space-y-1 text-left">
                  <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors w-full">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={confirmations.ukResident}
                        onChange={(e) =>
                          handleIndividualConfirm(
                            'ukResident',
                            e.target.checked
                          )
                        }
                      />
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                      </div>
                    </div>
                    <span className="text-white text-sm sm:text-base text-left flex-1">
                      I am currently a UK resident
                    </span>
                  </label>
                  {individualErrors.ukResident && (
                    <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
                      {individualErrors.ukResident}
                    </p>
                  )}
                </div>
                <div className="space-y-1 text-left">
                  <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors w-full">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={confirmations.niNumber}
                        onChange={(e) =>
                          handleIndividualConfirm('niNumber', e.target.checked)
                        }
                      />
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                      </div>
                    </div>
                    <span className="text-white text-sm sm:text-base text-left flex-1">
                      I have a valid UK national insurance number
                    </span>
                  </label>
                  {individualErrors.niNumber && (
                    <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
                      {individualErrors.niNumber}
                    </p>
                  )}
                </div>
                <div className="space-y-1 text-left">
                  <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors w-full">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={confirmations.over18}
                        onChange={(e) =>
                          handleIndividualConfirm('over18', e.target.checked)
                        }
                      />
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                      </div>
                    </div>
                    <span className="text-white text-sm sm:text-base text-left flex-1">
                      I am at least 18 years old
                    </span>
                  </label>
                  {individualErrors.over18 && (
                    <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
                      {individualErrors.over18}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1 text-left">
                  <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={orgConfirmations.ukBased}
                        onChange={(e) =>
                          handleOrgConfirm('ukBased', e.target.checked)
                        }
                      />
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                      </div>
                    </div>
                    <span className="text-white text-sm sm:text-base text-left flex-1">
                      Our company is based in UK.
                    </span>
                  </label>
                  {orgErrors.ukBased && (
                    <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
                      {orgErrors.ukBased}
                    </p>
                  )}
                </div>
                <div className="space-y-1 text-left">
                  <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={orgConfirmations.companyHouse}
                        onChange={(e) =>
                          handleOrgConfirm('companyHouse', e.target.checked)
                        }
                      />
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                      </div>
                    </div>
                    <span className="text-white text-sm sm:text-base text-left flex-1">
                      We have a valid UK company house number.
                    </span>
                  </label>
                  {orgErrors.companyHouse && (
                    <p className="text-red-400 text-xs sm:text-sm text-left animate-fadeIn pl-9 sm:pl-0">
                      {orgErrors.companyHouse}
                    </p>
                  )}
                </div>
                <div className="space-y-1 text-left">
                  <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={orgConfirmations.active}
                        onChange={(e) =>
                          handleOrgConfirm('active', e.target.checked)
                        }
                      />
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                      </div>
                    </div>
                    <span className="text-white text-sm sm:text-base text-left flex-1">
                      Our company is currently active.
                    </span>
                  </label>
                  {orgErrors.active && (
                    <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
                      {orgErrors.active}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="w-full sm:w-1/2 py-2.5 sm:py-3 bg-[#1C2332] text-primary rounded-md transition-colors cursor-pointer"
            onClick={() => setCurrentStep(2)}
          >
            Back
          </button>
          <CustomButton
            variant="filled"
            disabled={!canContinue}
            className={`w-full sm:w-1/2 py-2.5 sm:py-3 rounded-lg transition-colors ${
              canContinue
                ? 'bg-green-600 hover:bg-green-500 cursor-pointer'
                : 'bg-green-600/50 cursor-not-allowed'
            }`}
            onClick={canContinue ? handleConfirmContinue : undefined}
          >
            Continue
          </CustomButton>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    const isIndividual = userType === 'individual';
    const step4Fields = isIndividual
      ? {
          firstName: step4Form.firstName,
          lastName: step4Form.lastName,
          email: step4Form.email,
        }
      : {
          contactFullName: step4Form.contactFullName,
          companyName: step4Form.companyName,
          email: step4Form.email,
        };

    const isFormValid =
      Object.values(step4Fields).every(
        (val) => typeof val === 'string' && val.trim() !== ''
      ) && step4Form.countryId !== null;
    const disclaimerText = isIndividual
      ? "Unfortunately, at this point in time, we cannot accept investments from people who are not UK residents or don't have a valid UK national insurance number."
      : 'Unfortunately, at this point in time, we cannot accept investments from organizations who are not in the UK.';

    const handleStep4Change = (key: string, value: string) => {
      setStep4Form((prev) => ({ ...prev, [key]: value }));
      if (step4Message) setStep4Message(null);
    };

    if (step4Success) {
      return (
        <div className="flex flex-col gap-6 sm:gap-8 justify-center items-center text-center px-2 sm:px-6 py-4 max-w-lg mx-auto">
          <span className="text-xl sm:text-2xl text-white font-semibold">
            Thank you
          </span>
          <p className="text-white text-sm sm:text-base leading-relaxed">
            Thank you for your interest, you have been successfully added to our
            waitlist.
          </p>
          <button
            type="button"
            className="w-full max-w-[237px] py-2.5 sm:py-3 rounded-md bg-primary text-black hover:bg-green-500 transition-colors cursor-pointer"
            onClick={() => {
              setStep4Success(false);
              setIsModalOpen(false);
            }}
          >
            Close
          </button>
        </div>
      );
    }

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
                value={step4Form.firstName}
                onChange={(e) => handleStep4Change('firstName', e.target.value)}
              />
              <FormInput
                label="Last Name"
                placeholder="Last Name"
                type="text"
                value={step4Form.lastName}
                onChange={(e) => handleStep4Change('lastName', e.target.value)}
              />
            </>
          ) : (
            <>
              <FormInput
                label="Contact Full Name"
                placeholder="Contact Full Name"
                type="text"
                value={step4Form.contactFullName || ''}
                onChange={(e) =>
                  handleStep4Change('contactFullName', e.target.value)
                }
              />
              <FormInput
                label="Company Name"
                placeholder="Company Name"
                type="text"
                value={step4Form.companyName || ''}
                onChange={(e) =>
                  handleStep4Change('companyName', e.target.value)
                }
              />
            </>
          )}
          <Dropdown
            label="Select your country"
            options={countries.map((c) => ({
              key: c.ID.toString(),
              label: c.Name,
              value: c.ID.toString(),
            }))}
            value={step4Form.countryId?.toString() ?? ''}
            onChange={(value) =>
              setStep4Form((prev) => ({
                ...prev,
                countryId: Number(value),
              }))
            }
            placeholder="Choose a country"
          />

          <FormInput
            label={isIndividual ? 'Email' : 'Work Email'}
            placeholder={isIndividual ? 'Email' : 'Work Email'}
            type="email"
            value={step4Form.email}
            onChange={(e) => handleStep4Change('email', e.target.value)}
          />
        </div>
        <div className="w-full h-fit flex justify-center items-center">
          <button
            className={`w-full max-w-[237px] py-2.5 sm:py-3 rounded-md transition-colors ${
              isFormValid && !submitting
                ? 'bg-primary text-black cursor-pointer'
                : 'bg-gray-300 text-black cursor-not-allowed'
            }`}
            disabled={!isFormValid || submitting}
            onClick={submitStep4}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {step4Message && (
          <p
            className={`w-full text-center text-sm ${
              step4MessageType === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {step4Message}
          </p>
        )}
      </div>
    );
  };

  const renderStep5 = () => {
    const isValid = isStep5Valid();
    return (
      <div className="w-full text-left flex flex-col gap-4 sm:gap-6">
        <div>
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
                  onChange={(e) =>
                    handlePersonalChange('firstName', e.target.value)
                  }
                  error={errors.firstName}
                />
                <FormInput
                  label="Last Name"
                  placeholder="Last Name"
                  type="text"
                  value={personalForm.lastName}
                  onChange={(e) =>
                    handlePersonalChange('lastName', e.target.value)
                  }
                  error={errors.lastName}
                />
                <FormInput
                  label="Phone Number"
                  placeholder="+44 (XXX) XXX-XXXX"
                  type="tel"
                  value={personalForm.phoneNumber}
                  onChange={(e) =>
                    handlePersonalChange('phoneNumber', e.target.value)
                  }
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
                    handlePersonalChange(
                      'contactFullName',
                      e.target.value,
                      true
                    )
                  }
                  error={errors.contactFullName}
                />
                <FormInput
                  label="Company Name"
                  placeholder="Company Name"
                  type="text"
                  value={orgForm.companyName}
                  onChange={(e) =>
                    handlePersonalChange('companyName', e.target.value, true)
                  }
                  error={errors.companyName}
                />
                <FormInput
                  label="Phone Number"
                  placeholder="+44 (XXX) XXX-XXXX"
                  type="tel"
                  value={orgForm.phoneNumber}
                  onChange={(e) =>
                    handlePersonalChange('phoneNumber', e.target.value, true)
                  }
                  error={errors.phoneNumber}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t border-[#2B3146]">
          <button
            className="w-full sm:w-1/2 py-2.5 sm:py-3 bg-[#1C2332] text-primary rounded-md transition-colors cursor-pointer"
            onClick={() => setCurrentStep(3)}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (validateStep5()) {
                setCurrentStep(6);
              }
            }}
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
  };

  const renderStep6 = () => {
    const canSubmit =
      accountForm.email.trim() !== '' && accountForm.termsAgreed && !submitting;
    return (
      <div className="w-full text-left flex flex-col gap-4 sm:gap-6">
        <div>
          <span className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6 block">
            Let&apos;s create your account!
          </span>
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <FormInput
              label="Email"
              placeholder="Email"
              type="text"
              value={accountForm.email}
              onChange={(e) => handleAccountChange('email', e.target.value)}
            />
            <label className="flex items-start sm:items-center space-x-0 sm:space-x-3 space-y-2 sm:space-y-0 flex-col sm:flex-row cursor-pointer">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={accountForm.termsAgreed}
                  onChange={(e) =>
                    handleAccountChange('termsAgreed', e.target.checked)
                  }
                />
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    accountForm.termsAgreed ? 'bg-[#00FF87]' : 'bg-[#2B3146]'
                  }`}
                >
                  {accountForm.termsAgreed && (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  )}
                </div>
              </div>
              <span className="text-white text-xs sm:text-sm text-left flex-1">
                By creating an account, I agree to InfraFund’s{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-primary"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-primary"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="w-full sm:w-1/2 py-2.5 sm:py-3 bg-[#1C2332] text-primary rounded-md transition-colors cursor-pointer"
            onClick={() => setCurrentStep(5)}
          >
            Back
          </button>
          <button
            onClick={canSubmit ? handleSubmitSurvey : undefined}
            disabled={!canSubmit}
            className={`w-full sm:w-1/2 py-2.5 sm:py-3 rounded-md cursor-pointer transition-colors ${
              canSubmit
                ? 'bg-primary text-black hover:bg-green-500'
                : 'bg-[#C7CAD5] text-black opacity-80 cursor-not-allowed'
            }`}
          >
            {submitting ? 'Submitting...' : 'Continue'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        if (step4Success) {
          setStep4Success(false);
          setIsModalOpen(false);

          return;
        }
        if (currentStep === 4) {
          setCurrentStep(3);
        } else {
          setIsModalOpen(false);
        }
      }}
      showCloseButton={true}
      closeOnBackdropClick={false}
    >
      <div className="w-full flex flex-col items-center gap-4 sm:gap-6 px-2 sm:px-0">
        {isParticleConfigured && (
          <SurveyParticleAuthBridge onOpenReady={setOpenParticleLogin} />
        )}
        {currentStep !== 4 && (
          <Image
            priority
            src={infafund}
            alt="infrafund"
            width={262}
            height={64}
            className="mb-1 w-full max-w-[180px] sm:max-w-[262px] h-auto"
          />
        )}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}
      </div>
    </Modal>
  );
}

function SurveyParticleAuthBridge({
  onOpenReady,
}: {
  onOpenReady: (open: () => void) => void;
}) {
  const { setOpen, isOpen } = useModal();
  const account = useAccount();

  useEffect(() => {
    onOpenReady(() => () => {
      markParticleDashRedirectIntent();
      setOpen(true);
    });
  }, [onOpenReady, setOpen]);

  useEffect(() => {
    if (account.status !== 'connected') return;
    if (account.connector.walletConnectorType !== 'particleAuth') return;
    if (!peekParticleDashRedirectIntent()) return;
    clearParticleDashRedirectIntent();
    window.location.href = getDashLoginUrl();
  }, [account]);

  useEffect(() => {
    if (isOpen) return;
    if (account.status === 'connected') return;
    clearParticleDashRedirectIntent();
  }, [isOpen, account.status]);

  return null;
}
