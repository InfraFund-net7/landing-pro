/**
 * Avoid a dev-only race: Payload’s Drizzle push updates `previousSchema` before `apply()`
 * finishes. Parallel `getPayload` inits can then skip the push and query missing tables.
 * @see https://github.com/payloadcms/payload/blob/main/packages/drizzle/src/utilities/pushDevSchema.ts
 */
export async function register() {
  if (process.env.NODE_ENV !== 'production') {
    process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true';
  }

  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (process.env.VERCEL && databaseUrl?.includes('.neon.tech')) {
    try {
      const { warmupNeonDatabase } = await import('./lib/neon-warmup.js');
      await warmupNeonDatabase(databaseUrl);
      console.log('[payload] neon warmup: SELECT 1 ok');
    } catch (err) {
      console.warn(
        '[payload] neon warmup failed (scale-to-zero or DATABASE_URL); transactions may timeout:',
        err instanceof Error ? err.message : err
      );
    }
  }
}
