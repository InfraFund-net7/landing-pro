import { importMap } from '@/app/(payload)/admin/importMap.js';
import config from '@payload-config';
import { cookies } from 'next/headers';
import type { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import { resolveAllAuthCookieDomains } from './payload-auth-cookies.js';

type CookieWriter = Pick<
  Awaited<ReturnType<typeof cookies>>,
  'delete' | 'getAll' | 'set'
>;

function normalizeSameSite(
  value: string | boolean | undefined
): 'lax' | 'strict' | 'none' | undefined {
  if (typeof value !== 'string') return 'lax';
  const normalized = value.toLowerCase();
  if (normalized === 'strict' || normalized === 'none') return normalized;
  return 'lax';
}

function getUsersCookieOptions(
  payload: Awaited<ReturnType<typeof getPayload>>
) {
  const auth = payload.collections.users.config.auth;
  const authCookies =
    typeof auth === 'object' && auth !== null ? auth.cookies : undefined;

  return {
    secure: authCookies?.secure ?? process.env.NODE_ENV === 'production',
    sameSite: normalizeSameSite(authCookies?.sameSite),
  };
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

function expireCookieOnStore(
  store: CookieWriter,
  name: string,
  options: {
    domain?: string;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
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

function clearPayloadAuthCookiesOnStore(
  store: CookieWriter,
  cookiePrefix: string,
  cookieOptions: ReturnType<typeof getUsersCookieOptions>,
  domains: (string | undefined)[]
) {
  const names = collectPayloadCookieNames(store, cookiePrefix);

  for (const name of names) {
    for (const domain of domains) {
      expireCookieOnStore(store, name, {
        domain,
        secure: cookieOptions.secure,
        sameSite: cookieOptions.sameSite,
      });
    }
  }
}

/** Remove Payload auth cookies, including domain-scoped cookies on Vercel. */
export async function clearPayloadAuthCookies(
  response?: NextResponse,
  requestHostname?: string
) {
  const payload = await getPayload({ config, importMap });
  const cookiePrefix = payload.config.cookiePrefix;
  const cookieOptions = getUsersCookieOptions(payload);
  const domains = resolveAllAuthCookieDomains(requestHostname);

  clearPayloadAuthCookiesOnStore(
    await cookies(),
    cookiePrefix,
    cookieOptions,
    domains
  );

  if (response) {
    clearPayloadAuthCookiesOnStore(
      response.cookies,
      cookiePrefix,
      cookieOptions,
      domains
    );
  }
}
