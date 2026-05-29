/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next';

import config from '@payload-config';
import { generatePageMetadata } from '@payloadcms/next/views';
import { redirect } from 'next/navigation';
import { formatAdminURL } from 'payload/shared';
import { payloadAdminDashboardPage } from '@/lib/payload-admin-dashboard-page';
import { probeNeonHasPayloadUser } from '@/lib/neon-user-probe.js';
import { payloadAdminRootPage } from '@/lib/payload-admin-root.js';
import { importMap } from '../importMap';

type Args = {
  params: Promise<{
    segments?: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = async ({ params, searchParams }: Args) => {
  const resolvedParams = await params;
  const segments = Array.isArray(resolvedParams?.segments)
    ? resolvedParams.segments
    : [];

  if (segments.length === 0 && process.env.VERCEL) {
    const hasUser = await probeNeonHasPayloadUser();
    if (hasUser === false) {
      const cfg = await config;
      console.log(
        '[payload] /admin: hasUser=false → redirect create-first-user'
      );
      redirect(
        formatAdminURL({
          adminRoute: cfg.routes.admin,
          path: cfg.admin.routes.createFirstUser,
        })
      );
    }
    if (hasUser === true) {
      return payloadAdminDashboardPage({
        config,
        importMap,
        params: Promise.resolve({ segments: [] }),
        searchParams,
      });
    }
  }

  return payloadAdminRootPage({
    config,
    params: Promise.resolve({ segments }),
    searchParams,
    importMap,
  });
};

export default Page;
