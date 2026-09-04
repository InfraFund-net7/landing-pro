'use client';

import BlogPage from '@/component/blog/blog-page';
import { readPostPreviewDraft } from '@/lib/post-preview-storage';
import { useEffect, useState } from 'react';

export default function PostPreviewFrame() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  const draft = readPostPreviewDraft();
  if (!draft?.blog) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-sm text-[#A7B7D9]">
        Preview data is unavailable. Close preview and try again from the
        editor.
      </div>
    );
  }

  return (
    <BlogPage blog={draft.blog} comments={[]} previewMode layoutOffset={130} />
  );
}
