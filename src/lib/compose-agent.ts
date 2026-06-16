import {
  composePostDraftSchema,
  type ComposePostDraft,
} from '@/lib/compose-post';
import { generateText, stepCountIs, tool } from 'ai';
import { z } from 'zod';

export const COMPOSE_SYSTEM = `You are InfraFund's editorial AI assistant. Help content managers draft blog posts about infrastructure finance, climate investing, blockchain in real-world assets, and related topics.

Workflow:
1. When the user shares a topic, briefly clarify the angle if needed.
2. Use researchTopic to gather structured talking points before writing.
3. Use updatePostDraft to write or revise the full draft artifact (title, description, markdown body, categories, tags, readTime).
4. Keep tone professional, clear, and aligned with a fintech / climate impact audience.
5. Prefer markdown with ## section headings, short paragraphs, and bullet lists where helpful.
6. After updating the draft, summarize what you changed in plain language.`;

export function getComposeModel(): string {
  return process.env.COMPOSE_MODEL?.trim() || 'openai/gpt-4.1-mini';
}

export function createComposeTools() {
  return {
    researchTopic: tool({
      description:
        'Research angles, audience fit, and talking points for a blog topic before drafting.',
      inputSchema: z.object({
        topic: z.string().min(1),
        audience: z.string().optional(),
      }),
      execute: async ({ topic, audience }) => {
        const targetAudience =
          audience?.trim() ||
          'infrastructure investors and climate-conscious builders';

        return {
          topic,
          audience: targetAudience,
          angles: [
            'Market context and why the topic matters now',
            'Practical implications for investors or project builders',
            'InfraFund-relevant perspective on transparency, access, or impact',
          ],
          talkingPoints: [
            `Define the core problem around "${topic}" in plain language`,
            'Highlight one concrete example or use case',
            'Connect the topic to measurable outcomes or trust',
            'Close with a forward-looking takeaway for readers',
          ],
          suggestedCategories: [
            'Infrastructure',
            'Climate Finance',
            'Insights',
          ],
        };
      },
    }),
    updatePostDraft: tool({
      description:
        'Create or update the blog post draft artifact shown in the editor panel.',
      inputSchema: composePostDraftSchema,
      execute: async (draft) => draft,
    }),
  };
}

type ToolResultLike = {
  toolName: string;
  output: unknown;
};

function extractDraftFromToolResults(
  toolResults: ToolResultLike[]
): ComposePostDraft | null {
  let latest: ComposePostDraft | null = null;

  for (const result of toolResults) {
    if (result.toolName !== 'updatePostDraft') continue;
    const parsed = composePostDraftSchema.safeParse(result.output);
    if (parsed.success) {
      latest = parsed.data;
    }
  }

  return latest;
}

export async function runComposeAgent(prompt: string): Promise<{
  draft: ComposePostDraft | null;
  summary: string;
}> {
  const result = await generateText({
    model: getComposeModel(),
    system: COMPOSE_SYSTEM,
    prompt,
    tools: createComposeTools(),
    stopWhen: stepCountIs(6),
  });

  const allToolResults = result.steps.flatMap((step) =>
    step.toolResults.map((toolResult) => ({
      toolName: toolResult.toolName,
      output: toolResult.output,
    }))
  );

  return {
    draft: extractDraftFromToolResults(allToolResults),
    summary: result.text.trim(),
  };
}
