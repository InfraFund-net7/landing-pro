'use client';

import { prepareBlogContentHeadings } from '@/lib/blog-content-headings.js';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import styles from './cms-blog-content.module.css';

type CmsBlogContentProps = {
  content: string;
};

const SCROLL_OFFSET = 130;
const SCROLL_SPY_THRESHOLD = 150;

function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content.trim());
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
  const [primary, ...rest] = headings;
  if (!primary) return null;

  if (variant === 'mobile') {
    return (
      <nav className="space-y-4">
        {[primary, ...rest].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`block text-left text-sm text-black leading-snug w-full ${
              activeSection === item.id ? 'font-black' : 'font-medium'
            }`}
          >
            {item.text}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <nav className="space-y-6">
      <button
        type="button"
        onClick={() => onNavigate(primary.id)}
        className={`block text-left w-full transition-colors cursor-pointer ${
          activeSection === primary.id
            ? 'text-foreground font-bold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <h2 className="text-lg font-semibold flex items-start gap-2">
          {activeSection === primary.id ? <span>»</span> : null}
          <span className={activeSection === primary.id ? '' : 'ml-7'}>
            {primary.text}
          </span>
        </h2>
      </button>
      {rest.length > 0 ? (
        <ul className="space-y-4">
          {rest.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex items-start gap-2 transition-colors text-left w-full cursor-pointer ${
                  activeSection === item.id
                    ? 'text-foreground font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {activeSection === item.id ? <span>»</span> : null}
                <span className={activeSection === item.id ? '' : 'ml-7'}>
                  {item.text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}

export default function CmsBlogContent({ content }: CmsBlogContentProps) {
  const trimmed = content.trim();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { headings, processedHtml } = useMemo(() => {
    if (!trimmed || !isHtmlContent(trimmed)) {
      return { headings: [], processedHtml: trimmed };
    }
    return prepareBlogContentHeadings(trimmed);
  }, [trimmed]);

  useEffect(() => {
    if (headings.length === 0) return;
    setActiveSection(headings[0].id);
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      let current = headings[0].id;
      for (const { id } of headings) {
        const element = document.getElementById(id);
        if (
          element &&
          element.getBoundingClientRect().top <= SCROLL_SPY_THRESHOLD
        ) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        SCROLL_OFFSET;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setSidebarOpen(false);
    }
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
      <div className="lg:hidden fixed top-[20%] left-4 z-50">
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
        <div className="hidden lg:block w-[404px] h-fit sticky top-[130px] self-start">
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
