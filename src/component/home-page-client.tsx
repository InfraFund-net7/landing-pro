'use client';

import ChooseInfraFund from '@/component/choose-infrafund';
import ContactUsPage from '@/component/contact-us';
import FundingSection from '@/component/funding-section';
import HeroSection from '@/component/HeroSection';
import OperatingSystem from '@/component/operating-system';
import InvestmentPlatform from '@/component/projects';
import TrustedSection from '@/component/trusted-section';
import { useFadeInScroll } from '@/hooks/useFadeInScroll';
import type { HomePageContent } from '@/lib/cms-homepage';
import { useState } from 'react';
import { projects as fallbackProjects } from '@/constants/projectData';

type HomePageClientProps = {
  content: HomePageContent | null;
};

export default function HomePageClient({ content }: HomePageClientProps) {
  useFadeInScroll();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const projects = content?.investment?.projects?.length
    ? content.investment.projects.map((project) => ({
        id: project.id,
        category: project.category ?? '',
        title: project.title ?? '',
        fundingTarget: project.fundingTarget ?? '',
        projectedReturn: project.projectedReturn ?? '',
        fundingStatus: project.fundingStatus ?? 0,
        image: project.image ?? '',
      }))
    : fallbackProjects;

  const tabs =
    content?.investment?.modalTabs
      ?.filter((tab) => tab.name && tab.content)
      .map((tab) => ({
        name: tab.name ?? '',
        content: tab.content ?? '',
      })) ?? [];
  const investmentTabs = tabs.length > 0 ? tabs : undefined;
  const whyChooseCards =
    content?.whyChoose?.cards?.map((item) => ({
      title: item.title ?? '',
      description: item.description ?? '',
      icon: item.icon ?? '',
      bottom: item.bottomSpacing,
      order: item.order,
    })) ?? [];
  const transparencySteps =
    content?.transparency?.steps?.map((step) => ({
      title: step.title ?? '',
      desc: step.description ?? '',
      img: step.image ?? '',
    })) ?? [];
  const fundingItems =
    content?.funding?.cards?.map((item) => ({
      title: item.title ?? '',
      description: item.description ?? '',
      background: item.backgroundImage ?? '',
      iconKey: (item.iconKey as 'zap' | 'chart' | 'dollar' | 'heart') ?? 'zap',
    })) ?? [];
  const trustedPartners =
    content?.trusted?.partners?.map((partner) => ({
      name: partner.name ?? '',
      logo: partner.logo ?? '',
      alt: partner.alt ?? '',
    })) ?? [];
  const trustedTestimonials =
    content?.trusted?.testimonials?.map((testimonial) => ({
      id: testimonial.id,
      quote: testimonial.quote ?? '',
      name: testimonial.name ?? '',
      title: testimonial.title ?? '',
      image: testimonial.image ?? '/image/user-test.jpg',
    })) ?? [];
  const contactActions =
    content?.contact?.actions?.map((action) => ({
      title: action.title ?? '',
      description: action.description ?? '',
      type: (action.type as 'booking' | 'email') ?? 'email',
    })) ?? [];

  return (
    <>
      <section className="fade-in">
        <OperatingSystem
          title={content?.operatingSystem?.title}
          subtitle={content?.operatingSystem?.subtitle}
          images={content?.operatingSystem?.images
            ?.filter((item) => item.image)
            .map((item) => ({
              image: item.image ?? '',
              alt: item.alt ?? '',
            }))}
        />
      </section>
      <section className="fade-in">
        <ChooseInfraFund
          title={content?.whyChoose?.title}
          cards={whyChooseCards.length > 0 ? whyChooseCards : undefined}
        />
      </section>
      <section className="fade-in">
        <HeroSection
          heading={content?.transparency?.heading}
          subheading={content?.transparency?.subheading}
          steps={transparencySteps.length > 0 ? transparencySteps : undefined}
        />
      </section>
      <section className="fade-in">
        <FundingSection
          title={content?.funding?.title}
          items={fundingItems.length > 0 ? fundingItems : undefined}
        />
      </section>
      <section className="fade-in">
        <InvestmentPlatform
          title={content?.investment?.title}
          ctaLabel={content?.investment?.ctaLabel}
          ctaLink={content?.investment?.ctaLink}
          projectsData={projects}
          modalTabs={investmentTabs}
        />
      </section>
      <section className="fade-in">
        <TrustedSection
          title={content?.trusted?.title}
          partnersList={
            trustedPartners.length > 0 ? trustedPartners : undefined
          }
          testimonials={
            trustedTestimonials.length > 0 ? trustedTestimonials : undefined
          }
        />
      </section>

      <ContactUsPage
        isopen={isContactOpen}
        setIsOpen={setIsContactOpen}
        heading={content?.contact?.heading}
        subheading={content?.contact?.subheading}
        buttonLabel={content?.contact?.buttonLabel}
        actions={contactActions.length > 0 ? contactActions : undefined}
      />
    </>
  );
}
