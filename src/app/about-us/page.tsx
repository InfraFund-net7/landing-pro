import React from 'react';
import { Metadata } from 'next';
import AboutUs from '@/component/about-us/about-us';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://infrafund.io';

export const metadata: Metadata = {
  title: 'About Us | InfraFund - Building the Future of Sustainable Finance',
  description:
    "Learn about InfraFund's mission to revolutionize green finance through blockchain technology. Meet our team, explore our story, and see how we’re making sustainable investment accessible worldwide.",
  keywords: [
    'InfraFund',
    'About InfraFund',
    'sustainable finance',
    'green investment',
    'NetZero projects',
    'blockchain infrastructure',
    'clean energy investment',
  ],
  openGraph: {
    title: 'About Us | InfraFund - Building the Future of Sustainable Finance',
    description:
      'Discover how InfraFund is transforming sustainable finance. Learn about our mission, team, and journey toward NetZero investment innovation.',
    url: `${siteUrl}/about`,
    siteName: 'InfraFund',
    images: [
      {
        url: `${siteUrl}/image/our-story.jpg`,
        width: 1200,
        height: 630,
        alt: 'InfraFund Team and Vision',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About InfraFund - Building a Greener Financial Future',
    description:
      'Explore InfraFund’s story and meet the team pioneering blockchain-based sustainability investments.',
    images: [`${siteUrl}/image/our-story.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <AboutUs />;
}
