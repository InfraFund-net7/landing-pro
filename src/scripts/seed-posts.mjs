import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import config from '../payload.config.js';

const force = process.argv.includes('--force');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const publicDir = path.join(rootDir, 'public');

const posts = [
  {
    slug: 'tokenization-green-assets',
    title: 'Tokenization: Unlocking Liquidity for Green Assets',
    description:
      'The transition to a sustainable future requires unprecedented levels of investment in renewable energy, infrastructure, and nature-based solutions...',
    readTime: '8 min read',
    author: 'John Doe',
    category: 'Tokenization',
    published: true,
    publishedAt: '2024-06-15T09:00:00.000Z',
    imagePath: 'image/solar.jpg',
    mainContent:
      'Tokenization is reshaping how green infrastructure assets are funded, traded, and held. This article outlines how on-chain instruments can improve transparency and liquidity for investors.',
  },
  {
    slug: 'wind-energy-investment',
    title: 'Wind Energy: New Opportunities for Investors',
    description:
      'Wind farms are becoming increasingly attractive for private investors due to advances in turbine technology and government incentives...',
    readTime: '6 min read',
    author: 'Jane Smith',
    category: 'Renewables',
    published: true,
    publishedAt: '2024-07-01T09:00:00.000Z',
    imagePath: 'image/solarpanel.jpg',
  },
  {
    slug: 'rise-of-wind-energy-investments-in-europe',
    title: 'The Rise of Wind Energy Investments in Europe',
    description:
      'Exploring why wind power projects are leading sustainable finance in 2025.',
    readTime: '5 min read',
    author: 'Editorial',
    category: 'Industry',
    published: true,
    publishedAt: '2025-10-19T09:00:00.000Z',
    imagePath: 'image/solar.jpg',
  },
  {
    slug: 'ai-and-the-future-of-creative-industries',
    title: 'AI and the Future of Creative Industries',
    description:
      'How artificial intelligence is reshaping art, music, and design workflows.',
    readTime: '4 min read',
    author: 'Editorial',
    category: 'Research',
    published: true,
    publishedAt: '2025-09-25T09:00:00.000Z',
    imagePath: 'image/blog1.jpg',
  },
  {
    slug: 'sustainable-architecture-in-urban-spaces',
    title: 'Sustainable Architecture in Urban Spaces',
    description:
      'Green buildings are redefining the skylines of modern cities worldwide.',
    readTime: '6 min read',
    author: 'Editorial',
    category: 'Impact',
    published: true,
    publishedAt: '2025-08-08T09:00:00.000Z',
    imagePath: 'image/blog2.jpg',
  },
  {
    slug: 'blockchain-beyond-crypto',
    title: 'Blockchain Beyond Crypto',
    description:
      'Exploring real-world applications of blockchain in supply chains and healthcare.',
    readTime: '3 min read',
    author: 'Editorial',
    category: 'InfraFund',
    published: true,
    publishedAt: '2025-07-12T09:00:00.000Z',
    imagePath: 'image/blog-3.jpg',
  },
];

function absolutePublicPath(relativePath) {
  return path.join(publicDir, relativePath);
}

async function upsertMedia(payload, relativePath, alt) {
  const filePath = absolutePublicPath(relativePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing asset file: ${relativePath}`);
  }

  const filename = path.basename(filePath);
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  });
  if (existing.docs[0]) {
    if (!force) return existing.docs[0].id;
    const updated = await payload.update({
      collection: 'media',
      id: existing.docs[0].id,
      data: { alt },
      filePath,
    });
    return updated.id;
  }

  const created = await payload.create({
    collection: 'media',
    data: { alt },
    filePath,
  });
  return created.id;
}

async function upsertPost(payload, post) {
  const featuredImage = await upsertMedia(payload, post.imagePath, post.title);
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: post.slug } },
    limit: 1,
    depth: 0,
  });

  const data = {
    title: post.title,
    slug: post.slug,
    description: post.description,
    mainContent: post.mainContent ?? '',
    published: post.published,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    author: post.author,
    category: post.category,
    featuredImage,
  };

  if (existing.docs[0]) {
    if (!force) {
      console.log(`post "${post.slug}" exists, skipping (use --force).`);
      return;
    }
    await payload.update({
      collection: 'posts',
      id: existing.docs[0].id,
      data,
    });
    console.log(`post "${post.slug}" updated.`);
    return;
  }

  await payload.create({
    collection: 'posts',
    data,
  });
  console.log(`post "${post.slug}" created.`);
}

async function main() {
  const payload = await getPayload({ config });
  for (const post of posts) {
    await upsertPost(payload, post);
  }
  console.log('posts seed complete.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to seed posts:', error);
    process.exit(1);
  });
