type CmsBlogContentProps = {
  content: string;
};

export default function CmsBlogContent({ content }: CmsBlogContentProps) {
  const paragraphs = content
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
