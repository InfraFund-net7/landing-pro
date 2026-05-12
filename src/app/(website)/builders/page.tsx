import BuilderPage from '@/component/builders/builder-page';
import type { Metadata } from 'next';
import CmsSitePage from '@/component/cms-site-page';
import {
  fetchSitePageBySlug,
  isCmsPageReplacementEnabled,
} from '@/lib/cms-site-pages';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://infrafund.io';
const pageUrl = `${siteUrl}/builders`;

export const metadata: Metadata = {
  title: 'Builders | InfraFund - Fund Your NetZero Project with Tokenisation',
  description:
    'InfraFund provides the full-stack toolkit to fund your NetZero project, from tokenisation to global distribution.',
  alternates: {
    canonical: pageUrl,
  },
};

export default async function Page() {
  const cmsPage = await fetchSitePageBySlug('builders');
  if (isCmsPageReplacementEnabled && cmsPage?.replaceExistingPage) {
    return <CmsSitePage page={cmsPage} />;
  }
  return <BuilderPage />;
}
