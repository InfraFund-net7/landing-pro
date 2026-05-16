/**
 * When set to "relative", login/register use same-origin `/login` and `/register`.
 * Pair with `DASHBOARD_PROXY_ORIGIN` in next.config rewrites so those paths proxy
 * to the dashboard app (OpenFort issues JWT/session there before the dash SPA redirects internally).
 */
function isRelativeDashAuth(): boolean {
  return process.env.NEXT_PUBLIC_DASH_AUTH_MODE === 'relative';
}

/** Dashboard login URL. Set NEXT_PUBLIC_DASH_LOGIN_URL in .env.local */
export function getDashLoginUrl(): string {
  if (isRelativeDashAuth() && typeof window !== 'undefined') {
    return `${window.location.origin}/login`;
  }
  return (
    process.env.NEXT_PUBLIC_DASH_LOGIN_URL ??
    'https://dashboard.infrafund.net/login'
  );
}

/**
 * OpenFort sign-up entry (dashboard app). Used after the landing survey.
 * With relative mode: same-origin `/register` (proxied to the dashboard in dev).
 * Otherwise: NEXT_PUBLIC_DASH_REGISTER_URL or `/login` → `/register` on NEXT_PUBLIC_DASH_LOGIN_URL host.
 */
export function getDashRegisterUrl(): string {
  if (isRelativeDashAuth() && typeof window !== 'undefined') {
    return `${window.location.origin}/register`;
  }

  const explicit = process.env.NEXT_PUBLIC_DASH_REGISTER_URL?.trim();
  if (explicit) return explicit;

  const login = process.env.NEXT_PUBLIC_DASH_LOGIN_URL?.trim();
  if (login) {
    try {
      const u = new URL(login);
      u.pathname = u.pathname.replace(/\/login\/?$/i, '/register');
      if (u.pathname === '/' || u.pathname === '') u.pathname = '/register';
      return u.toString();
    } catch {
      if (/\/login\/?$/i.test(login))
        return login.replace(/\/login\/?$/i, '/register');
    }
  }

  return 'https://dashboard.infrafund.net/register';
}
