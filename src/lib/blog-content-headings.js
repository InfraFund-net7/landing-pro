import { slugifyPost } from './admin-post-form-utils.js';

/**
 * Extract H2 headings from blog HTML and inject stable `id` attributes for in-page navigation.
 *
 * @param {string} html
 * @returns {{ headings: { id: string; text: string }[]; processedHtml: string }}
 */
export function prepareBlogContentHeadings(html) {
  const headings = [];
  const usedIds = new Set();

  const processedHtml = html.replace(
    /<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi,
    (match, attrs = '', inner) => {
      const text = inner
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (!text) return match;

      let baseId = slugifyPost(text) || 'section';
      let id = baseId;
      let counter = 2;
      while (usedIds.has(id)) {
        id = `${baseId}-${counter++}`;
      }
      usedIds.add(id);
      headings.push({ id, text });

      const cleanAttrs = attrs.replace(/\sid=(['"])[^'"]*\1/i, '');
      return `<h2${cleanAttrs} id="${id}">${inner}</h2>`;
    }
  );

  return { headings, processedHtml };
}
