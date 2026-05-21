/**
 * Skip Payload/Neon during `next build` static generation (Vercel, Docker, local).
 * Pages use fallbacks at build time; runtime can still fetch when not in build phase.
 */
export function skipPayloadFetchAtBuild(): boolean {
  if (process.env.SKIP_PAYLOAD_FETCH_AT_BUILD === '1') return true;
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PRIVATE_BUILD_WORKER === '1'
  );
}
