import config from '@payload-config';
import { getPayload } from 'payload';
import { cmsMediaFromRelation } from '@/lib/cms-media-url';
import {
  isCmsPageReplacementEnabled,
  shouldFetchSitePagesFromCms,
} from '@/lib/cms-runtime';
import { skipPayloadFetchAtBuild } from '@/lib/skip-payload-fetch-at-build';

type MediaRelation = null | number | { url?: string | null };

export { isCmsPageReplacementEnabled };

type SitePageRaw = {
  title?: string;
  slug?: string;
  replaceExistingPage?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalPath?: string;
  };
  hero?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    backgroundImage?: MediaRelation;
  };
  sections?: Array<{
    heading?: string;
    body?: string;
    image?: MediaRelation;
    ctaLabel?: string;
    ctaLink?: string;
  }>;
  blocks?: Array<{
    blockType?: 'feature-grid' | 'faq' | 'timeline' | 'contributors' | 'cta';
    title?: string;
    subtitle?: string;
    description?: string;
    buttonLabel?: string;
    buttonLink?: string;
    items?: Array<{
      id?: string;
      title?: string;
      question?: string;
      answer?: string;
      description?: string;
      icon?: MediaRelation;
      iconPath?: string;
      period?: string;
      name?: string;
      role?: string;
      linkedin?: string;
      image?: MediaRelation;
      imagePath?: string;
    }>;
  }>;
};

export type CmsSitePage = {
  title: string;
  slug: string;
  replaceExistingPage: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalPath?: string;
  };
  hero?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    backgroundImage?: string;
  };
  sections: Array<{
    heading: string;
    body: string;
    image?: string;
    ctaLabel?: string;
    ctaLink?: string;
  }>;
  blocks: Array<{
    blockType: 'feature-grid' | 'faq' | 'timeline' | 'contributors' | 'cta';
    title?: string;
    subtitle?: string;
    description?: string;
    buttonLabel?: string;
    buttonLink?: string;
    items?: Array<{
      id?: string;
      title?: string;
      question?: string;
      answer?: string;
      description?: string;
      icon?: string;
      iconPath?: string;
      period?: string;
      name?: string;
      role?: string;
      linkedin?: string;
      image?: string;
      imagePath?: string;
    }>;
  }>;
};

type PayloadWithSitePages = {
  find: (args: {
    collection: 'site-pages';
    where: unknown;
    depth: number;
    limit: number;
  }) => Promise<{ docs: SitePageRaw[] }>;
};

export async function fetchSitePageBySlug(
  slug: string
): Promise<CmsSitePage | null> {
  if (!shouldFetchSitePagesFromCms()) return null;
  if (skipPayloadFetchAtBuild()) return null;
  try {
    const payload = (await getPayload({
      config,
    })) as unknown as PayloadWithSitePages;
    const { docs } = await payload.find({
      collection: 'site-pages',
      where: {
        slug: { equals: slug },
      },
      depth: 1,
      limit: 1,
    });

    const doc = docs[0];
    if (!doc) return null;

    return {
      title: doc.title ?? '',
      slug: doc.slug ?? slug,
      replaceExistingPage: Boolean(doc.replaceExistingPage),
      seo: doc.seo
        ? {
            metaTitle: doc.seo.metaTitle ?? '',
            metaDescription: doc.seo.metaDescription ?? '',
            canonicalPath: doc.seo.canonicalPath ?? '',
          }
        : undefined,
      hero: doc.hero
        ? {
            eyebrow: doc.hero.eyebrow ?? '',
            heading: doc.hero.heading ?? '',
            subheading: doc.hero.subheading ?? '',
            backgroundImage: cmsMediaFromRelation(
              doc.hero.backgroundImage ?? null
            ),
          }
        : undefined,
      sections: (doc.sections ?? []).map((section) => ({
        heading: section.heading ?? '',
        body: section.body ?? '',
        image: cmsMediaFromRelation(section.image ?? null),
        ctaLabel: section.ctaLabel ?? '',
        ctaLink: section.ctaLink ?? '',
      })),
      blocks: (doc.blocks ?? [])
        .filter((block): block is NonNullable<typeof block> =>
          Boolean(
            block?.blockType &&
              [
                'feature-grid',
                'faq',
                'timeline',
                'contributors',
                'cta',
              ].includes(block.blockType)
          )
        )
        .map((block) => ({
          blockType: block.blockType as
            | 'feature-grid'
            | 'faq'
            | 'timeline'
            | 'contributors'
            | 'cta',
          title: block.title ?? '',
          subtitle: block.subtitle ?? '',
          description: block.description ?? '',
          buttonLabel: block.buttonLabel ?? '',
          buttonLink: block.buttonLink ?? '',
          items: (block.items ?? []).map((item) => ({
            id: item.id ?? '',
            title: item.title ?? '',
            question: item.question ?? '',
            answer: item.answer ?? '',
            description: item.description ?? '',
            icon: cmsMediaFromRelation(item.icon ?? null),
            iconPath: item.iconPath ?? '',
            period: item.period ?? '',
            name: item.name ?? '',
            role: item.role ?? '',
            linkedin: item.linkedin ?? '',
            image: cmsMediaFromRelation(item.image ?? null),
            imagePath: item.imagePath ?? '',
          })),
        })),
    };
  } catch {
    return null;
  }
}
