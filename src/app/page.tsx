"use client"
import { AnimatedCounter } from '@/component/animated-counter';
import ChooseInfraFund from '@/component/choose-infrafund';
import ContactUs from '@/component/contact-us';
import FundingSection from '@/component/funding-section';
import InvestmentPlatform from '@/component/projects';
import TrustedSection from '@/component/trusted-section';
import { useFadeInScroll } from '@/hooks/useFadeInScroll';

export default function Home() {
   useFadeInScroll(); 
  return (
    <>
      {/* <section className="fade-in"><AnimatedCounter /></section> */}
      <section className="fade-in">
        <ChooseInfraFund />
      </section>
      <section className="fade-in">
        <InvestmentPlatform />
      </section>
      <section className="fade-in">
        <FundingSection />
      </section>
      <section className="fade-in">
        <TrustedSection />
      </section>
      <section className="fade-in">
        <ContactUs />
      </section>
    </>
  );
}
