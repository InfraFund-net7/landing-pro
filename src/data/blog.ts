import solar from '@/../public/image/solar.jpg';
import First_Blog from '@/../public/image/blog1.jpg';
import Second_Blog from '@/../public/image/blog2.jpg';
import Third_Blog from '@/../public/image/blog-3.jpg';
import { Boxes, Search, Zap } from 'lucide-react';
import miniinfra from '@/../public/svg/miniinfra.svg';
import flower from '@/../public/svg/flower.svg';
import wind from '@/../public/svg/wind-turbin.svg';
export const blogs = [
  {
    image: solar,
    date: 'Oct 19, 2025',
    slug: 'rise-of-wind-energy-investments-in-europe',
    readTime: '5 min read',
    title: 'The Rise of Wind Energy Investments in Europe',
    description:
      'Exploring why wind power projects are leading sustainable finance in 2025.',
  },
  {
    image: First_Blog,
    date: 'Sep 25, 2025',
    slug: 'rise-of-wind-energy-investments-in-europe',
    readTime: '4 min read',
    title: 'AI and the Future of Creative Industries',
    description:
      'How artificial intelligence is reshaping art, music, and design workflows.',
  },
  {
    image: Second_Blog,
    date: 'Aug 8, 2025',
    slug: 'rise-of-wind-energy-investments-in-europe',
    readTime: '6 min read',
    title: 'Sustainable Architecture in Urban Spaces',
    description:
      'Green buildings are redefining the skylines of modern cities worldwide.',
  },
  {
    image: Third_Blog,
    date: 'Jul 12, 2025',
    slug: 'rise-of-wind-energy-investments-in-europe',
    readTime: '3 min read',
    title: 'Blockchain Beyond Crypto',
    description:
      'Exploring real-world applications of blockchain in supply chains and healthcare.',
  },
  {
    image: solar,
    date: 'Jun 1, 2025',
    slug: 'rise-of-wind-energy-investments-in-europe',
    readTime: '5 min read',
    title: 'Electric Vehicles Market Growth 2025',
    description:
      'How EV technology and infrastructure are evolving faster than expected.',
  },
  {
    image: First_Blog,
    date: 'May 14, 2025',
    slug: 'rise-of-wind-energy-investments-in-europe',
    readTime: '4 min read',
    title: 'The Future of Remote Work',
    description:
      'Hybrid models are changing how companies manage teams globally.',
  },
  {
    image: Second_Blog,
    date: 'Apr 22, 2025',
    slug: 'rise-of-wind-energy-investments-in-europe',
    readTime: '7 min read',
    title: 'Climate Tech Startups to Watch',
    description:
      'Innovators tackling climate change through technology and data-driven solutions.',
  },
  {
    image: Third_Blog,
    date: 'Mar 9, 2025',
    slug: 'rise-of-wind-energy-investments-in-europe',
    readTime: '3 min read',
    title: 'Quantum Computing Explained Simply',
    description:
      'What makes quantum computers different, and how soon will they matter?',
  },
  {
    image: solar,
    date: 'Feb 16, 2025',
    slug: 'rise-of-wind-energy-investments-in-europe',
    readTime: '5 min read',
    title: 'The Metaverse Economy is Coming',
    description:
      'How digital worlds are creating real business and investment opportunities.',
  },
];

export const blogcategories = [
  {
    title: 'Tokenization',
    icon: Boxes,
    color: '#2E4778',
    type: 'lucide',
  },
  {
    title: 'InfraFund',
    icon: miniinfra,
    color: '#11B367',
    type: 'image',
  },
  {
    title: 'Industry',
    icon: Zap,
    color: '#C0392B',
    type: 'lucide',
  },
  {
    title: 'Impact',
    icon: flower,
    color: '#27AEA7',
    type: 'image',
  },
  {
    title: 'Research',
    icon: Search,
    color: '#D35400',
    type: 'lucide',
  },
  {
    title: 'Case study',
    icon: wind,
    color: '#8E44AD',
    type: 'image',
  },
];
