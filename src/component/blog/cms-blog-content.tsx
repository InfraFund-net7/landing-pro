'use client';

import { prepareBlogContentHeadings } from '@/lib/blog-content-headings.js';
import { absolutizeCmsMediaUrlsInHtml } from '@/lib/cms-media-url';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState, type RefObject } from 'react';
import styles from './cms-blog-content.module.css';

type CmsBlogContentProps = {
  content: string;
  scrollRootRef?: RefObject<HTMLElement | null>;
  layoutOffset?: number;
};

const DEFAULT_SCROLL_OFFSET = 130;

function getScrollTop(scrollRoot: HTMLElement | Window): number {
  return scrollRoot instanceof Window
    ? scrollRoot.scrollY
    : scrollRoot.scrollTop;
}

function scrollToY(scrollRoot: HTMLElement | Window, top: number) {
  scrollRoot.scrollTo({ top, behavior: 'smooth' });
}

function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content.trim());
}

function resolveActiveSection(
  headings: { id: string; text: string }[],
  scrollRoot: HTMLElement | Window,
  spyLine: number
): string {
  const rootTop =
    scrollRoot instanceof Window ? 0 : scrollRoot.getBoundingClientRect().top;

  for (const { id } of headings) {
    const element = document.getElementById(id);
    if (!element) continue;

    const rect = element.getBoundingClientRect();
    const top = rect.top - rootTop;
    const bottom = rect.bottom - rootTop;

    if (top <= spyLine && bottom >= spyLine) {
      return id;
    }
  }

  let current = headings[0].id;
  for (const { id } of headings) {
    const element = document.getElementById(id);
    if (element && element.getBoundingClientRect().top - rootTop <= spyLine) {
      current = id;
    }
  }

  return current;
}

function BlogTocSidebar({
  headings,
  activeSection,
  onNavigate,
  variant,
}: {
  headings: { id: string; text: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
  variant: 'desktop' | 'mobile';
}) {
  if (headings.length === 0) return null;

  const isMobile = variant === 'mobile';

  return (
    <nav className={styles.tocNav} aria-label="Table of contents">
      {headings.map((item) => {
        const isActive = activeSection === item.id;
        const itemClass = isMobile
          ? isActive
            ? styles.tocItemMobileActive
            : styles.tocItemMobile
          : isActive
            ? `${styles.tocItem} ${styles.tocItemActive}`
            : styles.tocItem;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={itemClass}
          >
            {isMobile ? (
              item.text
            ) : (
              <>
                <span
                  className={
                    isActive ? styles.tocMarker : styles.tocMarkerHidden
                  }
                  aria-hidden
                >
                  »
                </span>
                <span className={styles.tocLabel}>{item.text}</span>
              </>
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default function CmsBlogContent({
  content,
  scrollRootRef,
  layoutOffset = DEFAULT_SCROLL_OFFSET,
}: CmsBlogContentProps) {
  const trimmed = content.trim();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const scrollOffset = layoutOffset;
  const scrollSpyLine = layoutOffset + 20;

  const { headings, processedHtml } = useMemo(() => {
    if (!trimmed || !isHtmlContent(trimmed)) {
      return { headings: [], processedHtml: trimmed };
    }
    return prepareBlogContentHeadings(absolutizeCmsMediaUrlsInHtml(trimmed));
  }, [trimmed]);

  useEffect(() => {
    if (headings.length === 0) return;
    setActiveSection(headings[0].id);
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollRoot = scrollRootRef?.current ?? window;
      setActiveSection(
        resolveActiveSection(headings, scrollRoot, scrollSpyLine)
      );
    };

    const scrollRoot = scrollRootRef?.current ?? window;
    scrollRoot.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => scrollRoot.removeEventListener('scroll', handleScroll);
  }, [headings, scrollRootRef, scrollSpyLine]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const scrollRoot = scrollRootRef?.current ?? window;
    const rootTop =
      scrollRoot instanceof Window ? 0 : scrollRoot.getBoundingClientRect().top;
    const top =
      getScrollTop(scrollRoot) +
      section.getBoundingClientRect().top -
      rootTop -
      scrollOffset;

    scrollToY(scrollRoot, top);
    setSidebarOpen(false);
  };

  if (!trimmed) return null;

  if (!isHtmlContent(trimmed)) {
    const paragraphs = trimmed
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (paragraphs.length === 0) return null;

    return (
      <article className="w-full max-w-[835px] space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p
            key={`${index}-${paragraph.slice(0, 24)}`}
            className="text-sm sm:text-base leading-relaxed text-justify whitespace-pre-line"
          >
            {paragraph}
          </p>
        ))}
      </article>
    );
  }

  const article = (
    <article
      className={`${styles.htmlContent} w-full lg:w-[835px]`}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );

  if (headings.length === 0) {
    return article;
  }

  return (
    <div className="w-full relative">
      <div
        className="lg:hidden fixed left-4 z-[30]"
        style={{ top: layoutOffset + 16 }}
      >
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-md text-black rounded-full p-2 border border-gray-200"
          aria-label="Open table of contents"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {sidebarOpen ? (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
        />
      ) : null}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-[999] p-6 overflow-y-auto transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6 text-black">
          <h2 className="text-lg font-semibold">Contents</h2>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <BlogTocSidebar
          headings={headings}
          activeSection={activeSection}
          onNavigate={scrollToSection}
          variant="mobile"
        />
      </div>

      <main className="w-full flex flex-col lg:flex-row gap-6 relative">
        <div
          className="hidden lg:block w-[404px] h-fit sticky self-start"
          style={{ top: scrollOffset }}
        >
          <BlogTocSidebar
            headings={headings}
            activeSection={activeSection}
            onNavigate={scrollToSection}
            variant="desktop"
          />
        </div>
        {article}
      </main>
    </div>
  );
}
