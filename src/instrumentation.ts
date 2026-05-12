/**
 * Avoid a dev-only race: Payload’s Drizzle push updates `previousSchema` before `apply()`
 * finishes. Parallel `getPayload` inits can then skip the push and query missing tables.
 * @see https://github.com/payloadcms/payload/blob/main/packages/drizzle/src/utilities/pushDevSchema.ts
 */
export function register() {
  if (process.env.NODE_ENV !== 'production') {
    process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true';
  }
}
