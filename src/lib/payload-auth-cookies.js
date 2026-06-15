/**
 * Share Payload JWT cookies between www and apex on production (e.g. infrafund.net).
 */

/** @returns {string | undefined} */
function resolveAuthCookieDomain() {
  if (!process.env.VERCEL) return undefined;

  const candidates = [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
  ].filter(Boolean);

  for (const raw of candidates) {
    try {
      const host = new URL(String(raw).trim()).hostname;
      if (!host || host === 'localhost' || host === '127.0.0.1') continue;
      if (host.endsWith('.vercel.app')) return undefined;

      const base = host.startsWith('www.') ? host.slice(4) : host;
      if (base.includes('.')) return `.${base}`;
    } catch {
      // ignore invalid URLs
    }
  }

  return undefined;
}

/** @returns {boolean | import('payload').IncomingAuthType} */
export function resolveUsersAuthConfig() {
  if (!process.env.VERCEL) return true;

  const domain = resolveAuthCookieDomain();

  return {
    useSessions: false,
    cookies: {
      secure: true,
      sameSite: 'Lax',
      ...(domain ? { domain } : {}),
    },
  };
}
