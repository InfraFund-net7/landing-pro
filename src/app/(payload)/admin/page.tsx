import type { Metadata } from 'next';

import config from '@payload-config';
import { generatePageMetadata } from '@payloadcms/next/views';
import { redirect } from 'next/navigation';
import { formatAdminURL } from 'payload/shared';
import { payloadAdminDashboardPage } from '@/lib/payload-admin-dashboard-page';
import { probeNeonHasPayloadUser } from '@/lib/neon-user-probe.js';
import { payloadAdminRootPage } from '@/lib/payload-admin-root.js';
import { importMap } from './importMap';

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = (args: Args): Promise<Metadata> =>
  generatePageMetadata({
    config,
    params: Promise.resolve({ segments: [] }),
    searchParams: args.searchParams,
  });

const Page = async (args: Args) => {
  if (process.env.VERCEL) {
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
        searchParams: args.searchParams,
      });
    }
  }

  return payloadAdminRootPage({
    config,
    importMap,
    params: Promise.resolve({ segments: [] }),
    searchParams: args.searchParams,
  });
};

export default Page;
