import Investors from '@/component/investors'
import Head from 'next/head'

export default function Page() {
    return (
        <>
            <Head>
                <title>Investors | InfraFund - Invest in the Future of Our Planet</title>
                <meta
                    name="description"
                    content="Invest directly in high-impact, transparent, and blockchain-secured green infrastructure projects with InfraFund."
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://yourdomain.com/investors" />
                <meta property="og:title" content="Investors | InfraFund - Invest in the Future of Our Planet" />
                <meta
                    property="og:description"
                    content="Access transparent, liquid, and high-impact green infrastructure projects powered by the blockchain."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourdomain.com/investors" />
            </Head>

            <Investors />
        </>
    )
}
