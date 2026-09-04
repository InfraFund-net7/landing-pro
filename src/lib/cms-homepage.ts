import config from '@payload-config';
import { getPayload } from 'payload';
import { cmsMediaFromRelation } from '@/lib/cms-media-url';
import { shouldFetchHomePageFromCms } from '@/lib/cms-runtime';
import { skipPayloadFetchAtBuild } from '@/lib/skip-payload-fetch-at-build';

type MediaRelation = null | number | { url?: string | null };

function toArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

export type HomePageContent = {
  operatingSystem?: {
    title?: string;
    subtitle?: string;
    images?: Array<{ image?: string; alt?: string }>;
  };
  whyChoose?: {
    title?: string;
    cards?: Array<{
      title?: string;
      description?: string;
      icon?: string;
      bottomSpacing?: string;
      order?: number;
    }>;
  };
  transparency?: {
    heading?: string;
    subheading?: string;
    steps?: Array<{ title?: string; description?: string; image?: string }>;
  };
  funding?: {
    title?: string;
    cards?: Array<{
      title?: string;
      description?: string;
      iconKey?: string;
      backgroundImage?: string;
    }>;
  };
  investment?: {
    title?: string;
    ctaLabel?: string;
    ctaLink?: string;
    projects?: Array<{
      id: number;
      category?: string;
      title?: string;
      fundingTarget?: string;
      projectedReturn?: string;
      fundingStatus?: number;
      image?: string;
    }>;
    modalTabs?: Array<{ name?: string; content?: string }>;
  };
  trusted?: {
    title?: string;
    partners?: Array<{ name?: string; logo?: string; alt?: string }>;
    testimonials?: Array<{
      id: number;
      quote?: string;
      name?: string;
      title?: string;
      image?: string;
    }>;
  };
  contact?: {
    heading?: string;
    subheading?: string;
    buttonLabel?: string;
    actions?: Array<{ title?: string; description?: string; type?: string }>;
  };
};

type HomePageGlobalRaw = {
  operatingSystem?: {
    title?: string;
    subtitle?: string;
    images?: Array<{ image?: MediaRelation; alt?: string }>;
  };
  whyChoose?: {
    title?: string;
    cards?: Array<{
      title?: string;
      description?: string;
      icon?: MediaRelation;
      bottomSpacing?: string;
      order?: number;
    }>;
  };
  transparency?: {
    heading?: string;
    subheading?: string;
    steps?: Array<{
      title?: string;
      description?: string;
      image?: MediaRelation;
    }>;
  };
  funding?: {
    title?: string;
    cards?: Array<{
      title?: string;
      description?: string;
      iconKey?: string;
      backgroundImage?: MediaRelation;
    }>;
  };
  investment?: {
    title?: string;
    ctaLabel?: string;
    ctaLink?: string;
    projects?: Array<{
      category?: string;
      title?: string;
      fundingTarget?: string;
      projectedReturn?: string;
      fundingStatus?: number;
      image?: MediaRelation;
    }>;
    modalTabs?: Array<{ name?: string; content?: string }>;
  };
  trusted?: {
    title?: string;
    partners?: Array<{ name?: string; logo?: MediaRelation; alt?: string }>;
    testimonials?: Array<{
      quote?: string;
      name?: string;
      title?: string;
      avatar?: MediaRelation;
    }>;
  };
  contact?: {
    heading?: string;
    subheading?: string;
    buttonLabel?: string;
    actions?: Array<{ title?: string; description?: string; type?: string }>;
  };
};

type PayloadWithHomeGlobal = {
  findGlobal: (args: { slug: string; depth: number }) => Promise<unknown>;
};

export async function fetchHomePageContent(): Promise<HomePageContent | null> {
  if (!shouldFetchHomePageFromCms()) return null;
  if (skipPayloadFetchAtBuild()) return null;
  try {
    const payload = (await getPayload({
      config,
    })) as unknown as PayloadWithHomeGlobal;
    const global = (await payload.findGlobal({
      slug: 'home-page',
      depth: 1,
    })) as HomePageGlobalRaw;

    return {
      operatingSystem: {
        title: global.operatingSystem?.title || undefined,
        subtitle: global.operatingSystem?.subtitle || undefined,
        images: toArray(global.operatingSystem?.images).map((item) => ({
          image: cmsMediaFromRelation(item.image ?? null),
          alt: item.alt || undefined,
        })),
      },
      whyChoose: {
        title: global.whyChoose?.title || undefined,
        cards: toArray(global.whyChoose?.cards).map((item) => ({
          title: item.title || undefined,
          description: item.description || undefined,
          icon: cmsMediaFromRelation(item.icon ?? null),
          bottomSpacing: item.bottomSpacing || undefined,
          order: typeof item.order === 'number' ? item.order : undefined,
        })),
      },
      transparency: {
        heading: global.transparency?.heading || undefined,
        subheading: global.transparency?.subheading || undefined,
        steps: toArray(global.transparency?.steps).map((item) => ({
          title: item.title || undefined,
          description: item.description || undefined,
          image: cmsMediaFromRelation(item.image ?? null),
        })),
      },
      funding: {
        title: global.funding?.title || undefined,
        cards: toArray(global.funding?.cards).map((item) => ({
          title: item.title || undefined,
          description: item.description || undefined,
          iconKey: item.iconKey || undefined,
          backgroundImage: cmsMediaFromRelation(item.backgroundImage ?? null),
        })),
      },
      investment: {
        title: global.investment?.title || undefined,
        ctaLabel: global.investment?.ctaLabel || undefined,
        ctaLink: global.investment?.ctaLink || undefined,
        projects: toArray(global.investment?.projects).map((item, index) => ({
          id: index + 1,
          category: item.category || undefined,
          title: item.title || undefined,
          fundingTarget: item.fundingTarget || undefined,
          projectedReturn: item.projectedReturn || undefined,
          fundingStatus:
            typeof item.fundingStatus === 'number' ? item.fundingStatus : 0,
          image: cmsMediaFromRelation(item.image ?? null),
        })),
        modalTabs: toArray(global.investment?.modalTabs).map((item) => ({
          name: item.name || undefined,
          content: item.content || undefined,
        })),
      },
      trusted: {
        title: global.trusted?.title || undefined,
        partners: toArray(global.trusted?.partners).map((item) => ({
          name: item.name || undefined,
          logo: cmsMediaFromRelation(item.logo ?? null),
          alt: item.alt || undefined,
        })),
        testimonials: toArray(global.trusted?.testimonials).map(
          (item, index) => ({
            id: index + 1,
            quote: item.quote || undefined,
            name: item.name || undefined,
            title: item.title || undefined,
            image: cmsMediaFromRelation(item.avatar ?? null),
          })
        ),
      },
      contact: {
        heading: global.contact?.heading || undefined,
        subheading: global.contact?.subheading || undefined,
        buttonLabel: global.contact?.buttonLabel || undefined,
        actions: toArray(global.contact?.actions).map((item) => ({
          title: item.title || undefined,
          description: item.description || undefined,
          type: item.type || undefined,
        })),
      },
    };
  } catch {
    return null;
  }
}
