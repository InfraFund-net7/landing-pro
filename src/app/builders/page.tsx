import BuilderPage from '@/component/builders/builder-page';
import Head from 'next/head';

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://infrafund.io';
  const pageUrl = `${siteUrl}/builders`;

  return (
    <>
      <Head>
        <title>
          Builders | InfraFund - Fund Your NetZero Project with Tokenisation
        </title>
        <meta
          name="description"
          content="InfraFund provides the full-stack toolkit to fund your NetZero project, from tokenisation to global distribution."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        <meta
          property="og:title"
          content="Builders | InfraFund - Fund Your NetZero Project with Tokenisation"
        />
        <meta
          property="og:description"
          content="InfraFund provides the full-stack toolkit to fund your NetZero project, from tokenisation to global distribution."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="InfraFund" />
        <meta
          property="og:image"
          content={`${siteUrl}/image/builders-hero.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Builders | InfraFund - Fund Your NetZero Project with Tokenisation"
        />
        <meta
          name="twitter:description"
          content="InfraFund provides the full-stack toolkit to fund your NetZero project, from tokenisation to global distribution."
        />
        <meta
          name="twitter:image"
          content={`${siteUrl}/image/builders-hero.jpg`}
        />
      </Head>

      <BuilderPage />
    </>
  );
}
