const RECAPTCHA_TOKEN_MAX_LENGTH = 100;

function clearStaleRecaptchaTokens() {
  if (typeof localStorage === 'undefined') return;
  if (localStorage.getItem('recaptcha_tokens_cleared')) return;
  ['access_token', 'accessToken'].forEach((key) => {
    const val = localStorage.getItem(key);
    if (val && val.length > RECAPTCHA_TOKEN_MAX_LENGTH) {
      localStorage.removeItem(key);
    }
  });
  localStorage.setItem('recaptcha_tokens_cleared', '1');
}

export function getAccessToken(): string | null {
  clearStaleRecaptchaTokens();
  const access_token =
    localStorage.getItem('access_token') ?? localStorage.getItem('accessToken');
  return access_token ?? null;
}
