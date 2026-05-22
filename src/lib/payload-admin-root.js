/**
 * Wraps Payload RootPage: on Vercel, probe Neon over HTTP so login is not sent to
 * create-first-user when payload.users already has rows.
 */
import { RootPage } from '@payloadcms/next/views';
import config from '@payload-config';
import { redirect } from 'next/navigation';
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
      const cfg = await config;
      const params = await props.params;
      const segments = Array.isArray((await params)?.segments)
        ? (await params).segments
        : [];
      const adminRoute = cfg.routes.admin;
      const createPath = cfg.admin.routes.createFirstUser;
      const segmentPath = segments.length > 0 ? `/${segments.join('/')}` : '';

      console.log(
        `[payload] neon user probe: hasUser=true segment=${segmentPath || '/'}`
      );

      // Do not send to /login here — that caused a loop with RootPage still redirecting
      // login → create-first-user. Send to dashboard; auth will redirect to login once.
      if (segmentPath === createPath || segments[0] === 'create-first-user') {
        redirect(adminRoute);
      }
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
