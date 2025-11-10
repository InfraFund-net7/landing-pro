import React from 'react';

interface RiskSection {
  title: string;
  content: React.ReactNode;
}

interface RiskContent {
  sections: RiskSection[];
  readingTime: string;
  intro: string;
  disclaimer: string;
}

const riskContent: RiskContent = {
  readingTime: '2 min',
  intro: `Due to the potential for losses, the Financial Conduct Authority (FCA) considers this investment to be high risk.*`,
  sections: [
    {
      title: 'What are the key risks?',
      content: (
        <div className="space-y-4">
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>You could lose all the money you invest</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Most investments are shares in start-up businesses or bonds
                  issued by them. Investors in these shares or bonds often lose
                  100% of the money they invested, as most start-up businesses
                  fail.
                </li>
                <li>
                  Checks on the businesses you are investing in, such as how
                  well they are expected to perform, may not have been carried
                  out by the platform you are investing through. You should do
                  your own research before investing.
                </li>
              </ul>
            </li>
            <li>
              <strong>You won’t get your money back quickly</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Even if the business you invest in is successful, it will
                  likely take several years to get your money back.
                </li>
                <li>
                  The most likely way to get your money back is if the business
                  is bought by another business or lists its shares on an
                  exchange such as the London Stock Exchange. These events are
                  not common.
                </li>
                <li>
                  Start-up businesses very rarely pay you back through
                  dividends. You should not expect to get your money back this
                  way.
                </li>
                <li>
                  InfraFund may work with companies to give you an opportunity
                  to sell your investment early through a secondary sale, but
                  there is no guarantee you will find a buyer at the price you
                  are willing to sell.
                </li>
              </ul>
            </li>
            <li>
              <strong>Don’t put all your eggs in one basket</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Putting all your money into a single business or type of
                  investment for example, is risky. Spreading your money across
                  different investments makes you less dependent on any one to
                  do well. A good rule of thumb is not to invest more than 10%
                  of your money in high-risk investments.
                </li>
              </ul>
            </li>
            <li>
              <strong>The value of your investment can be reduced</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  If your investment is shares, the percentage of the business
                  that you own will decrease if the business issues more shares.
                  This could mean that the value of your investment reduces,
                  depending on how much the business grows. Most start-up
                  businesses issue multiple rounds of shares.
                </li>
                <li>
                  These new shares could have additional rights that your shares
                  don’t have, such as the right to receive a fixed dividend,
                  which could further reduce your chances of getting a return on
                  your investment.
                </li>
              </ul>
            </li>
            <li>
              <strong>
                You are unlikely to be protected if something goes wrong
              </strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Protection from the Financial Services Compensation Scheme
                  (FSCS), in relation to claims against failed regulated firms,
                  does not cover poor investment performance.
                </li>
                <li>
                  Protection from the Financial Ombudsman Service (FOS) does not
                  cover poor investment performance. If you have a complaint
                  against an FCA-regulated platform, FOS may be able to consider
                  it.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      ),
    },
  ],
  disclaimer: `Investing in start-ups and early-stage businesses involves risks, including illiquidity, lack of dividends, loss of investment and dilution, and it should be done only as part of a diversified portfolio. InfraFund is targeted exclusively at investors who are sufficiently sophisticated to understand these risks and make their own investment decisions. You will only be able to invest via InfraFund once you are registered as sufficiently sophisticated. This page has been approved by InfraFund. Pitches for investment are not offers to the public and investments can only be made by members of InfraFund.net. If this page contains details of historical performance, investors should be aware that past performance is not a reliable indicator of future results. Further restrictions and InfraFund's limitation of liability are set out in the Investor Terms and Conditions. Please seek independent advice as required as InfraFund does not give investment or tax advice.`,
};

export default function RiskWarning() {
  return (
    <div className="flex flex-col justify-center items-start text-white gap-8 py-[175px] px-4 md:px-6 lg:px-12 xl:px-[90px]">
      <h1 className="text-5xl font-bold">Risk Warning</h1>

      <div className="text-base font-normal space-y-6">
        <p>Estimated reading time: {riskContent.readingTime}</p>
        <div className="space-y-4">
          <p>{riskContent.intro}</p>
        </div>

        {riskContent.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <div className="space-y-2">{section.content}</div>
          </section>
        ))}

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Risk Warning</h2>
          <div className="space-y-2">
            <p>{riskContent.disclaimer}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
