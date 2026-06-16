'use client';

import '@/app/globals.css';
import BlogPage from '@/component/blog/blog-page';
import type { Blog } from '@/data/mockBlog';
import { ArrowLeft, Eye, FilePenLine } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const [chromeHeight, setChromeHeight] = useState(112);

  useEffect(() => {
    const node = chromeRef.current;
    if (!node) return;

    const updateHeight = () => {
      setChromeHeight(node.offsetHeight);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollRoot = scrollRootRef.current;
    scrollRoot?.scrollTo({ top: 0, behavior: 'auto' });

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
    <div ref={scrollRootRef} className={styles.root}>
      <div ref={chromeRef} className={styles.previewChrome}>
        <header className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button
              type="button"
              className={styles.backButton}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onClose();
              }}
            >
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
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onClose();
                }}
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
      </div>

      <div className={styles.siteFrame}>
        <BlogPage
          blog={blog}
          comments={[]}
          previewMode
          scrollRootRef={scrollRootRef}
          layoutOffset={chromeHeight + 24}
        />
      </div>
    </div>
  );
}
