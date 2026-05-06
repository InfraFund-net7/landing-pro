import config from '@payload-config';
import { getPayload } from 'payload';

type MediaRelation = null | number | { url?: string };

function mediaUrl(media: MediaRelation): string | undefined {
  if (media && typeof media === 'object' && 'url' in media) return media.url;
  return undefined;
}

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
    steps?: Array<{ title?: string; description?: string; image?: MediaRelation }>;
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
  try {
    const payload = (await getPayload({ config })) as unknown as PayloadWithHomeGlobal;
    const global = (await payload.findGlobal({
      slug: 'home-page',
      depth: 1,
    })) as HomePageGlobalRaw;

    return {
      operatingSystem: {
        title: global.operatingSystem?.title ?? '',
        subtitle: global.operatingSystem?.subtitle ?? '',
        images: toArray(global.operatingSystem?.images).map((item) => ({
          image: mediaUrl(item.image ?? null),
          alt: item.alt ?? '',
        })),
      },
      whyChoose: {
        title: global.whyChoose?.title ?? '',
        cards: toArray(global.whyChoose?.cards).map((item) => ({
          title: item.title ?? '',
          description: item.description ?? '',
          icon: mediaUrl(item.icon ?? null),
          bottomSpacing: item.bottomSpacing ?? '',
          order: typeof item.order === 'number' ? item.order : undefined,
        })),
      },
      transparency: {
        heading: global.transparency?.heading ?? '',
        subheading: global.transparency?.subheading ?? '',
        steps: toArray(global.transparency?.steps).map((item) => ({
          title: item.title ?? '',
          description: item.description ?? '',
          image: mediaUrl(item.image ?? null),
        })),
      },
      funding: {
        title: global.funding?.title ?? '',
        cards: toArray(global.funding?.cards).map((item) => ({
          title: item.title ?? '',
          description: item.description ?? '',
          iconKey: item.iconKey ?? '',
          backgroundImage: mediaUrl(item.backgroundImage ?? null),
        })),
      },
      investment: {
        title: global.investment?.title ?? '',
        ctaLabel: global.investment?.ctaLabel ?? '',
        ctaLink: global.investment?.ctaLink ?? '',
        projects: toArray(global.investment?.projects).map((item, index) => ({
          id: index + 1,
          category: item.category ?? '',
          title: item.title ?? '',
          fundingTarget: item.fundingTarget ?? '',
          projectedReturn: item.projectedReturn ?? '',
          fundingStatus:
            typeof item.fundingStatus === 'number' ? item.fundingStatus : 0,
          image: mediaUrl(item.image ?? null),
        })),
        modalTabs: toArray(global.investment?.modalTabs).map((item) => ({
          name: item.name ?? '',
          content: item.content ?? '',
        })),
      },
      trusted: {
        title: global.trusted?.title ?? '',
        partners: toArray(global.trusted?.partners).map((item) => ({
          name: item.name ?? '',
          logo: mediaUrl(item.logo ?? null),
          alt: item.alt ?? '',
        })),
        testimonials: toArray(global.trusted?.testimonials).map((item, index) => ({
          id: index + 1,
          quote: item.quote ?? '',
          name: item.name ?? '',
          title: item.title ?? '',
          image: mediaUrl(item.avatar ?? null),
        })),
      },
      contact: {
        heading: global.contact?.heading ?? '',
        subheading: global.contact?.subheading ?? '',
        buttonLabel: global.contact?.buttonLabel ?? '',
        actions: toArray(global.contact?.actions).map((item) => ({
          title: item.title ?? '',
          description: item.description ?? '',
          type: item.type ?? '',
        })),
      },
    };
  } catch {
    return null;
  }
}
