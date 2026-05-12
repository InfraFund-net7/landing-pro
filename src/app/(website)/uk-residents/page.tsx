import UKResidents from '@/component/ukresident';
import React from 'react';
import CmsSitePage from '@/component/cms-site-page';
import {
  fetchSitePageBySlug,
  isCmsPageReplacementEnabled,
} from '@/lib/cms-site-pages';

export default async function page() {
  const cmsPage = await fetchSitePageBySlug('uk-residents');
  if (isCmsPageReplacementEnabled && cmsPage?.replaceExistingPage) {
    return <CmsSitePage page={cmsPage} />;
  }
  return <UKResidents />;
}
