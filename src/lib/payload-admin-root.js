/**
 * Wraps Payload RootPage for catch-all admin routes (not /login, /admin, /create-first-user).
 */
import { RootPage } from '@payloadcms/next/views';
import { probeNeonHasPayloadUser } from './neon-user-probe.js';
import {
  clearVercelKnownHasUser,
  markVercelKnownHasUser,
} from './payload-vercel-known-user.js';

/**
 * @param {Parameters<typeof RootPage>[0]} props
 */
export async function payloadAdminRootPage(props) {
  if (process.env.VERCEL) {
    const hasUser = await probeNeonHasPayloadUser();
    if (hasUser === true) {
      markVercelKnownHasUser();
      process.env.PAYLOAD_VERCEL_KNOWN_HAS_USER = '1';
      const params = await props.params;
      const segments = Array.isArray((await params)?.segments)
        ? (await params).segments
        : [];
      const segmentPath = segments.length > 0 ? `/${segments.join('/')}` : '';
      console.log(
        `[payload] neon user probe: hasUser=true segment=${segmentPath || '/'}`
      );
    } else if (hasUser === false) {
      clearVercelKnownHasUser();
      delete process.env.PAYLOAD_VERCEL_KNOWN_HAS_USER;
      console.log('[payload] neon user probe: hasUser=false');
    } else {
      clearVercelKnownHasUser();
      delete process.env.PAYLOAD_VERCEL_KNOWN_HAS_USER;
    }
  }

  return RootPage(props);
}
