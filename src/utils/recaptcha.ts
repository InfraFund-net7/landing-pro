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

export const getRecaptchaToken = (
    action: string = 'default_action'
): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject('Window is undefined');
            return;
        }

        if (!window.grecaptcha) {
            reject('reCAPTCHA not loaded');
            return;
        }

        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (!siteKey) {
            reject('reCAPTCHA site key is missing');
            return;
        }

        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(siteKey, { action })
                .then(resolve)
                .catch(reject);
        });
    });
};
