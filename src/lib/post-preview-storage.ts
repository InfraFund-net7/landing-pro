import type { Blog } from '@/data/mockBlog';

const POST_PREVIEW_STORAGE_KEY = 'infrafund:post-preview';

type StoredPostPreview = {
  blog: Blog;
  slug: string;
  isPublished: boolean;
};

export function writePostPreviewDraft(payload: StoredPostPreview) {
  sessionStorage.setItem(POST_PREVIEW_STORAGE_KEY, JSON.stringify(payload));
}

export function readPostPreviewDraft(): StoredPostPreview | null {
  try {
    const raw = sessionStorage.getItem(POST_PREVIEW_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredPostPreview;
  } catch {
    return null;
  }
}

export function clearPostPreviewDraft() {
  sessionStorage.removeItem(POST_PREVIEW_STORAGE_KEY);
}
