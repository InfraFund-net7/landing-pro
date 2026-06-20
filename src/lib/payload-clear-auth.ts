import { importMap } from '@/app/(payload)/admin/importMap.js';
import config from '@payload-config';
import { cookies } from 'next/headers';
import { generateExpiredPayloadCookie, getPayload } from 'payload';
import { resolveUsersAuthConfig } from './payload-auth-cookies.js';

type CollectionAuthConfig = {
  cookies?: {
    domain?: string;
    secure?: boolean;
    sameSite?: boolean | 'Lax' | 'Strict' | 'None' | 'lax' | 'strict' | 'none';
  };
  tokenExpiration?: number;
};

function resolveCollectionAuthConfigForCookies(): CollectionAuthConfig {
  const auth = resolveUsersAuthConfig();
  if (typeof auth === 'object' && auth !== null) {
    return auth;
  }

  return {
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
    tokenExpiration: 7200,
  };
}

type CookieToSet = Parameters<Awaited<ReturnType<typeof cookies>>['set']>[0];

/** Remove Payload auth cookies, including domain-scoped cookies on Vercel. */
export async function clearPayloadAuthCookies() {
  const payload = await getPayload({ config, importMap });
  const collectionAuthConfig = resolveCollectionAuthConfigForCookies();
  const cookiePrefix = payload.config.cookiePrefix;
  const domain = collectionAuthConfig.cookies?.domain;
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

  const expiredCookie = generateExpiredPayloadCookie({
    collectionAuthConfig,
    cookiePrefix,
    returnCookieAsObject: true,
  }) as CookieToSet;

  store.set(expiredCookie);
}
