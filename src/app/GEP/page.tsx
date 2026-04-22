import React from 'react';
import { Metadata } from 'next';
import GenderEqualityPlan from '@/component/gep/gep';

const canonicalUrl = 'https://www.infrafund.net/GEP';

export const metadata: Metadata = {
  title: 'Gender Equality Plan (GEP) | InfraFund',
  description:
    'InfraNetZero LTD (InfraFund) Gender Equality Plan: our commitments on culture, leadership, recruitment, and integrating equality into technology design.',
  keywords: [
    'InfraFund',
    'Gender Equality Plan',
    'GEP',
    'diversity',
    'inclusion',
    'InfraNetZero',
  ],
  openGraph: {
    title: 'Gender Equality Plan (GEP) | InfraFund',
    description:
      'Our foundational commitments to gender equality, inclusive culture, and responsible technology design.',
    url: canonicalUrl,
    siteName: 'InfraFund',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gender Equality Plan (GEP) | InfraFund',
    description:
      'Read InfraFund’s Gender Equality Plan on culture, leadership, hiring, and R&D.',
  },
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <GenderEqualityPlan />;
}
