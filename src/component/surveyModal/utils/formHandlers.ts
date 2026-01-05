/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPhoneNumber } from './formatNumber';

export const createPersonalChangeHandler = <
  TPersonal extends Record<string, any>,
  TOrg extends Record<string, any>,
>(
  setPersonalForm: React.Dispatch<React.SetStateAction<TPersonal>>,
  setOrgForm: React.Dispatch<React.SetStateAction<TOrg>>,
  errors: Record<string, string>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  return (key: string, value: string, isOrg = false) => {
    if (key === 'phoneNumber') {
      value = formatPhoneNumber(value);
    }
    if (isOrg) setOrgForm((prev) => ({ ...prev, [key]: value }) as any);
    else setPersonalForm((prev) => ({ ...prev, [key]: value }) as any);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };
};

// ts-ignore:@typescript-eslint/no-explicit-any
export const createAccountChangeHandler = <T extends Record<string, any>>(
  setAccountForm: React.Dispatch<React.SetStateAction<T>>,
  errors: Record<string, string>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  return (key: string, value: string | boolean) => {
    setAccountForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };
};
