import fs from 'fs';
import net from 'net';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import config from '../payload.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const publicDir = path.join(rootDir, 'public');

const force = process.argv.includes('--force');
let fatalErrorHandled = false;

process.on('unhandledRejection', (reason) => {
  if (fatalErrorHandled) return;
  fatalErrorHandled = true;
  console.error('Unhandled rejection while seeding home-page:', reason);
  process.exitCode = 1;
});

const operatingSystemDefaults = {
  title: 'The Single Operating System for Real-World Energy Asset Tokenization',
  subtitle: 'From real-world assets to digital tokens in simple approach.',
  images: [
    { relativePath: 'image/factory.jpg', alt: 'Factory' },
    { relativePath: 'image/wind-turbin.jpg', alt: 'Wind Turbine' },
    { relativePath: 'image/geo-thermal.jpg', alt: 'Solar Farm' },
    { relativePath: 'image/solarpanel.jpg', alt: 'Solar Panels' },
  ],
};

const whyChooseDefaults = {
  title: 'Why Choose InfraFund?',
  cards: [
    {
      title: 'Unlock the Private Market',
      description:
        'Gain direct access to vetted, high-impact renewable energy infrastructure—an asset class previously reserved for institutional players.',
      iconPath: 'svg/unlock-private.svg',
      bottomSpacing: '70px',
      order: 1,
    },
    {
      title: 'Finance at the Speed of a Click',
      description:
        'Our platform connects you directly to project builders, removing costly intermediaries and cutting fundraising timelines from years to weeks.',
      iconPath: 'svg/finance.svg',
      order: 2,
    },
    {
      title: 'Invest with Confidence',
      description:
        'Monitor project progress and financial transactions in real-time. Our AI-driven Digital Twin provides unparalleled transparency into asset performance.',
      iconPath: 'svg/invest.svg',
      bottomSpacing: '70px',
      order: 3,
    },
    {
      title: 'Shape the Future',
      description:
        'Participate in key project decisions through our DAO-based governance model. Your investment gives you a voice.',
      iconPath: 'svg/shape-future.svg',
      order: 4,
    },
  ],
};

const transparencyDefaults = {
  heading: 'Powered by Radical Transparency',
  subheading:
    'Our technology unlocks trust, efficiency, and accessibility for green finance.',
  steps: [
    {
      title: 'AI-Driven Digital Twin',
      description:
        'Our "secret sauce." We create a dynamic virtual model of every project, providing live performance data and predictive risk analysis to de-risk your investment.',
      imagePath: 'image/ai-digital.jpg',
    },
    {
      title: 'RWA Tokenization',
      description:
        'We use enterprise-grade, compliance-aware token standards to convert illiquid physical assets into liquid, tradable digital securities.',
      imagePath: 'image/rwa-tokenization.jpg',
    },
    {
      title: 'DAO Governance',
      description:
        'We are building a future where project governance is decentralized. Token holders can vote on key decisions, turning investors into true project advocates.',
      imagePath: 'image/radical-transparency.jpg',
    },
  ],
};

const fundingDefaults = {
  title: 'Flexible Funding for a Diverse Market',
  cards: [
    {
      title: 'Pre-Sale of Energy',
      description:
        'Our flagship model. Fund the development of new renewable energy projects by pre-purchasing their future energy output at a discounted rate. A direct, impactful way to accelerate the NetZero transition.',
      iconKey: 'zap',
      backgroundImagePath: 'image/pre-sale.jpg',
    },
    {
      title: 'Equity-Based',
      description:
        'For accredited investors. Purchase digital tokens that represent a direct equity or debt stake in a project, offering traditional financial returns.',
      iconKey: 'chart',
      backgroundImagePath: 'image/security-base.jpg',
    },
    {
      title: 'Loan-Based',
      description:
        'Provide debt financing to projects and earn a fixed return as the loan is repaid. A stable, lower-risk option.',
      iconKey: 'dollar',
      backgroundImagePath: 'image/loan.jpg',
    },
    {
      title: 'Charity-Based',
      description:
        'Directly support high-impact, non-profit environmental projects where the primary return is a measurable contribution to our planet.',
      iconKey: 'heart',
      backgroundImagePath: 'image/charity.jpg',
    },
  ],
};

