import { ContactFormData } from '@/schema/contactForm.schema';
import apiService from '@/services/apiService';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface ContactPayload extends ContactFormData {
  recaptchaToken: string;
}

interface ContactResponse {
  success: boolean;
  message?: string;
}

export const useContact = (): UseMutationResult<
  ContactResponse,
  Error,
  ContactPayload
> => {
  return useMutation({
    mutationFn: async ({
      email,
      first_name,
      last_name,
      message,
      subject,
      recaptchaToken,
    }: ContactPayload) => {
      return apiService.post<ContactResponse>(
        '/contact-forms',
        {
          email,
          first_name,
          last_name,
          message,
          subject,
        },
        { 'X-Captcha-Token': recaptchaToken }
      );
    },
  });
};
