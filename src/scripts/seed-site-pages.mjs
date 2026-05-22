import process from 'process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import config from '../payload.config.js';

const force = process.argv.includes('--force');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const publicDir = path.join(rootDir, 'public');

const pages = [
  {
    title: 'Projects',
    slug: 'project',
    seo: {
      metaTitle: 'Projects | InfraFund - Open NetZero Investments',
      metaDescription:
        'Explore high-impact renewable energy and infrastructure projects with transparent returns. Invest directly in the future of sustainable energy through InfraFund.',
      canonicalPath: '/project',
    },
    hero: {
      eyebrow: 'Projects',
      heading: 'Open NetZero Funds',
      subheading: 'Contribute in NetZero Transition while Benefiting from them',
    },
    sections: [
      {
        heading: 'Project Investment Modal Content',
        body: [
          'Overview: The North Sea Wind Project by WindNetZero is one of the largest offshore wind farms in Europe...',
          'Financials: This project has a total investment size of £350M...',
          'Technical: The project utilizes advanced 14MW offshore wind turbines...',
          'Documents: You can access all official project documents...',
        ].join('\n\n'),
      },
    ],
    blocks: [
      {
        blockType: 'cta',
        title: 'Browse Projects',
        description:
          'Open and review active projects from the dashboard cards.',
        buttonLabel: 'Load More Projects',
        buttonLink: '/project',
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'For Investors',
    slug: 'Investors',
    seo: {
      metaTitle: 'Investors | InfraFund - Invest in the Future of Our Planet',
      metaDescription:
        'Invest directly in high-impact, transparent, and blockchain-secured green infrastructure projects with InfraFund.',
      canonicalPath: '/Investors',
    },
    hero: {
      eyebrow: 'For Investors',
      heading: 'Invest Directly in the Future of Our Planet',
      subheading:
        'Access transparent, liquid, and high-impact green infrastructure projects, powered by the security of the blockchain.',
    },
    sections: [
      {
        heading: 'The InfraFund Difference',
        body: 'This section is currently rendered from structured UI cards in the Investors page.',
      },
      {
        heading: 'How to Invest',
        body: 'This section is currently rendered from step cards with animated chevrons.',
      },
      {
        heading: 'FAQs',
        body: 'Investor FAQ items are currently rendered from builder constants.',
      },
      {
        heading: 'Ready to build your impact portfolio?',
        body: 'CTA label: Get Started',
        ctaLabel: 'Get Started',
        ctaLink: '/',
      },
    ],
    blocks: [
      {
        blockType: 'feature-grid',
        title: 'The InfraFund Difference',
        items: [
          {
            title: 'Radical Transparency',
            description:
              'Our AI-Driven Digital Twin provides a live, verifiable view into project performance.',
            iconPath: '/svg/radical-transparency.svg',
          },
          {
            title: 'Direct Access & Impact',
            description:
              'Go beyond donations. Invest directly in the projects you believe in and become a true stakeholder in their success.',
            iconPath: '/svg/direct-impact.svg',
          },
          {
            title: 'Future Liquidity',
            description:
              'We are building the infrastructure to turn illiquid, long-term assets into tradable digital tokens on a secure secondary market.',
            iconPath: '/svg/future-liquidity.svg',
          },
        ],
      },
      {
        blockType: 'feature-grid',
        title: 'How to Invest',
        items: [
          {
            title: 'Connect Your Wallet',
            description: 'Securely connect your Web3 wallet in seconds.',
            iconPath: '',
          },
          {
            title: 'Discover & Diligence',
            description:
              'Browse projects and review their performance data via the Digital Twin dashboard.',
            iconPath: '',
          },
          {
            title: 'Invest & Track',
            description:
              'Invest directly with crypto or fiat and monitor your portfolio in your personal dashboard.',
            iconPath: '',
          },
        ],
      },
      {
        blockType: 'faq',
        title: 'FAQs',
        items: [
          {
            id: 'financial-return',
            question:
              'What am I actually investing in when I buy a token on InfraFund?',
            answer:
              'When you invest on InfraFund, you are purchasing a digital token that represents a real, verifiable stake in a specific green infrastructure project.',
          },
          {
            id: 'project-vetting',
            question:
              'How does InfraFund protect my investment and manage risk?',
            answer:
              'Our platform centers on the AI-Driven Digital Twin, giving a live view of project KPIs and predictive risk analysis.',
          },
          {
            id: 'payouts',
            question:
              'How do I get a financial return, and how are payments handled?',
            answer:
              'Returns are distributed through smart contracts from real-world project revenue, sent directly to investor wallets.',
          },
          {
            id: 'regulated',
            question: 'Are these investments regulated and safe?',
            answer:
              'InfraFund is built to be regulatory-aware under UK frameworks, but all early-stage investments carry risk.',
          },
          {
            id: 'why-infrafund',
            question:
              'Why should I invest through InfraFund instead of traditional funds?',
            answer:
              'InfraFund offers direct transparency, potential liquidity, and lower operational friction through smart contracts.',
          },
        ],
      },
      {
        blockType: 'cta',
        title: 'Ready to build your impact portfolio?',
        description: 'Start exploring verified NetZero opportunities today.',
        buttonLabel: 'Get Started',
        buttonLink: '/',
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'For Builders',
    slug: 'builders',
    seo: {
      metaTitle:
        'Builders | InfraFund - Fund Your NetZero Project with Tokenisation',
      metaDescription:
        'InfraFund provides the full-stack toolkit to fund your NetZero project, from tokenisation to global distribution.',
      canonicalPath: '/builders',
    },
    hero: {
      eyebrow: 'For Builders',
      heading: 'Stop Pitching Banks. Start Building Your Future',
      subheading:
        'InfraFund provides the full-stack toolkit to fund your NetZero project, from tokenisation to global distribution.',
    },
    sections: [
      {
        heading: 'Builder Journey',
        body: 'Blockchain diagram and builder feature sections are currently rendered from existing UI modules.',
      },
      {
        heading: 'FAQs',
        body: 'Builder FAQ items are currently rendered from constants.',
      },
      {
        heading: 'Ready to Accelerate Your Funding?',
        body: 'CTA label: Apply to list your project',
        ctaLabel: 'Apply to list your project',
        ctaLink: '/',
      },
    ],
    blocks: [
      {
        blockType: 'faq',
        title: 'FAQs',
        items: [
          {
            id: 'renewable-developers',
            question:
              'For Renewable Energy Developers: Why use InfraFund over traditional financing?',
            answer:
              'InfraFund is designed to shorten funding timelines and unlock broader access to global investor capital.',
          },
          {
            id: 'digital-twin-help',
            question:
              'How does the AI-Driven Digital Twin help manage projects?',
            answer:
              'It provides a live project command center with operational visibility and predictive risk signals.',
          },
          {
            id: 'tokenization-explained',
            question: 'What is tokenization on InfraFund?',
            answer:
              'Tokenization converts project interests into compliant digital securities that can be offered to investors.',
          },
          {
            id: 'payment-delays',
            question: 'How does InfraFund solve delayed contractor payments?',
            answer:
              'Smart contracts can automate milestone-based releases when verified progress targets are met.',
          },
          {
            id: 'project-types',
            question: 'What project funding models are supported?',
            answer:
              'Equity, loan-based, pre-sale, and contribution-based structures are supported depending on project needs.',
          },
        ],
      },
      {
        blockType: 'cta',
        title: 'Ready to Accelerate Your Funding?',
        description: 'Apply your project and start onboarding with InfraFund.',
        buttonLabel: 'Apply to list your project',
        buttonLink: '/',
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'Learn',
    slug: 'blog',
    seo: {
      metaTitle: 'Insight | InfraFund Learn',
      metaDescription:
        'Explore insights on sustainable finance, tokenization, and infrastructure investing.',
      canonicalPath: '/blog',
    },
    hero: {
      eyebrow: 'Learn',
      heading: 'Insight',
      subheading: 'Explore articles and insights from InfraFund.',
    },
    sections: [
      {
        heading: 'Blog Listing',
        body: 'This page currently renders Post docs from Payload plus fallback local blog items.',
      },
    ],
    blocks: [
      {
        blockType: 'feature-grid',
        title: 'Categories',
        items: [
          {
            title: 'Tokenization',
            description: 'Tokenization insights and explainers.',
          },
          {
            title: 'InfraFund',
            description: 'Company and product updates from InfraFund.',
          },
          {
            title: 'Industry',
            description: 'Energy and infrastructure market trends.',
          },
          {
            title: 'Impact',
            description: 'Climate and sustainability impact stories.',
          },
          {
            title: 'Research',
            description: 'Research notes and analysis content.',
          },
          {
            title: 'Case Study',
            description: 'Real project and financing case studies.',
          },
        ],
      },
      {
        blockType: 'cta',
        title: 'Browse Insights',
        description:
          'The Learn page is connected to blog posts managed in Payload Posts.',
        buttonLabel: 'View Latest Articles',
        buttonLink: '/blog',
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'About Us',
    slug: 'about-us',
    seo: {
      metaTitle:
        'About Us | InfraFund - Building the Future of Sustainable Finance',
      metaDescription:
        "Learn about InfraFund's mission to revolutionize green finance through blockchain technology. Meet our team, explore our story, and see how we’re making sustainable investment accessible worldwide.",
      canonicalPath: '/about-us',
    },
    hero: {
      eyebrow: 'About InfraFund',
      heading: 'Building the Future of Sustainable Energy, Today',
      subheading:
        'At InfraFund, we leverage the power of technology to make investing in renewable energy projects accessible, transparent, and rewarding for everyone, everywhere.',
    },
    sections: [
      {
        heading: 'InfraFund Contributors',
        body: 'A world-class team built to bridge the worlds of traditional infrastructure and decentralized finance.',
      },
      {
        heading: 'Our Story',
        body: 'Our story begins not with a company, but with a conviction: the mission to reach Net Zero is being stalled by a broken financial system. InfraFund was forged to bridge that gap.',
      },
      {
        heading: "Let's Build the Green Future Together",
        body: "Whether you're an investor ready to make an impact or a builder with a vision, we're here to help.",
        ctaLabel: 'Contact Us',
        ctaLink: '/about-us',
      },
    ],
    blocks: [
      {
        blockType: 'feature-grid',
        title: 'Our Vision, Mission, and Values',
        items: [
          {
            title: 'Our Vision',
            description:
              'Our vision is a world where sustainable energy infrastructure is globally crowd-funded.',
            iconPath: '/svg/about-us-vision.svg',
          },
          {
            title: 'Our Mission',
            description:
              'Our mission is to democratize investment in vital green assets through a direct platform.',
            iconPath: '/svg/about-us-mission.svg',
          },
          {
            title: 'Our Values',
            description:
              'We are committed to Transparency, Accessibility, and measurable Impact.',
            iconPath: '/svg/about-us-value.svg',
          },
        ],
      },
      {
        blockType: 'contributors',
        title: 'InfraFund Contributors',
        subtitle:
          'A world-class team built to bridge traditional infrastructure and decentralized finance.',
        items: [
          {
            name: 'Iman Alibeigi',
            role: 'Founder',
            description:
              "A seasoned construction engineer conceptualised InfraFund from his master's thesis.",
            linkedin: 'https://www.linkedin.com/in/iman-alibeigi/',
            imagePath: '/image/contributors/Iman-Alibeigi.png',
          },
          {
            name: 'Sven Meyer',
            role: 'Technical Adviser',
            description:
              'Enterprise blockchain architect ensuring platform security and scalability.',
            linkedin: 'https://www.linkedin.com/in/svenuwemeyer/',
            imagePath: '/image/contributors/Sven-Meyer.png',
          },
          {
            name: 'Prof. Akbar Javadi',
            role: 'Digital Twin & NetZero Adviser',
            description:
              'Professor of Engineering with deep expertise in Digital Twins and NetZero projects.',
            linkedin:
              'https://www.linkedin.com/in/akbar-javadi-fice-ceng-12164616',
            imagePath: '/image/contributors/Akbar-Javadi.png',
          },
          {
            name: 'Jed Dahlke',
            role: 'Financial Lead',
            description:
              'Skilled financial modeler with advanced expertise in mathematical finance.',
            linkedin: 'https://www.linkedin.com/in/jed-dahlke',
            imagePath: '/image/contributors/Jed-Dahlke.png',
          },
          {
            name: 'Dr. Yifeng Tian',
            role: 'R&D Lead',
            description:
              'Expert researcher in infrastructure tokenization leading data-driven innovation.',
            linkedin: 'https://www.linkedin.com/in/yifeng-tian',
            imagePath: '/image/contributors/Yifeng-Tian.png',
          },
          {
            name: 'Natalia Ismagilova',
            role: 'Web3 Legal & Regulatory Adviser',
            description:
              'Head of Innovation at World Talent, guiding global compliance strategy.',
            linkedin:
              'https://www.linkedin.com/in/natalia-ismagilova-587045185',
            imagePath: '/image/contributors/Natalia-Ismagilova.png',
          },
          {
            name: 'Luke Lang',
            role: 'Business Adviser at SETsquared (EIR)',
            description:
              'Co-founder of Crowdcube, advising on business and growth strategy.',
            linkedin: 'https://www.linkedin.com/in/lukelang',
            imagePath: '/image/contributors/Luke-Lang.png',
          },
          {
            name: 'James Cater',
            role: 'Strategic Partnership Adviser',
            description:
              'Vice Chair of the Exeter Chamber, driving key strategic partnerships.',
            linkedin: 'https://www.linkedin.com/in/managingdirectorceo/',
            imagePath: '/image/contributors/James-Cater.png',
          },
          {
            name: 'Kambis Kohansal',
            role: 'Startup Adviser',
            description:
              'Head of Startup Services at the Austrian Federal Economic Chamber.',
            linkedin: 'https://at.linkedin.com/in/kambis-kohansal-vajargah',
            imagePath: '/image/contributors/Kambis-Kohansal.png',
          },
          {
            name: 'Nicholas Pearson',
            role: 'Technology Transfer Officer',
            description:
              'Advises on commercializing research and technology at the University of Exeter.',
            linkedin: 'https://uk.linkedin.com/in/nicholaspearson',
            imagePath: '/image/contributors/Nicholas-Pearson.png',
          },
          {
            name: 'Dr. Pooria Ghadir',
            role: 'Marketing Lead',
            description:
              'Specializes in accelerating NetZero startups through strategic marketing.',
            linkedin: 'https://uk.linkedin.com/in/pooria-ghadir-phd',
            imagePath: '/image/contributors/Pooria-Ghadir.png',
          },
          {
            name: 'Amirreza Zareian',
            role: 'Product Designer',
            description:
              'Shapes the user experience and visual interface of the InfraFund platform.',
            linkedin: 'https://www.linkedin.com/in/amirreza-zareian-022087177',
            imagePath: '/image/contributors/Amirreza-Zareian.jpg',
          },
          {
            name: 'Javad Rajabzadeh',
            role: 'Engineer',
            description:
              'Senior software engineer with expertise in scalable business software, IoT, blockchain, and AI.',
            linkedin: 'https://www.linkedin.com/in/ja7ad/',
            imagePath: '/image/contributors/Javad-Rajabzadeh.jpg',
          },
          {
            name: 'Sajad Salehi',
            role: 'Engineer',
            description:
              'Blockchain engineer building smart contracts and decentralized applications.',
            linkedin: 'https://ca.linkedin.com/in/sajad-salehi-528a24231',
            imagePath: '/image/contributors/Sajad-Salehi.png',
          },
          {
            name: 'Shervin Mansouri',
            role: 'Engineer',
            description:
              'Creates intuitive user interfaces for investor and developer portals.',
            linkedin: 'https://www.linkedin.com/in/shervin-mansouri-070932302/',
            imagePath: '/image/contributors/Shervin-Mansouri.png',
          },
        ],
      },
      {
        blockType: 'timeline',
        title: 'Our Journey',
        items: [
          {
            period: 'Q1 2024: The Spark of Innovation',
            description:
              'Incubated by SETsquared and recognized with the Environmental Impact Award.',
          },
          {
            period: 'Q2 2024: Market Validation',
            description:
              'Accepted into Innovate UK ICURe and received Microsoft for Startups grant support.',
          },
          {
            period: 'Q3 2024: Industry Recognition',
            description:
              'Won Autodesk Technology Impact award and joined Scaling the Edge NetZero program.',
          },
          {
            period: 'Q4 2024: Building Foundation',
            description:
              'Incorporated InfraNetZero LTD and formalized strategic partnerships and advisory network.',
          },
          {
            period: 'Today',
            description:
              'Developing platform V2 to onboard pilot projects and accelerate NetZero financing.',
          },
        ],
      },
      {
        blockType: 'cta',
        title: "Let's Build the Green Future Together",
        description:
          "Whether you're an investor ready to make an impact or a builder with a vision, we're here to help.",
        buttonLabel: 'Contact Us',
        buttonLink: '/about-us',
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'Frequently Asked Questions',
    slug: 'faq',
    seo: {
      metaTitle: 'FAQ | InfraFund',
      metaDescription:
        'Answers to common questions about InfraFund, tokenization, onboarding, and investment workflows.',
      canonicalPath: '/faq',
    },
    hero: {
      eyebrow: 'Support',
      heading: 'Frequently Asked Questions',
      subheading:
        'Everything you need to know before investing or building with InfraFund.',
      backgroundImagePath: '/image/solar.jpg',
    },
    sections: [
      {
        heading: 'Need extra help?',
        body: 'If you cannot find your answer here, contact our team and we will guide you through onboarding.',
        ctaLabel: 'Contact Us',
        ctaLink: '/about-us',
      },
    ],
    blocks: [
      {
        blockType: 'faq',
        title: 'General Questions',
        items: [
          {
            id: 'what-is-infrafund',
            question: 'What is InfraFund?',
            answer:
              'InfraFund is a platform for funding and investing in NetZero infrastructure using blockchain-backed digital assets.',
          },
          {
            id: 'who-can-join',
            question: 'Who can join InfraFund?',
            answer:
              'Both project builders and investors can join, complete onboarding, and access relevant workflows in the portal.',
          },
          {
            id: 'how-start',
            question: 'How do I get started?',
            answer:
              'Create an account, complete the profile and verification flow, then choose whether to invest or list a project.',
          },
        ],
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'Terms of Use',
    slug: 'terms',
    seo: {
      metaTitle: 'Terms of Use | InfraFund',
      metaDescription:
        'Read InfraFund terms of use, user responsibilities, and legal conditions for using our platform.',
      canonicalPath: '/terms',
    },
    hero: {
      eyebrow: 'Legal',
      heading: 'Terms of Use',
      subheading:
        'Please review the terms that govern the use of InfraFund services.',
      backgroundImagePath: '/image/project-hero.png',
    },
    sections: [
      {
        heading: 'Acceptance of terms',
        body: 'By accessing InfraFund services, you agree to comply with the terms and all applicable regulations.',
      },
      {
        heading: 'Platform usage',
        body: 'Users must provide accurate information, protect credentials, and avoid any misuse of services.',
      },
      {
        heading: 'Risk and responsibility',
        body: 'Digital asset and infrastructure investments carry risk. Review disclosures before taking investment decisions.',
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy',
    seo: {
      metaTitle: 'Privacy Policy | InfraFund',
      metaDescription:
        'How InfraFund collects, uses, and protects your personal data across landing and portal experiences.',
      canonicalPath: '/privacy',
    },
    hero: {
      eyebrow: 'Legal',
      heading: 'Privacy Policy',
      subheading: 'Learn what data we collect and how we use it responsibly.',
      backgroundImagePath: '/image/factory.jpg',
    },
    sections: [
      {
        heading: 'Information we collect',
        body: 'We collect account, onboarding, and technical usage data required for compliance and platform operations.',
      },
      {
        heading: 'How data is used',
        body: 'Data is used to provide services, improve platform security, and meet legal and regulatory obligations.',
      },
      {
        heading: 'Your rights',
        body: 'You may request access, correction, or deletion of personal data where applicable by law.',
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'Risk Warning',
    slug: 'risk-warning',
    seo: {
      metaTitle: 'Risk Warning | InfraFund',
      metaDescription:
        'Important risk warning for investors and participants using InfraFund products and services.',
      canonicalPath: '/risk-warning',
    },
    hero: {
      eyebrow: 'Disclosure',
      heading: 'Risk Warning',
      subheading:
        'Please read this notice carefully before making investment decisions.',
      backgroundImagePath: '/image/wind-turbin.jpg',
    },
    sections: [
      {
        heading: 'Investment risk',
        body: 'All investments involve risk including potential loss of principal and reduced liquidity.',
      },
      {
        heading: 'Technology risk',
        body: 'Blockchain-based products may be exposed to protocol, custody, and smart contract risks.',
      },
      {
        heading: 'Regulatory risk',
        body: 'Regulatory treatment can change and may affect access, valuation, or transferability of digital assets.',
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'UK Residents',
    slug: 'uk-residents',
    seo: {
      metaTitle: 'UK Residents | InfraFund',
      metaDescription:
        'Important information and disclosures for users and investors residing in the United Kingdom.',
      canonicalPath: '/uk-residents',
    },
    hero: {
      eyebrow: 'Regulatory Information',
      heading: 'UK Residents',
      subheading:
        'Jurisdiction-specific details for users based in the United Kingdom.',
      backgroundImagePath: '/image/geo-thermal.jpg',
    },
    sections: [
      {
        heading: 'Eligibility and access',
        body: 'Some products may be restricted based on investor classification and regional regulatory requirements.',
      },
      {
        heading: 'Financial promotions',
        body: 'Marketing materials are provided for information only and do not constitute regulated financial advice.',
      },
      {
        heading: 'Contact for UK queries',
        body: 'If you have UK-specific compliance questions, contact our support and legal team.',
        ctaLabel: 'Contact Support',
        ctaLink: '/about-us',
      },
    ],
    replaceExistingPage: true,
  },
  {
    title: 'Gender Equality Plan (GEP)',
    slug: 'GEP',
    seo: {
      metaTitle: 'Gender Equality Plan (GEP) | InfraFund',
      metaDescription:
        'InfraFund commitments on inclusion, leadership accountability, recruitment, and equitable product design.',
      canonicalPath: '/GEP',
    },
    hero: {
      eyebrow: 'Policy',
      heading: 'Gender Equality Plan',
      subheading:
        'Our framework for building an inclusive company culture and equitable technology outcomes.',
      backgroundImagePath: '/image/our-story.jpg',
    },
    sections: [
      {
        heading: 'Leadership and accountability',
        body: 'We assign clear ownership for equality goals, publish progress indicators, and review outcomes regularly.',
      },
      {
        heading: 'Inclusive recruitment',
        body: 'Hiring processes are designed to minimize bias and broaden access to opportunities across teams.',
      },
      {
        heading: 'Equitable technology design',
        body: 'We integrate fairness and inclusive design principles into product discovery, implementation, and validation.',
      },
    ],
    replaceExistingPage: true,
  },
];

function toPublicRelativePath(assetPath) {
  return assetPath.replace(/^\/+/, '');
}

async function upsertMediaFromPublicPath(payload, assetPath, alt) {
  if (!assetPath) return null;
  const relativePath = toPublicRelativePath(assetPath);
  const filePath = path.join(publicDir, relativePath);
  if (!fs.existsSync(filePath)) return null;

  const filename = path.basename(filePath);
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  });
  if (existing.docs[0]) return existing.docs[0].id;

  const created = await payload.create({
    collection: 'media',
    data: { alt: alt || filename },
    filePath,
  });
  return created.id;
}

async function hydrateUploadFields(payload, entry) {
  const next = JSON.parse(JSON.stringify(entry));
  if (next.hero?.backgroundImagePath && !next.hero.backgroundImage) {
    next.hero.backgroundImage = await upsertMediaFromPublicPath(
      payload,
      next.hero.backgroundImagePath,
      next.hero.heading || next.title || 'hero background'
    );
  }
  if (next.hero?.backgroundImagePath) {
    delete next.hero.backgroundImagePath;
  }

  if (Array.isArray(next.sections)) {
    for (const section of next.sections) {
      if (!section.image && section.imagePath) {
        section.image = await upsertMediaFromPublicPath(
          payload,
          section.imagePath,
          section.heading || 'section image'
        );
      }
      if (section.imagePath) delete section.imagePath;
    }
  }

  if (!Array.isArray(next.blocks)) return next;

  for (const block of next.blocks) {
    if (!Array.isArray(block.items)) continue;
    for (const item of block.items) {
      if (!item.icon && item.iconPath) {
        item.icon = await upsertMediaFromPublicPath(
          payload,
          item.iconPath,
          item.title || 'icon'
        );
      }
      if (!item.image && item.imagePath) {
        item.image = await upsertMediaFromPublicPath(
          payload,
          item.imagePath,
          item.name || 'image'
        );
      }
    }
  }

  return next;
}

async function upsertSitePage(payload, entry) {
  const hydratedEntry = await hydrateUploadFields(payload, entry);
  const existing = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: hydratedEntry.slug } },
    limit: 1,
    depth: 0,
  });

  if (existing.docs[0]) {
    if (!force) {
      console.log(
        `site-page "${hydratedEntry.slug}" exists, skipping (use --force).`
      );
      return;
    }
    await payload.update({
      collection: 'site-pages',
      id: existing.docs[0].id,
      data: hydratedEntry,
    });
    console.log(`site-page "${hydratedEntry.slug}" updated.`);
    return;
  }

  await payload.create({
    collection: 'site-pages',
    data: hydratedEntry,
  });
  console.log(`site-page "${hydratedEntry.slug}" created.`);
}

async function main() {
  const payload = await getPayload({ config });
  for (const page of pages) {
    await upsertSitePage(payload, page);
  }
  console.log('site-pages seed complete.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to seed site-pages:', error);
    process.exit(1);
  });