const investmentDefaults = {
  title: 'Invest in the Future, Today',
  ctaLabel: 'Explore All Projects',
  ctaLink: '/project',
  projects: [
    {
      category: 'Solar Energy',
      title: 'Solar Home California, USA',
      fundingTarget: '$18M',
      projectedReturn: '6.5%',
      fundingStatus: 68,
      imagePath: 'image/project1.jpg',
    },
    {
      category: 'Wind Energy',
      title: 'North Sea Wind Farm, Denmark',
      fundingTarget: '$25M',
      projectedReturn: '7%',
      fundingStatus: 52,
      imagePath: 'image/project2.jpg',
    },
    {
      category: 'Solar Energy',
      title: 'Solar Rooftops, UK',
      fundingTarget: '$15M',
      projectedReturn: '6.2%',
      fundingStatus: 62,
      imagePath: 'image/project3.png',
    },
  ],
  modalTabs: [
    {
      name: 'Overview',
      content:
        'The North Sea Wind Project by WindNetZero is one of the largest offshore wind farms in Europe...',
    },
    {
      name: 'Financials',
      content: 'This project has a total investment size of £350M...',
    },
    {
      name: 'Technical',
      content: 'The project utilizes advanced 14MW offshore wind turbines...',
    },
    {
      name: 'Documents',
      content: 'You can access all official project documents...',
    },
  ],
};

const trustedDefaults = {
  title: 'Trusted by Leaders in Innovation',
  partners: [
    'InfraFund-University-of-Exeter.svg',
    'InfraFund-SETsquared.svg',
    'InfraFund-autodesk-technology-impact.svg',
    'InfraFund-Microsoft.svg',
    'InfraFund-Microsoft-For-Startup.svg',
    'InfraFund-Exeter-Innovation.svg',
    'InfraFund-Innovate-UK.svg',
    'InfraFund-ICURe.svg',
    'InfraFund-Uniswap.svg',
    'InfraFund-Uniswap-Hook-Incubator.svg',
    'InfraFund-Scaling-the-Edge.svg',
    'InfraFund-the-helix-way.svg',
    'InfraFund-uk-parliamnet.svg',
    'InfraFund-Growth-Forge-Accelerator.svg',
    'InfraFund-TechSouthWest.svg',
    'InfraFund-Exeter-Student-Startup.svg',
    'InfraFund-Midlands-Innovation.svg',
    'InfraFund-Santander.svg',
    'InfraFund-Exeter-Sustainability-Awards.svg',
    'InfraFund-Soonami.io.svg',
  ].map((filename) => ({
    name: filename.replace('.svg', ''),
    alt: filename.replace('.svg', ''),
    logoPath: `svg/collaborate/${filename}`,
  })),
  testimonials: [
    {
      quote:
        'The ability to automate milestone payments through smart contracts is a massive step forward. It will eliminate payment delays, improve our cash flow, and allow us to focus on what we do best: building.',
      name: 'Test',
      title: 'EPC Contractor, Exeter',
      avatarPath: 'image/user-test.jpg',
    },
    {
      quote:
        "For the first time, the AI-Driven Digital Twin gives us real-time, trusted data on a project's performance. This level of transparency de-risks the investment and gives us the confidence to back the next generation of green assets.",
      name: 'Luke Lang',
      title: 'Angel Investor, England',
      avatarPath: 'image/user-test.jpg',
    },
    {
      quote:
        "InfraFund's platform is set to revolutionise how we finance renewable energy projects. Slashing funding time from years to weeks will accelerate our ability to deploy green infrastructure and help us reach our NetZero goals faster",
      name: 'Sarah Johnson',
      title: 'Renewable Energy Developer, UK',
      avatarPath: 'image/user-test.jpg',
    },
  ],
};

const contactDefaults = {
  heading: "Let's Build the Green Future Together",
  subheading:
    "Whether you're an investor ready to make an impact or a builder with a vision, we're here to help.",
  buttonLabel: 'Contact Us',
  actions: [
    {
      title: 'Book a Meeting',
      description: 'Speak directly with an account manager',
      type: 'booking',
    },
    {
      title: 'Send an Email',
      description: 'Get a response within 24 hours',
      type: 'email',
    },
  ],
};

function absolutePublicPath(relativePath) {
  return path.join(publicDir, relativePath);
}

function parseDatabaseEndpointFromUrl(databaseUrl) {
  if (!databaseUrl) return null;
  try {
    const parsed = new URL(databaseUrl);
    return {
      host: parsed.hostname,
      port: Number(parsed.port || 5432),
    };
  } catch {
    return null;
  }
}

