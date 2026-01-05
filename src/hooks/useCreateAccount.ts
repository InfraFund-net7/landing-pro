import apiService from '@/services/apiService';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface CreateAccountPayload {
  email: string;
  company_name?: string;
  country_id: number;
  first_name: string;
  last_name: string;
}

export interface InputAccountPayload extends CreateAccountPayload {
  recaptchaToken: string;
  isIndividual: boolean;
}

interface CreateAccountResponse {
  success: boolean;
  message?: string;
}

const buildAccountPayload = (data: CreateAccountPayload) => {
  const basePayload = {
    email: data.email,
    country_id: data.country_id,
    first_name: data.first_name,
    last_name: data.last_name,
  };

  return basePayload;
};

const buildAccountPayloadWithCompany = (
  data: CreateAccountPayload & { company_name: string }
) => {
  return {
    ...buildAccountPayload(data),
    company_name: data.company_name,
  };
};

export const useCreateAccount = (): UseMutationResult<
  CreateAccountResponse,
  Error,
  InputAccountPayload
> => {
  return useMutation({
    mutationFn: async ({
      email,
      company_name,
      country_id,
      first_name,
      last_name,
      recaptchaToken,
      isIndividual,
    }: InputAccountPayload) => {
      const baseData = {
        email,
        country_id,
        first_name,
        last_name,
      };

      const payload = isIndividual
        ? buildAccountPayload(baseData)
        : buildAccountPayloadWithCompany({
            ...baseData,
            company_name: company_name!,
          });

      return apiService.post<CreateAccountResponse>(
        isIndividual
          ? 'non-resident-waitlist/individual'
          : 'non-resident-waitlist/company',
        payload,
        { 'X-Captcha-Token': recaptchaToken }
      );
    },
  });
};
