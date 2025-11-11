import React from 'react';
import { Metadata } from 'next';
import ProjectPage from '@/component/project-page';
import AuthFlow from '@/component/AuthFlow';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://infrafund.io';

export const metadata: Metadata = {
  title: 'Projects | InfraFund - Open NetZero Investments',
  description:
    'Explore high-impact renewable energy and infrastructure projects with transparent returns. Invest directly in the future of sustainable energy through InfraFund.',
  keywords: [
    'InfraFund projects',
    'renewable energy investments',
    'green infrastructure',
    'NetZero funds',
    'sustainable investing',
  ],
  openGraph: {
    title: 'Projects | InfraFund',
    description:
      'Discover and invest in verified sustainable projects that power the global transition to NetZero.',
    url: `${siteUrl}/projects`,
    siteName: 'InfraFund',
    images: [
      {
        url: `${siteUrl}/image/project-hero.png`,
        width: 1200,
        height: 630,
        alt: 'InfraFund Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InfraFund Projects',
    description:
      'Explore high-impact renewable energy and infrastructure projects with transparent returns.',
    images: [`${siteUrl}/image/project-hero.png`],
  },
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <AuthFlow />;
}
