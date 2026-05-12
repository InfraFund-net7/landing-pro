import Investors from '@/component/investors';
import type { Metadata } from 'next';
import CmsSitePage from '@/component/cms-site-page';
import {
  fetchSitePageBySlug,
  isCmsPageReplacementEnabled,
} from '@/lib/cms-site-pages';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://infrafund.io';
const pageUrl = `${siteUrl}/investors`;

export const metadata: Metadata = {
  title: 'Investors | InfraFund - Invest in the Future of Our Planet',
  description:
    'Invest directly in high-impact, transparent, and blockchain-secured green infrastructure projects with InfraFund.',
  alternates: {
    canonical: pageUrl,
  },
};

export default async function Page() {
  const cmsPage = await fetchSitePageBySlug('Investors');
  if (isCmsPageReplacementEnabled && cmsPage?.replaceExistingPage) {
    return <CmsSitePage page={cmsPage} />;
  }
  return <Investors />;
}
