const DEFAULT_AZURE_BASE_URL =
  'https://blog-post-news-resource.openai.azure.com/openai/v1';

const DEFAULT_SUMMARIZE_MODEL = 'gpt-5.4-mini';

const SUMMARIZE_INSTRUCTIONS = `You are an expert editorial and SEO assistant for InfraFund's blog.

Summarize the blog post content the user provides. Write a professional summary optimized for search engines:
- Lead with the core topic and value for readers
- Use clear, natural language with relevant keywords (no keyword stuffing)
- Keep it accurate to the source material
- Aim for 2–4 sentences, roughly 40–80 words
- Do not use markdown, bullet lists, or a title — return plain summary text only`;

function resolveAzureBaseUrl(): string {
  return (
    process.env.BLOG_SUMMARIZE_AZURE_BASE_URL?.trim() || DEFAULT_AZURE_BASE_URL
  ).replace(/\/$/, '');
}

function resolveSummarizeModel(): string {
  return process.env.BLOG_SUMMARIZE_MODEL?.trim() || DEFAULT_SUMMARIZE_MODEL;
}

function resolveAzureApiKey(): string | null {
  const key =
    process.env.BLOG_SUMMARIZE_AZURE_API_KEY?.trim() ||
    process.env.AZURE_OPENAI_API_KEY?.trim();
  return key || null;
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<li>/gi, '• ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function extractOutputText(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return '';

  const record = payload as Record<string, unknown>;

  if (typeof record.output_text === 'string' && record.output_text.trim()) {
    return record.output_text.trim();
  }

  const output = record.output;
  if (!Array.isArray(output)) return '';

  const chunks: string[] = [];

  for (const item of output) {
    if (!item || typeof item !== 'object') continue;
    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) continue;

    for (const part of content) {
      if (!part || typeof part !== 'object') continue;
      const text = (part as { text?: unknown }).text;
      if (typeof text === 'string' && text.trim()) {
        chunks.push(text.trim());
      }
    }
  }

  return chunks.join('\n\n').trim();
}

export async function summarizePostContent(mainContentHtml: string): Promise<{
  ok: true;
  summary: string;
}> {
  const apiKey = resolveAzureApiKey();
  if (!apiKey) {
    throw new Error(
      'Summarization is not configured. Add BLOG_SUMMARIZE_AZURE_API_KEY to your environment.'
    );
  }

  const plainText = htmlToPlainText(mainContentHtml);
  if (!plainText) {
    throw new Error('Add main content before generating a summary.');
  }

  const input =
    plainText.length > 12000
      ? `${plainText.slice(0, 12000)}\n\n[Content truncated for summarization.]`
      : plainText;

  const response = await fetch(`${resolveAzureBaseUrl()}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: resolveSummarizeModel(),
      instructions: SUMMARIZE_INSTRUCTIONS,
      input,
    }),
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === 'object' &&
      'error' in payload &&
      payload.error &&
      typeof payload.error === 'object' &&
      'message' in payload.error &&
      typeof payload.error.message === 'string'
        ? payload.error.message
        : `Summarization request failed (${response.status}).`;
    throw new Error(message);
  }

  const summary = extractOutputText(payload);
  if (!summary) {
    throw new Error('The model returned an empty summary. Please try again.');
  }

  return { ok: true, summary };
}
