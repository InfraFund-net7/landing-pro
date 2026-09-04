import { resolveBlogCategoryStyle } from '@/constants/blogCategories';

type BlogCategoryPillProps = {
  category: string;
};

export function BlogCategoryPill({ category }: BlogCategoryPillProps) {
  const { color, Icon } = resolveBlogCategoryStyle(category);

  return (
    <div
      className="flex h-fit w-fit items-center gap-1.5 rounded-[51px] border px-4 py-2"
      style={{ borderColor: color, color }}
    >
      <Icon size={14} strokeWidth={2} aria-hidden />
      <span className="text-sm font-medium leading-none">{category}</span>
    </div>
  );
}

type BlogCategoryPillsProps = {
  categories: string[];
  align?: 'center' | 'start';
};

export default function BlogCategoryPills({
  categories,
  align = 'center',
}: BlogCategoryPillsProps) {
  const uniqueCategories = [...new Set(categories.filter(Boolean))];

  if (uniqueCategories.length === 0) return null;

  return (
    <div
      className={`flex w-full flex-wrap items-center gap-3 md:gap-4 ${
        align === 'start' ? 'justify-start' : 'justify-center'
      }`}
    >
      {uniqueCategories.map((category) => (
        <BlogCategoryPill key={category} category={category} />
      ))}
    </div>
  );
}
