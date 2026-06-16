'use client';

import '@/app/globals.css';
import BlogPage from '@/component/blog/blog-page';
import Footer from '@/component/footer';
import Header from '@/component/header';
import type { Blog } from '@/data/mockBlog';
import { ArrowLeft, Eye, FilePenLine } from 'lucide-react';
import { useEffect } from 'react';
import styles from './post-preview-experience.module.css';

type PostPreviewExperienceProps = {
  blog: Blog;
  slug: string;
  isPublished: boolean;
  onClose: () => void;
};

export default function PostPreviewExperience({
  blog,
  slug,
  isPublished,
  onClose,
}: PostPreviewExperienceProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const previewLabel = isPublished ? 'Live preview' : 'Draft preview';

  return (
    <div className={styles.root}>
      <header className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <button type="button" className={styles.backButton} onClick={onClose}>
            <ArrowLeft size={16} />
            Back to editor
          </button>
        </div>

        <div className={styles.toolbarCenter}>
          <span className={styles.previewBadge}>
            <span className={styles.previewDot} aria-hidden />
            {previewLabel}
          </span>
          <span className={styles.slugHint}>
            Will appear at <code>/blog/{slug || 'your-slug'}</code>
          </span>
        </div>

        <div className={styles.toolbarRight}>
          <div
            className={styles.viewToggle}
            role="tablist"
            aria-label="Editor view"
          >
            <button
              type="button"
              className={styles.viewToggleButton}
              onClick={onClose}
              role="tab"
              aria-selected={false}
            >
              <FilePenLine size={14} />
              Editor
            </button>
            <button
              type="button"
              className={`${styles.viewToggleButton} ${styles.viewToggleButtonActive}`}
              role="tab"
              aria-selected
            >
              <Eye size={14} />
              Preview
            </button>
          </div>
        </div>
      </header>

      <p className={styles.previewNotice}>
        {isPublished
          ? 'You are previewing unsaved changes. Nothing is published until you click Update.'
          : 'You are previewing a draft. Comments and the live URL stay hidden until you publish.'}
      </p>

      <div className={styles.siteFrame}>
        <Header />
        <BlogPage blog={blog} comments={[]} previewMode />
        <Footer />
      </div>
    </div>
  );
}
