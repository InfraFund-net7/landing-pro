'use client';
import ChooseInfraFund from '@/component/choose-infrafund';
import ContactUsPage from '@/component/contact-us';
import FundingSection from '@/component/funding-section';
import HeroSection from '@/component/HeroSection';
import OperatingSystem from '@/component/operating-system';
import InvestmentPlatform from '@/component/projects';
import TrustedSection from '@/component/trusted-section';
import { useFadeInScroll } from '@/hooks/useFadeInScroll';
import { useState } from 'react';

export default function Home() {
  useFadeInScroll();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="fade-in">
        <OperatingSystem />
      </section>
      <section className="fade-in">
        <ChooseInfraFund />
      </section>
      <section className="fade-in">
        <HeroSection />
      </section>
      <section className="fade-in">
        <FundingSection />
      </section>
      <section className="fade-in">
        <InvestmentPlatform />
      </section>
      <section className="fade-in">
        <TrustedSection />
      </section>

      <ContactUsPage isopen={isContactOpen} setIsOpen={setIsContactOpen} />
    </>
  );
}
