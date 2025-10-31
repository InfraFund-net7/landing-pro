import radicaltransparency from "@/../public/svg/radical-transparency.svg"
import futureliquidity from "@/../public/svg/future-liquidity.svg"
import directimpact from "@/../public/svg/direct-impact.svg"
import { ChartNoAxesCombined, SearchCheck, Wallet } from "lucide-react"

export const infradiffrence = [
    {
        icon: radicaltransparency,
        title: "Radical Transparency",
        description:
            "Our AI-Driven Digital Twin provides a live, verifiable view into project performance.",
    },
    {
        icon: directimpact,
        title: "Direct Access & Impact",
        description:
            "Go beyond donations. Invest directly in the projects you believe in and become a true stakeholder in their success.",
    },
    {
        icon: futureliquidity,
        title: "Future Liquidity",
        description:
            "We are building the infrastructure to turn illiquid, long-term assets into tradable digital tokens on a secure secondary market",
    },
]

export const invest = [
    {
        icon: Wallet,
        title: "Connect Your Wallet",
        description: "Securely connect your Web3 wallet in seconds",
    },
    {
        icon: SearchCheck,
        title: "Discover & Diligence",
        description:
            "Browse projects and review their performance data via the Digital Twin dashboard.",
    },
    {
        icon: ChartNoAxesCombined,
        title: "Invest & Track",
        description:
            "Invest directly with crypto or fiat and monitor your portfolio in your personal dashboard.",
    },
]

export const Investfaqs = [
    {
        id: "financial-return",
        question: "What am I actually investing in when I buy a token on InfraFund?",
        answer:
            `When you invest on InfraFund, you are purchasing a digital token that represents a real, verifiable <br/> stake in a specific green infrastructure project. Depending on the project's funding model, this token <br/> could represent:<br/><br/>

             <strong>Fractional Equity</strong>: A share of ownership in the project, entitling you to a portion of its future profits.<br/><br/>

            <strong>A Loan Position</strong>: A position as a lender to the project, entitling you to receive regular principal and interest payments.<br/><br/>

            <strong>A Pre-Sale Agreement</strong>: The right to claim a certain amount of the project's future output, such as a pre-purchase of renewable energy.<br/>    

            Each project's offering is clearly defined before you invest. We use advanced, compliance-aware <br/> token standards (like ERC-3643) to convert these illiquid physical assets into liquid, tradable digital securities, giving you verifiable on-chain ownership.`,
    },
    {
        id: "project-vetting",
        question: "How does InfraFund protect my investment and manage risk?",
        answer:
            `Our entire platform is architected around transparency and risk mitigation, centered on our "secret sauce": <strong>the AI-Driven Digital Twin.</strong><br/><br/>
            For every project, we create a dynamic virtual model that processes real-time data from the physical asset. This provides you with a live, easy-to-understand dashboard showing key performance indicators (KPIs) and project progress. Our AI engine uses this data to provide predictive analysis on project performance and potential risks, allowing for proactive management rather than reactive problem-solving. This radical transparency, backed by the immutable nature of the blockchain, is designed to build investor trust and provide a level of oversight that is impossible in traditional, opaque infrastructure funds.`,
    },
    {
        id: "risks",
        question: "How do I get a financial return, and how are payments handled?",
        answer:
            `Returns are generated from the real-world revenue of the underlying infrastructure project (e.g., from selling electricity to the grid). The payment process is automated and made efficient through smart contracts.<br/><br/>
             When a project generates revenue, the profits are sent to a dedicated smart contract. This contract automatically calculates each investor's pro-rata share based on the number of tokens they hold and distributes the returns (e.g., in stablecoins like USDC) directly to each investor's connected wallet. This automated "waterfall" removes intermediaries, eliminates payment delays, and ensures the process is transparent and auditable on the blockchain.`,
    },
    {
        id: "web3-wallet",
        question: "Are these investments regulated and are they safe?",
        answer:
            `We are building InfraFund to be a regulatory-aware platform from day one. Our strategy is to operate in the UK under an <strong>Appointed Representative (AR)</strong> model, which means we partner with a firm that is fully authorised and regulated by the Financial Conduct Authority (FCA). This provides a compliant framework for us to facilitate the issuance of security tokens.<br/><br/>
             However, it is crucial to understand that all early-stage and infrastructure investments are high-risk. While our platform is designed to mitigate operational and transparency risks, your capital is still at risk, and you may lose your entire investment. These investments are not covered by the Financial Services Compensation Scheme (FSCS). We strongly advise you to consult with independent professional advisors before making any investment.`,
    },
    {
        id: "invest-InfraFund",
        question: "Why should I invest through InfraFund instead of a traditional green investment fund?",
        answer:
            `InfraFund offers three fundamental advantages over traditional funds:<br/><br/>

<strong>Direct Access & Transparency</strong>: Unlike opaque funds where your money is pooled and you get a quarterly report, InfraFund gives you a direct, verifiable ownership stake in a specific project that you choose. Our AI-Driven Digital Twin lets you see its real-time performance 24/7.<br/><br/>

<strong>Liquidity:</strong> Traditional infrastructure investments lock your capital up for 10-15 years. Because our assets are tokenized, they are built to be tradable on a secondary market, offering you the potential for liquidity and the freedom to manage your own investment horizon.<br/><br/>

<strong>Lower Fees & Efficiency:</strong> By using smart contracts to automate processes like dividend payments, we remove costly intermediaries, which can result in lower management fees and more efficient returns for you as the investor.`
    },
]
