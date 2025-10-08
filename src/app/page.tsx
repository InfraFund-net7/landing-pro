import { AnimatedCounter } from "@/component/animated-counter";
import ChooseInfraFund from "@/component/choose-infrafund";
import ContactUs from "@/component/contact-us";
import FundingSection from "@/component/funding-section";
import InvestmentPlatform from "@/component/projects";
import Tokenization from "@/component/tokenization";
import TrustedSection from "@/component/trusted-section";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <AnimatedCounter />
      <ChooseInfraFund />
      <InvestmentPlatform />
      <FundingSection />
      {/* <Tokenization /> */}
      <TrustedSection />
      <ContactUs />
    </main>
  );
}
