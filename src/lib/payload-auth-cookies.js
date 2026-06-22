/**
 * Share Payload JWT cookies between www and apex on production (e.g. infrafund.net).
 */

/** @param {string} host */
function hostnameToCookieDomain(host) {
  if (!host || host === 'localhost' || host === '127.0.0.1') return undefined;
  if (host.endsWith('.vercel.app')) return undefined;

  const withoutWww = host.startsWith('www.') ? host.slice(4) : host;
  if (!withoutWww.includes('.')) return undefined;

  return `.${withoutWww}`;
}

/** @returns {string | undefined} */
function resolveAuthCookieDomain() {
  if (!process.env.VERCEL) return undefined;

  const candidates = [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
  ].filter(Boolean);

  for (const raw of candidates) {
    try {
      const domain = hostnameToCookieDomain(
        new URL(String(raw).trim()).hostname
      );
      if (domain) return domain;
    } catch {
      // ignore invalid URLs
    }
  }

  return undefined;
}

/**
 * Every domain variant that may have been used when setting the auth cookie.
 * @param {string | undefined} requestHostname
 * @returns {(string | undefined)[]}
 */
export function resolveAllAuthCookieDomains(requestHostname) {
  /** @type {Set<string | undefined>} */
  const domains = new Set([undefined]);
  /** @type {Set<string>} */
  const hostnames = new Set();

  if (requestHostname) {
    hostnames.add(requestHostname);
  }

  for (const raw of [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
  ]) {
    if (!raw) continue;
    try {
      hostnames.add(new URL(String(raw).trim()).hostname);
    } catch {
      // ignore invalid URLs
    }
  }

  for (const host of hostnames) {
    const domain = hostnameToCookieDomain(host);
    if (domain) {
      domains.add(domain);
    }

    const withoutWww = host.startsWith('www.') ? host.slice(4) : host;
    const parts = withoutWww.split('.');
    if (parts.length > 2) {
      domains.add(`.${parts.slice(-2).join('.')}`);
    }
  }

  return [...domains];
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
