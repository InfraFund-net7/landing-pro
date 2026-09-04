type AdminPostStatus = 'published' | 'draft';

export type AdminPost = {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: string;
  published: boolean;
  status: AdminPostStatus;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  categories: string[];
  tags: string[];
  imageUrl?: string;
};

export type AdminPostStats = {
  total: number;
  published: number;
  drafts: number;
  categories: number;
  publishedThisMonth: number;
};

export type AdminPostSort = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export type AdminPostStatusFilter = 'all' | AdminPostStatus;
