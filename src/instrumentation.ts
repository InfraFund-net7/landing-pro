/**
 * Avoid a dev-only race: Payload’s Drizzle push updates `previousSchema` before `apply()`
 * finishes. Parallel `getPayload` inits can then skip the push and query missing tables.
 * @see https://github.com/payloadcms/payload/blob/main/packages/drizzle/src/utilities/pushDevSchema.ts
 */
export async function register() {
  if (process.env.NODE_ENV !== 'production') {
    process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true';
  }

  const databaseUrl = (
    process.env.DATABASE_URL ?? process.env.POSTGRES_URL
  )?.trim();
  if (process.env.VERCEL && databaseUrl?.includes('.neon.tech')) {
    try {
      const { warmupNeonDatabase } = await import('./lib/neon-warmup.js');
      await warmupNeonDatabase(databaseUrl);
      console.log('[payload] neon warmup: SELECT 1 ok');
      const { probeNeonHasPayloadUser } = await import(
        './lib/neon-user-probe.js'
      );
      const { markVercelKnownHasUser } = await import(
        './lib/payload-vercel-known-user.js'
      );
      const hasUser = await probeNeonHasPayloadUser(databaseUrl);
      if (hasUser === true) {
        markVercelKnownHasUser();
        process.env.PAYLOAD_VERCEL_KNOWN_HAS_USER = '1';
        console.log('[payload] neon user probe (cold start): hasUser=true');
      }
    } catch (err) {
      console.warn(
        '[payload] neon warmup failed (scale-to-zero or DATABASE_URL); transactions may timeout:',
        err instanceof Error ? err.message : err
      );
    }
  }
}
