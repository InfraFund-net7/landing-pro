import { getRecaptchaToken } from '@/utils/recaptcha';

type CaptchaAction = 'waitlist' | 'non_resident' | 'signup' | 'contact';

export const withCaptcha = async (
  action: CaptchaAction
): Promise<{ 'X-Captcha-Token': string }> => {
  const token = await getRecaptchaToken(action);
  if (!token || typeof token !== 'string' || !token.trim()) {
    throw new Error('reCAPTCHA token is missing or invalid');
  }
  return {
    'X-Captcha-Token': token,
  };
};
