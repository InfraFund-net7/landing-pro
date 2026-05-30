import type { Metadata } from 'next';

import config from '@payload-config';
import { generatePageMetadata } from '@payloadcms/next/views';
import { payloadAdminForgotPage } from '@/lib/payload-admin-forgot-page';
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
    params: Promise.resolve({ segments: ['forgot'] }),
    searchParams: args.searchParams,
  });

const Page = (args: Args) =>
  payloadAdminForgotPage({ config, importMap, ...args });

export default Page;
