function resolveRecaptchaSecret(): string | null {
  return (
    process.env.RECAPTCHA_SECRET?.trim() ||
    process.env.INFRA_REST_RECAPTCHA_GOOGLE_SECRET?.trim() ||
    null
  );
}

export async function verifyRecaptchaToken(
  token: string,
  remoteIp?: string | null
): Promise<void> {
  const secret = resolveRecaptchaSecret();
  if (!secret) {
    return;
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp?.trim()) {
    params.set('remoteip', remoteIp.trim());
  }

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    }
  );

  if (!response.ok) {
    throw new Error('failed to verify captcha');
  }

  const data = (await response.json()) as { success?: boolean };
  if (!data.success) {
    throw new Error('captcha verification failed');
  }
}
