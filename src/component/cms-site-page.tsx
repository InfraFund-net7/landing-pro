import type { CmsSitePage } from '@/lib/cms-site-pages';
import Link from 'next/link';
import Image from 'next/image';
import FaqList from './ui/FaqList';

type CmsSitePageProps = {
  page: CmsSitePage;
};

export default function CmsSitePage({ page }: CmsSitePageProps) {
  const faqItemsFor = (items: NonNullable<CmsSitePage['blocks'][number]['items']>) =>
    items
      .filter((item) => item.id && item.question && item.answer)
      .map((item) => ({
        id: item.id || '',
        question: item.question || '',
        answer: item.answer || '',
      }));

  return (
    <main className="w-full min-h-screen text-white px-4 sm:px-8 md:px-[90px] pt-[170px] pb-20">
      {(page.hero?.heading || page.title) && (
        <section className="mb-16 text-center relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-14">
          {page.hero?.backgroundImage && (
            <Image
              src={page.hero.backgroundImage}
              alt={page.hero.heading || page.title}
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
          )}
          <div className="relative z-10 max-w-4xl mx-auto">
            {page.hero?.eyebrow && (
              <p className="text-[#24FF8E] font-semibold mb-4">{page.hero.eyebrow}</p>
            )}
            <h1 className="text-3xl md:text-5xl font-bold">
              {page.hero?.heading || page.title}
            </h1>
            {page.hero?.subheading && (
              <p className="text-gray-300 mt-5 text-base md:text-lg leading-relaxed">
                {page.hero.subheading}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto flex flex-col gap-10">
        {page.blocks.map((block, index) => {
          if (block.blockType === 'feature-grid') {
            return (
              <article
                key={`${block.blockType}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">{block.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(block.items ?? []).map((item, itemIndex) => (
                    (() => {
                      const iconSrc = item.icon || item.iconPath;
                      return (
                    <div
                      key={`${item.title}-${itemIndex}`}
                      className="rounded-xl border border-white/10 p-4 flex gap-4 items-start"
                    >
                      {iconSrc ? (
                        <Image
                          src={iconSrc}
                          alt={item.title || 'icon'}
                          width={56}
                          height={56}
                          unoptimized={iconSrc.endsWith('.svg')}
                        />
                      ) : null}
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-300 mt-2">{item.description}</p>
                      </div>
                    </div>
                      );
                    })()
                  ))}
                </div>
              </article>
            );
          }

          if (block.blockType === 'faq') {
            const items = faqItemsFor(block.items ?? []);
            return (
              <article
                key={`${block.blockType}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
              >
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">{block.title}</h2>
                <FaqList faqs={items} allowMultiple />
              </article>
            );
          }

          if (block.blockType === 'timeline') {
            return (
              <article
                key={`${block.blockType}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
              >
                {block.title && (
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6">{block.title}</h2>
                )}
                <div className="space-y-6">
                  {(block.items ?? []).map((item, itemIndex) => (
                    <div key={`${item.period}-${itemIndex}`} className="border-l-2 border-[#24FF8E] pl-4">
                      <h3 className="text-xl font-semibold">{item.period}</h3>
                      <p
                        className="text-gray-300 mt-2 whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: item.description || '' }}
                      />
                    </div>
                  ))}
                </div>
              </article>
            );
          }

          if (block.blockType === 'contributors') {
            return (
              <article
                key={`${block.blockType}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
              >
                {block.title && (
                  <h2 className="text-2xl md:text-3xl font-semibold mb-3">{block.title}</h2>
                )}
                {block.subtitle && <p className="text-gray-300 mb-6">{block.subtitle}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(block.items ?? []).map((item, itemIndex) => (
                    (() => {
                      const imageSrc = item.image || item.imagePath;
                      return (
                    <div
                      key={`${item.name}-${itemIndex}`}
                      className="rounded-xl border border-white/10 p-4 bg-black/20"
                    >
                      <div className="flex gap-3 items-center">
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={item.name || 'contributor'}
                            width={52}
                            height={52}
                            className="rounded-full object-cover"
                          />
                        ) : null}
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-400">{item.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mt-3">{item.description}</p>
                      {item.linkedin ? (
                        <Link href={item.linkedin} className="text-[#24FF8E] text-sm mt-3 inline-block">
                          LinkedIn
                        </Link>
                      ) : null}
                    </div>
                      );
                    })()
                  ))}
                </div>
              </article>
            );
          }

          if (block.blockType === 'cta') {
            return (
              <article
                key={`${block.blockType}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 text-center"
              >
                <h2 className="text-2xl md:text-3xl font-semibold mb-3">{block.title}</h2>
                {block.description && (
                  <p className="text-gray-300 mb-5 max-w-3xl mx-auto">{block.description}</p>
                )}
                {block.buttonLabel && block.buttonLink ? (
                  <Link
                    href={block.buttonLink}
                    className="inline-flex border border-[#24FF8E] text-[#24FF8E] px-5 py-2 rounded-md hover:bg-[#24FF8E] hover:text-black transition-colors"
                  >
                    {block.buttonLabel}
                  </Link>
                ) : null}
              </article>
            );
          }

          return null;
        })}

        {page.sections.map((section, index) => (
          <article
            key={`${section.heading}-${index}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{section.heading}</h2>
            <p className="text-gray-200 whitespace-pre-line leading-8">{section.body}</p>
            {section.image && (
              <div className="relative w-full h-[280px] md:h-[380px] mt-6 rounded-xl overflow-hidden">
                <Image
                  src={section.image}
                  alt={section.heading}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
            )}
            {section.ctaLabel && section.ctaLink && (
              <Link
                href={section.ctaLink}
                className="inline-flex mt-6 border border-[#24FF8E] text-[#24FF8E] px-5 py-2 rounded-md hover:bg-[#24FF8E] hover:text-black transition-colors"
              >
                {section.ctaLabel}
              </Link>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
