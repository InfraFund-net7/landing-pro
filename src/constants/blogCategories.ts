import {
  Coins,
  Plane,
  Search,
  Sprout,
  Triangle,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type BlogCategoryStyle = {
  color: string;
  Icon: LucideIcon;
};

export const DEFAULT_BLOG_CATEGORIES = [
  'Tokenization',
  'InfraFund',
  'Industry',
  'Impact',
  'Research',
  'Case Study',
] as const;

const BLOG_CATEGORY_STYLES: Record<string, BlogCategoryStyle> = {
  tokenization: { color: '#5B8CFF', Icon: Coins },
  infrafund: { color: '#4ADE80', Icon: Triangle },
  industry: { color: '#FF6B6B', Icon: Zap },
  impact: { color: '#2DD4BF', Icon: Sprout },
  research: { color: '#FB923C', Icon: Search },
  'case study': { color: '#C084FC', Icon: Plane },
  'case-study': { color: '#C084FC', Icon: Plane },
};

export function resolveBlogCategoryStyle(title: string): BlogCategoryStyle {
  const key = title.trim().toLowerCase();
  return (
    BLOG_CATEGORY_STYLES[key] ?? {
      color: '#8B95A5',
      Icon: Coins,
    }
  );
}
