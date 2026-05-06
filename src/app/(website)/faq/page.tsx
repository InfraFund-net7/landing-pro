import Faq from '@/component/Faq';
import React from 'react';
import CmsSitePage from '@/component/cms-site-page';
import {
  fetchSitePageBySlug,
  isCmsPageReplacementEnabled,
} from '@/lib/cms-site-pages';

export default async function page() {
  const cmsPage = await fetchSitePageBySlug('faq');
  if (isCmsPageReplacementEnabled && cmsPage?.replaceExistingPage) {
    return <CmsSitePage page={cmsPage} />;
  }
  return <Faq />;
}
