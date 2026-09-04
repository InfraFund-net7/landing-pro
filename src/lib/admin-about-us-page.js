import {
  getDefaultAboutUsContributorsContent,
  normalizeContributorImageForStorage,
} from '@/lib/about-us-cms';
import { revalidateMarketingPath } from '@/lib/revalidate-marketing-path.js';

const ABOUT_US_SLUG = 'about-us';

function normalizeContributorName(name) {
  return String(name || '')
    .trim()
    .toLowerCase();
}

function dedupeContributorsByName(contributors) {
  const byName = new Map();

  for (const contributor of contributors) {
    const key = normalizeContributorName(contributor.name);
    if (!key) continue;
    byName.set(key, contributor);
  }

  return [...byName.values()];
}

/**
 * @param {import('payload').Payload} payload
 */
async function findAboutUsPageDoc(payload) {
  const { docs } = await payload.find({
    collection: 'site-pages',
    where: {
      slug: { equals: ABOUT_US_SLUG },
    },
    depth: 1,
    limit: 1,
  });

  return docs[0] ?? null;
}

/**
 * @param {unknown} blocks
 */
function getContributorsBlocks(blocks) {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks.filter((block) => block?.blockType === 'contributors');
}

/**
 * @param {unknown} blocks
 */
function findContributorsBlockIndex(blocks) {
  if (!Array.isArray(blocks)) {
    return -1;
  }

  return blocks.findIndex((block) => block?.blockType === 'contributors');
}

/**
 * @param {import('payload').Payload} payload
 */
export async function fetchAboutUsContributorsForAdmin(payload) {
  const doc = await findAboutUsPageDoc(payload);
  if (!doc) {
    return {
      ...getDefaultAboutUsContributorsContent(),
      seeded: false,
    };
  }

  const blockIndex = findContributorsBlockIndex(doc.blocks);
  const contributorBlocks = getContributorsBlocks(doc.blocks);
  const block =
    contributorBlocks.length > 0
      ? contributorBlocks[contributorBlocks.length - 1]
      : blockIndex >= 0 && Array.isArray(doc.blocks)
        ? doc.blocks[blockIndex]
        : null;

  if (!block?.items?.length) {
    return {
      title: 'InfraFund Contributors',
      subtitle:
        'A world-class team built to bridge the worlds of traditional infrastructure and decentralized finance',
      contributors: [],
      seeded: true,
    };
  }

  const contributors = dedupeContributorsByName(
    (block.items ?? [])
      .map((item) => {
        const imagePath = String(item?.imagePath || '').trim();
        const imageUrl =
          typeof item?.image === 'object' && item.image?.url
            ? String(item.image.url).trim()
            : '';

        if (!String(item?.name || '').trim()) {
          return null;
        }

        return {
          name: String(item.name).trim(),
          role: String(item.role || '').trim(),
          description: String(item.description || '').trim(),
          linkedin: String(item.linkedin || '').trim(),
          imagePath: imagePath || imageUrl,
          imageUrl: imageUrl || undefined,
        };
      })
      .filter(Boolean)
  );

  if (contributors.length === 0) {
    return {
      title: String(block.title || 'InfraFund Contributors').trim(),
      subtitle: String(
        block.subtitle ||
          'A world-class team built to bridge the worlds of traditional infrastructure and decentralized finance'
      ).trim(),
      contributors: [],
      seeded: true,
    };
  }

  return {
    title: String(block.title || 'InfraFund Contributors').trim(),
    subtitle: String(
      block.subtitle ||
        'A world-class team built to bridge the worlds of traditional infrastructure and decentralized finance'
    ).trim(),
    contributors,
    seeded: true,
  };
}

/**
 * @param {import('payload').Payload} payload
 * @param {import('payload').TypedUser} user
 * @param {{ title: string; subtitle: string; contributors: Array<{ name: string; role: string; description: string; linkedin: string; imagePath: string; }> }} data
 */
export async function saveAboutUsContributorsForAdmin(payload, user, data) {
  const title = String(data.title || '').trim();
  const subtitle = String(data.subtitle || '').trim();
  const contributors = Array.isArray(data.contributors)
    ? data.contributors
    : [];

  if (!title) {
    return { ok: false, error: 'Section title is required.' };
  }

  if (contributors.length === 0) {
    return { ok: false, error: 'Add at least one contributor.' };
  }

  for (const [index, contributor] of contributors.entries()) {
    if (!String(contributor.name || '').trim()) {
      return { ok: false, error: `Contributor ${index + 1} needs a name.` };
    }
    if (!String(contributor.role || '').trim()) {
      return { ok: false, error: `Contributor ${index + 1} needs a role.` };
    }
    if (
      !String(contributor.imagePath || '').trim() &&
      !String(contributor.imageUrl || '').trim()
    ) {
      return {
        ok: false,
        error: `Contributor ${index + 1} needs a photo.`,
      };
    }
  }

  const contributorItems = contributors.map((contributor) => {
    const name = String(contributor.name).trim();
    const imagePath = String(
      contributor.imagePath || contributor.imageUrl || ''
    ).trim();

    return {
      name,
      role: String(contributor.role).trim(),
      description: String(contributor.description || '').trim(),
      linkedin: String(contributor.linkedin || '').trim(),
      imagePath: normalizeContributorImageForStorage(
        name,
        imagePath,
        contributor.imageUrl
      ),
    };
  });

  const contributorsBlock = {
    blockType: 'contributors',
    title,
    subtitle,
    items: contributorItems,
  };

  const existing = await findAboutUsPageDoc(payload);

  if (existing) {
    const blocks = Array.isArray(existing.blocks)
      ? existing.blocks.filter((block) => block?.blockType !== 'contributors')
      : [];

    blocks.push(contributorsBlock);

    await payload.update({
      collection: 'site-pages',
      id: existing.id,
      data: { blocks, replaceExistingPage: false },
      user,
      overrideAccess: false,
    });

    await revalidateMarketingPath('/about-us');

    return { ok: true };
  }

  await payload.create({
    collection: 'site-pages',
    data: {
      title: 'About Us',
      slug: ABOUT_US_SLUG,
      replaceExistingPage: false,
      blocks: [contributorsBlock],
    },
    user,
    overrideAccess: false,
  });

  await revalidateMarketingPath('/about-us');

  return { ok: true };
}
