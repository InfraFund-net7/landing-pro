import BuilderPage from '@/component/builders/builder-page'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Builders | InfraFund - Fund Your NetZero Project with Tokenisation</title>
        <meta
          name="description"
          content="InfraFund provides the full-stack toolkit to fund your NetZero project, from tokenisation to global distribution."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/builders" />
        <meta property="og:title" content="Builders | InfraFund - Fund Your NetZero Project with Tokenisation" />
        <meta property="og:description" content="InfraFund provides the full-stack toolkit to fund your NetZero project, from tokenisation to global distribution." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/builders" />
      </Head>

      <BuilderPage />
    </>
  )
}
