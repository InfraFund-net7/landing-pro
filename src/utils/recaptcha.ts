'use client';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

function rejectRecaptcha(message: string): never {
  throw new Error(message);
}

export const getRecaptchaToken = async (
  action: string = 'default_action'
): Promise<string> => {
  if (typeof window === 'undefined') {
    rejectRecaptcha('reCAPTCHA is not available during server render.');
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  if (!siteKey) {
    rejectRecaptcha(
      'reCAPTCHA is not configured. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY on Vercel.'
    );
  }

  if (!window.grecaptcha) {
    rejectRecaptcha('reCAPTCHA is still loading. Wait a moment and try again.');
  }

  await new Promise<void>((resolve) => {
    window.grecaptcha.ready(() => resolve());
  });

  try {
    const token = await window.grecaptcha.execute(siteKey!, { action });
    if (!token?.trim()) {
      rejectRecaptcha('reCAPTCHA token is missing or invalid.');
    }
    return token;
  } catch (err: unknown) {
    console.error('[recaptcha] execute failed', { action, err });
    if (err instanceof Error && err.message.trim()) {
      rejectRecaptcha(
        `reCAPTCHA failed (${err.message}). Check that beta.infrafund.net is listed under Domains in Google reCAPTCHA admin.`
      );
    }
    rejectRecaptcha(
      'reCAPTCHA failed. Add beta.infrafund.net (and infrafund.net) to Domains in Google reCAPTCHA admin, confirm NEXT_PUBLIC_RECAPTCHA_SITE_KEY matches your secret key pair, then redeploy.'
    );
  }
};
