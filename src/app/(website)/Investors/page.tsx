import Investors from '@/component/investors';
import Head from 'next/head';

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://infrafund.io';
  const pageUrl = `${siteUrl}/investors`;

  return (
    <>
      <Head>
        <title>
          Investors | InfraFund - Invest in the Future of Our Planet
        </title>
        <meta
          name="description"
          content="Invest directly in high-impact, transparent, and blockchain-secured green infrastructure projects with InfraFund."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        <meta
          property="og:title"
          content="Investors | InfraFund - Invest in the Future of Our Planet"
        />
        <meta
          property="og:description"
          content="Access transparent, liquid, and high-impact green infrastructure projects powered by the blockchain."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="InfraFund" />
        <meta
          property="og:image"
          content={`${siteUrl}/image/investors-banner.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Investors | InfraFund - Invest in the Future of Our Planet"
        />
        <meta
          name="twitter:description"
          content="Invest in sustainable, blockchain-secured infrastructure with InfraFund."
        />
        <meta
          name="twitter:image"
          content={`${siteUrl}/image/investors-banner.jpg`}
        />
      </Head>

      <Investors />
    </>
  );
}
