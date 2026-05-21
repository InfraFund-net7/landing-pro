/** Production dashboard (front-pro). Header Login opens this app's /login. */
const DASHBOARD_ORIGIN = 'https://dashboard.infrafund.net';
export const DASHBOARD_LOGIN_URL = `${DASHBOARD_ORIGIN}/login`;
const DASHBOARD_REGISTER_URL = `${DASHBOARD_ORIGIN}/register`;

/**
 * When set to "relative", login/register use same-origin `/login` and `/register` on localhost only.
 * Pair with `DASHBOARD_PROXY_ORIGIN` in next.config rewrites so those paths proxy
 * to the dashboard app (OpenFort issues JWT/session there before the dash SPA redirects internally).
 */
function isRelativeDashAuth(): boolean {
  if (process.env.NEXT_PUBLIC_DASH_AUTH_MODE !== 'relative') return false;
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

/** Dashboard login URL. Set NEXT_PUBLIC_DASH_LOGIN_URL in .env.local */
export function getDashLoginUrl(): string {
  if (isRelativeDashAuth()) {
    return `${window.location.origin}/login`;
  }
  const configured = process.env.NEXT_PUBLIC_DASH_LOGIN_URL?.trim();
  return configured || DASHBOARD_LOGIN_URL;
}

/**
 * OpenFort sign-up entry (dashboard app). Used after the landing survey.
 * With relative mode: same-origin `/register` (proxied to the dashboard in dev).
 * Otherwise: NEXT_PUBLIC_DASH_REGISTER_URL or `/login` → `/register` on NEXT_PUBLIC_DASH_LOGIN_URL host.
 */
export function getDashRegisterUrl(): string {
  if (isRelativeDashAuth()) {
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

  return DASHBOARD_REGISTER_URL;
}
