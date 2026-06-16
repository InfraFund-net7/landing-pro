import { z } from 'zod';

export const composePostDraftSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(''),
  markdown: z.string().min(1),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  readTime: z.string().default(''),
});

export type ComposePostDraft = z.infer<typeof composePostDraftSchema>;

export function extractLatestComposeDraft(
  messages: Array<{
    parts: Array<{ type: string; state?: string; output?: unknown }>;
  }>
): ComposePostDraft | null {
  let latest: ComposePostDraft | null = null;

  for (const message of messages) {
    for (const part of message.parts) {
      if (part.type !== 'tool-updatePostDraft') continue;
      if (part.state !== 'output-available') continue;
      const parsed = composePostDraftSchema.safeParse(part.output);
      if (parsed.success) {
        latest = parsed.data;
      }
    }
  }

  return latest;
}

export function markdownToPostHtml(markdown: string): string {
  const blocks = markdown
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) return '';

  return blocks
    .map((block) => {
      if (block.startsWith('### ')) {
        return `<h3>${escapeHtml(block.slice(4))}</h3>`;
      }
      if (block.startsWith('## ')) {
        return `<h2>${escapeHtml(block.slice(3))}</h2>`;
      }
      if (block.startsWith('# ')) {
        return `<h1>${escapeHtml(block.slice(2))}</h1>`;
      }
      if (block.startsWith('- ')) {
        const items = block
          .split('\n')
          .map((line) => line.replace(/^- /, '').trim())
          .filter(Boolean)
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${escapeHtml(block).replace(/\n/g, '<br />')}</p>`;
    })
    .join('');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