async function assertDatabaseReachable(databaseUrl) {
  const endpoint = parseDatabaseEndpointFromUrl(databaseUrl);
  if (!endpoint) return;

  await new Promise((resolve, reject) => {
    const socket = net.createConnection(endpoint, () => {
      socket.end();
      resolve();
    });

    socket.setTimeout(2500);
    socket.on('timeout', () => {
      socket.destroy();
      reject(
        new Error(
          `Database timeout at ${endpoint.host}:${endpoint.port}. Check DATABASE_URL and ensure Postgres is running.`
        )
      );
    });
    socket.on('error', () => {
      reject(
        new Error(
          `Cannot reach database at ${endpoint.host}:${endpoint.port}. Start Postgres (or Docker services) and retry.`
        )
      );
    });
  });
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

async function buildSeedData(payload) {
  const operatingImages = [];
  for (const item of operatingSystemDefaults.images) {
    operatingImages.push({
      image: await upsertMedia(payload, item.relativePath, item.alt),
      alt: item.alt,
    });
  }

  const whyChooseCards = [];
  for (const card of whyChooseDefaults.cards) {
    whyChooseCards.push({
      title: card.title,
      description: card.description,
      icon: await upsertMedia(payload, card.iconPath, card.title),
      bottomSpacing: card.bottomSpacing,
      order: card.order,
    });
  }

  const transparencySteps = [];
  for (const step of transparencyDefaults.steps) {
    transparencySteps.push({
      title: step.title,
      description: step.description,
      image: await upsertMedia(payload, step.imagePath, step.title),
    });
  }

  const fundingCards = [];
  for (const card of fundingDefaults.cards) {
    fundingCards.push({
      title: card.title,
      description: card.description,
      iconKey: card.iconKey,
      backgroundImage: await upsertMedia(
        payload,
        card.backgroundImagePath,
        card.title
      ),
    });
  }

  const investmentProjects = [];
  for (const project of investmentDefaults.projects) {
    investmentProjects.push({
      category: project.category,
      title: project.title,
      fundingTarget: project.fundingTarget,
      projectedReturn: project.projectedReturn,
      fundingStatus: project.fundingStatus,
      image: await upsertMedia(payload, project.imagePath, project.title),
    });
  }

  const trustedPartners = [];
  for (const partner of trustedDefaults.partners) {
    trustedPartners.push({
      name: partner.name,
      alt: partner.alt,
      logo: await upsertMedia(payload, partner.logoPath, partner.alt),
    });
  }

  const trustedTestimonials = [];
  for (const testimonial of trustedDefaults.testimonials) {
    trustedTestimonials.push({
      quote: testimonial.quote,
      name: testimonial.name,
      title: testimonial.title,
      avatar: await upsertMedia(
        payload,
        testimonial.avatarPath,
        testimonial.name
      ),
    });
  }

  return {
    operatingSystem: {
      title: operatingSystemDefaults.title,
      subtitle: operatingSystemDefaults.subtitle,
      images: operatingImages,
    },
    whyChoose: {
      title: whyChooseDefaults.title,
      cards: whyChooseCards,
    },
    transparency: {
      heading: transparencyDefaults.heading,
      subheading: transparencyDefaults.subheading,
      steps: transparencySteps,
    },
    funding: {
      title: fundingDefaults.title,
      cards: fundingCards,
    },
    investment: {
      title: investmentDefaults.title,
      ctaLabel: investmentDefaults.ctaLabel,
      ctaLink: investmentDefaults.ctaLink,
      projects: investmentProjects,
      modalTabs: investmentDefaults.modalTabs,
    },
    trusted: {
      title: trustedDefaults.title,
      partners: trustedPartners,
      testimonials: trustedTestimonials,
    },
    contact: contactDefaults,
  };
}

async function main() {
  await assertDatabaseReachable(process.env.DATABASE_URL);
  const payload = await getPayload({ config });
  const existing = await payload.findGlobal({ slug: 'home-page', depth: 0 });

  if (!force && existing?.operatingSystem?.title) {
    console.log(
      'home-page already populated. Skipping. Run with --force to overwrite.'
    );
    return;
  }

  const data = await buildSeedData(payload);
  await payload.updateGlobal({
    slug: 'home-page',
    data,
  });

  console.log('home-page global seeded successfully.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    fatalErrorHandled = true;
    console.error('Failed to seed home-page:', error);
    process.exit(1);
  });
