import type { Metadata } from 'next';

import config from '@payload-config';
import { generatePageMetadata } from '@payloadcms/next/views';
import { payloadAdminLoginPage } from '@/lib/payload-admin-login-page';
import { importMap } from '../importMap';

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
    params: Promise.resolve({ segments: ['login'] }),
    searchParams: args.searchParams,
  });

const Page = (args: Args) =>
  payloadAdminLoginPage({ config, importMap, ...args });

export default Page;
