/**
 * Wraps Payload RootPage: on Vercel, probe Neon over HTTP so login is not sent to
 * create-first-user when payload.users already has rows.
 */
import { RootPage } from '@payloadcms/next/views';
import config from '@payload-config';
import { redirect } from 'next/navigation';
import { formatAdminURL } from 'payload/shared';
import { probeNeonHasPayloadUser } from './neon-user-probe.js';

/**
 * @param {Parameters<typeof RootPage>[0]} props
 */
export async function payloadAdminRootPage(props) {
  if (process.env.VERCEL) {
    const hasUser = await probeNeonHasPayloadUser();
    if (hasUser === true) {
      process.env.PAYLOAD_VERCEL_KNOWN_HAS_USER = '1';
      const cfg = await config;
      const params = await props.params;
      const segments = Array.isArray((await params)?.segments)
        ? (await params).segments
        : [];
      const adminRoute = cfg.routes.admin;
      const createPath = cfg.admin.routes.createFirstUser;
      const loginPath = cfg.admin.routes.login;
      const segmentPath = segments.length > 0 ? `/${segments.join('/')}` : '';

      console.log(
        `[payload] neon user probe: hasUser=true segment=${segmentPath || '/'}`
      );

      if (segmentPath === createPath || segments[0] === 'create-first-user') {
        redirect(
          formatAdminURL({
            adminRoute,
            path: loginPath,
          })
        );
      }
    } else if (hasUser === false) {
      delete process.env.PAYLOAD_VERCEL_KNOWN_HAS_USER;
      console.log('[payload] neon user probe: hasUser=false');
    } else {
      delete process.env.PAYLOAD_VERCEL_KNOWN_HAS_USER;
    }
  }

  return RootPage(props);
}
