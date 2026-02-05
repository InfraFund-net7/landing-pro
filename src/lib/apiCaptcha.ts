import { getRecaptchaToken } from "@/utils/recaptcha";

type CaptchaAction =
    | "waitlist"
    | "non_resident"
    | "signup"
    | "contact";

export const withCaptcha = async (
    action: CaptchaAction
): Promise<{ 'X-Captcha-Token': string }> => {
    return {
        'X-Captcha-Token': await getRecaptchaToken(action),
    };
};
