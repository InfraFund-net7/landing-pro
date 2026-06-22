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

const STATIC_IMAGE_PATHS: Record<string, string> = {
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
      imagePath: STATIC_IMAGE_PATHS[contributor.name] ?? '',
    })),
  };
}

function getContributorsBlockFromPage(
  page: CmsSitePage | null | undefined
): AboutUsContributorsContent | null {
  const block = page?.blocks.find(
    (entry) => entry.blockType === 'contributors'
  );
  if (!block?.items?.length) {
    return null;
  }

  const contributors = block.items.reduce<AboutUsContributor[]>((acc, item) => {
    const imagePath = item.imagePath?.trim() || item.image?.trim() || '';
    if (!item.name?.trim()) {
      return acc;
    }

    acc.push({
      name: item.name.trim(),
      role: item.role?.trim() ?? '',
      description: item.description?.trim() ?? '',
      linkedin: item.linkedin?.trim() ?? '',
      imagePath,
      ...(item.image?.trim() ? { imageUrl: item.image.trim() } : {}),
    });

    return acc;
  }, []);

  if (contributors.length === 0) {
    return null;
  }

  return {
    title: block.title?.trim() || DEFAULT_TITLE,
    subtitle: block.subtitle?.trim() || DEFAULT_SUBTITLE,
    contributors,
  };
}

export function toDisplayContributors(
  content: AboutUsContributorsContent | null | undefined
): AboutUsDisplayContributor[] {
  const source = content?.contributors?.length
    ? content.contributors
    : getDefaultAboutUsContributorsContent().contributors;

  return source.map((contributor) => ({
    img: contributor.imageUrl || contributor.imagePath,
    name: contributor.name,
    role: contributor.role,
    description: contributor.description,
    linkedin: contributor.linkedin,
  }));
}

export function resolveAboutUsContributorsContent(
  page: CmsSitePage | null | undefined
): AboutUsContributorsContent {
  return (
    getContributorsBlockFromPage(page) ?? getDefaultAboutUsContributorsContent()
  );
}
