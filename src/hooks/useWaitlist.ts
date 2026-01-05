import apiService from '@/services/apiService';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface WaitlistPayload {
  email: string;
  recaptchaToken: string;
}

interface WaitlistResponse {
  success: boolean;
  message?: string;
}

export const useWaitlist = (): UseMutationResult<
  WaitlistResponse,
  Error,
  WaitlistPayload
> => {
  return useMutation({
    mutationFn: async ({ email, recaptchaToken }: WaitlistPayload) => {
      return apiService.post<WaitlistResponse>(
        '/waitlist',
        { email },
        { 'X-Captcha-Token': recaptchaToken }
      );
    },
  });
};
