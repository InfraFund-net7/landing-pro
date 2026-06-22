import { importMap } from '@/app/(payload)/admin/importMap.js';
import config from '@payload-config';
import { cookies } from 'next/headers';
import type { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import { resolveUsersAuthConfig } from './payload-auth-cookies.js';

type CookieWriter = Pick<
  Awaited<ReturnType<typeof cookies>>,
  'delete' | 'getAll' | 'set'
>;

function resolveAuthCookieOptions() {
  const auth = resolveUsersAuthConfig();
  if (typeof auth === 'object' && auth !== null) {
    return auth.cookies ?? {};
  }

  return {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax' as const,
  };
}

function expireCookieOnStore(
  store: CookieWriter,
  name: string,
  options: {
    domain?: string;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
  }
) {
  const expired = {
    name,
    value: '',
    path: '/',
    httpOnly: true,
    secure: options.secure,
    sameSite: options.sameSite,
    expires: new Date(0),
    maxAge: 0,
  };

  store.delete({ name, path: '/' });
  store.set(expired);

  if (options.domain) {
    store.delete({ name, path: '/', domain: options.domain });
    store.set({ ...expired, domain: options.domain });
  }
}

function collectPayloadCookieNames(store: CookieWriter, cookiePrefix: string) {
  const names = new Set<string>([`${cookiePrefix}-token`]);
  for (const { name } of store.getAll()) {
    if (name.startsWith(cookiePrefix)) {
      names.add(name);
    }
  }
  return names;
}

function clearPayloadAuthCookiesOnStore(
  store: CookieWriter,
  cookiePrefix: string,
  authCookies: ReturnType<typeof resolveAuthCookieOptions>
) {
  const domain =
    typeof authCookies?.domain === 'string' ? authCookies.domain : undefined;
  const secure = authCookies?.secure ?? process.env.NODE_ENV === 'production';
  const sameSite =
    typeof authCookies?.sameSite === 'string'
      ? (authCookies.sameSite.toLowerCase() as 'lax' | 'strict' | 'none')
      : 'lax';

  for (const name of collectPayloadCookieNames(store, cookiePrefix)) {
    expireCookieOnStore(store, name, { domain, secure, sameSite });
  }
}

/** Remove Payload auth cookies, including domain-scoped cookies on Vercel. */
export async function clearPayloadAuthCookies(response?: NextResponse) {
  const payload = await getPayload({ config, importMap });
  const cookiePrefix = payload.config.cookiePrefix;
  const authCookies = resolveAuthCookieOptions();

  clearPayloadAuthCookiesOnStore(await cookies(), cookiePrefix, authCookies);

  if (response) {
    clearPayloadAuthCookiesOnStore(response.cookies, cookiePrefix, authCookies);
  }
}
