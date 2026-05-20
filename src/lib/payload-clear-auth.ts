import { cookies } from 'next/headers';

/** Remove all Payload session cookies (works even when admin access is denied). */
export async function clearPayloadAuthCookies() {
  const store = await cookies();
  for (const { name } of store.getAll()) {
    if (name.startsWith('payload')) {
      store.delete(name);
    }
  }
}
