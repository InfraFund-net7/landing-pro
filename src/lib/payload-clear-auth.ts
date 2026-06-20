import { importMap } from '@/app/(payload)/admin/importMap.js';
import config from '@payload-config';
import { cookies } from 'next/headers';
import { getPayload } from 'payload';

/** Remove Payload auth cookies, including domain-scoped cookies on Vercel. */
export async function clearPayloadAuthCookies() {
  const payload = await getPayload({ config, importMap });
  const usersAuth = payload.collections.users.config.auth;
  const cookiePrefix = payload.config.cookiePrefix;
  const authCookies =
    typeof usersAuth === 'object' && usersAuth !== null
      ? usersAuth.cookies
      : undefined;
  const domain = authCookies?.domain;
  const store = await cookies();

  const names = new Set<string>([`${cookiePrefix}-token`]);
  for (const { name } of store.getAll()) {
    if (name.startsWith(cookiePrefix)) {
      names.add(name);
    }
  }

  for (const name of names) {
    store.delete({ name, path: '/' });
    if (domain) {
      store.delete({ name, path: '/', domain });
    }
  }

  const expiredCookie = {
    name: `${cookiePrefix}-token`,
    value: '',
    path: '/',
    httpOnly: true,
    secure: authCookies?.secure ?? process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    expires: new Date(0),
    maxAge: 0,
    ...(domain ? { domain } : {}),
  };

  store.set(expiredCookie);
}
