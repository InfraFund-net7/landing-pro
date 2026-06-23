import type { StaticImageData } from 'next/image';
import { contributors as staticContributors } from '@/data/contributors';
import type { CmsSitePage } from '@/lib/cms-site-pages';

export type AboutUsContributor = {
  name: string;
  role: string;
  description: string;
  linkedin: string;
  imagePath: string;
  imageUrl?: string;
};

export type AboutUsContributorsContent = {
  title: string;
  subtitle: string;
  contributors: AboutUsContributor[];
};

type AboutUsDisplayContributor = {
  img: string | StaticImageData;
  name: string;
  role: string;
  description: string;
  linkedin: string;
};

const DEFAULT_TITLE = 'InfraFund Contributors';
const DEFAULT_SUBTITLE =
  'A world-class team built to bridge the worlds of traditional infrastructure and decentralized finance';

const CONTRIBUTOR_STATIC_IMAGE_PATHS: Record<string, string> = {
  'Iman Alibeigi': '/image/contributors/Iman-Alibeigi.png',
  'Sven Meyer': '/image/contributors/Sven-Meyer.png',
  'Prof. Akbar Javadi': '/image/contributors/Akbar-Javadi.png',
  'Jed Dahlke': '/image/contributors/Jed-Dahlke.png',
  'Dr. Yifeng Tian': '/image/contributors/Yifeng-Tian.png',
  'Natalia Ismagilova': '/image/contributors/Natalia-Ismagilova.png',
  'Luke Lang': '/image/contributors/Luke-Lang.png',
  'James Cater': '/image/contributors/James-Cater.png',
  'Kambis Kohansal': '/image/contributors/Kambis-Kohansal.png',
  'Nicholas Pearson': '/image/contributors/Nicholas-Pearson.png',
  'Dr. Pooria Ghadir': '/image/contributors/Pooria-Ghadir.png',
  'Amirreza Zareian': '/image/contributors/Amirreza-Zareian.jpg',
  'Javad Rajabzadeh': '/image/contributors/Javad-Rajabzadeh.jpg',
  'Sajad Salehi': '/image/contributors/Sajad-Salehi.png',
  'Shervin Mansouri': '/image/contributors/Shervin-Mansouri.png',
};

export function getDefaultAboutUsContributorsContent(): AboutUsContributorsContent {
  return {
    title: DEFAULT_TITLE,
    subtitle: DEFAULT_SUBTITLE,
    contributors: staticContributors.map((contributor) => ({
      name: contributor.name,
      role: contributor.role,
      description: contributor.description,
      linkedin: contributor.linkedin,
      imagePath: CONTRIBUTOR_STATIC_IMAGE_PATHS[contributor.name] ?? '',
    })),
  };
}

function normalizeContributorName(name: string): string {
  return name.trim().toLowerCase();
}

function dedupeContributorsByName(
  contributors: AboutUsContributor[]
): AboutUsContributor[] {
  const byName = new Map<string, AboutUsContributor>();

  for (const contributor of contributors) {
    const key = normalizeContributorName(contributor.name);
    if (!key) continue;
    byName.set(key, contributor);
  }

  return [...byName.values()];
}

function mapBlockItemToContributor(
  item: NonNullable<NonNullable<CmsSitePage['blocks'][number]['items']>[number]>
): AboutUsContributor | null {
  const imagePath = item.imagePath?.trim() || item.image?.trim() || '';
  if (!item.name?.trim()) {
    return null;
  }

  return {
    name: item.name.trim(),
    role: item.role?.trim() ?? '',
    description: item.description?.trim() ?? '',
    linkedin: item.linkedin?.trim() ?? '',
    imagePath,
    ...(item.image?.trim() ? { imageUrl: item.image.trim() } : {}),
  };
}

function getContributorsBlocksFromPage(
  page: CmsSitePage | null | undefined
): NonNullable<CmsSitePage['blocks'][number]>[] {
  return (page?.blocks ?? []).filter(
    (block) => block.blockType === 'contributors'
  );
}

function resolveContributorImageSrc(
  contributor: Pick<AboutUsContributor, 'name' | 'imagePath' | 'imageUrl'>
): string {
  const staticPath = CONTRIBUTOR_STATIC_IMAGE_PATHS[contributor.name.trim()];
  if (staticPath) {
    return staticPath;
  }

  const path = contributor.imagePath?.trim() ?? '';
  if (path.startsWith('/image/')) {
    return path;
  }

  const remote = contributor.imageUrl?.trim() ?? '';
  if (remote && !remote.includes('/cms/api/media/file/')) {
    return remote;
  }

  if (path && !path.includes('/cms/api/media/file/')) {
    return path;
  }

  return remote || path || '/placeholder.svg';
}

export function normalizeContributorImageForStorage(
  name: string,
  imagePath: string,
  imageUrl?: string
): string {
  const staticPath = CONTRIBUTOR_STATIC_IMAGE_PATHS[name.trim()];
  if (staticPath) {
    return staticPath;
  }

  const path = imagePath.trim() || imageUrl?.trim() || '';
  if (path.startsWith('/image/')) {
    return path;
  }

  return path;
}

function getContributorsBlockFromPage(
  page: CmsSitePage | null | undefined
): AboutUsContributorsContent | null {
  const contributorBlocks = getContributorsBlocksFromPage(page);
  if (contributorBlocks.length === 0) {
    return null;
  }

  const primaryBlock = contributorBlocks[contributorBlocks.length - 1];
  const contributors = dedupeContributorsByName(
    (primaryBlock.items ?? []).reduce<AboutUsContributor[]>((acc, item) => {
      const contributor = mapBlockItemToContributor(item);
      if (contributor) {
        acc.push(contributor);
      }
      return acc;
    }, [])
  );

  if (contributors.length === 0) {
    return null;
  }

  return {
    title: primaryBlock.title?.trim() || DEFAULT_TITLE,
    subtitle: primaryBlock.subtitle?.trim() || DEFAULT_SUBTITLE,
    contributors,
  };
}

export function toDisplayContributors(
  content: AboutUsContributorsContent | null | undefined
): AboutUsDisplayContributor[] {
  return (content?.contributors ?? []).map((contributor) => ({
    img: resolveContributorImageSrc(contributor),
    name: contributor.name,
    role: contributor.role,
    description: contributor.description,
    linkedin: contributor.linkedin,
  }));
}

export function resolveAboutUsContributorsContent(
  page: CmsSitePage | null | undefined
): AboutUsContributorsContent {
  if (!page) {
    return getDefaultAboutUsContributorsContent();
  }

  return (
    getContributorsBlockFromPage(page) ?? {
      title: DEFAULT_TITLE,
      subtitle: DEFAULT_SUBTITLE,
      contributors: [],
    }
  );
}
