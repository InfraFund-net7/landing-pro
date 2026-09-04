/** Average adult reading speed for online articles (words per minute). */
export const BLOG_READING_WPM = 225;

function plainTextFromHtml(html) {
  return String(html ?? '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(text) {
  const normalized = String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized) return 0;
  return normalized.split(' ').filter(Boolean).length;
}

export function countWordsInContent(content) {
  return countWords(plainTextFromHtml(content));
}

function calculateReadTimeMinutes(
  wordCount,
  wordsPerMinute = BLOG_READING_WPM
) {
  if (wordCount <= 0) return 1;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function formatReadTimeLabel(minutes) {
  return `${minutes} min read`;
}

export function calculateReadTimeFromContent(
  content,
  wordsPerMinute = BLOG_READING_WPM
) {
  const wordCount = countWordsInContent(content);
  const minutes = calculateReadTimeMinutes(wordCount, wordsPerMinute);
  return formatReadTimeLabel(minutes);
}
