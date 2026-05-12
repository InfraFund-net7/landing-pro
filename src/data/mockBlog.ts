import solar from '@/../public/image/solar.jpg';
import wind from '@/../public/image/solarpanel.jpg';
import type { StaticImageData } from 'next/image';

export interface Blog {
  id?: number;
  slug: string;
  title: string;
  description: string;
  mainContent?: string;
  image?: string | StaticImageData;
  date: string;
  readTime: string;
  author: string;
  category: string;
}

export const mockBlogs: Blog[] = [
  {
    slug: 'tokenization-green-assets',
    title: 'Tokenization: Unlocking Liquidity for Green Assets',
    description:
      'The transition to a sustainable future requires unprecedented levels of investment in renewable energy, infrastructure, and nature-based solutions...',
    image: solar as StaticImageData,
    date: 'June 15, 2024',
    readTime: '8 min read',
    author: 'John Doe',
    category: 'Tokenization',
  },
  {
    slug: 'wind-energy-investment',
    title: 'Wind Energy: New Opportunities for Investors',
    description:
      'Wind farms are becoming increasingly attractive for private investors due to advances in turbine technology and government incentives...',
    image: wind as StaticImageData,
    date: 'July 1, 2024',
    readTime: '6 min read',
    author: 'Jane Smith',
    category: 'Renewables',
  },
];
