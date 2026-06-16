import { canManageContent } from '@/access/roles.js';
import { composePostDraftSchema } from '@/lib/compose-post';
import { getAdminApiContext } from '@/lib/admin-api-auth.js';
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const COMPOSE_SYSTEM = `You are InfraFund's editorial AI assistant. Help content managers draft blog posts about infrastructure finance, climate investing, blockchain in real-world assets, and related topics.

Workflow:
1. When the user shares a topic, briefly clarify the angle if needed.
2. Use researchTopic to gather structured talking points before writing.
3. Use updatePostDraft to write or revise the full draft artifact (title, description, markdown body, categories, tags, readTime).
4. Keep tone professional, clear, and aligned with a fintech / climate impact audience.
5. Prefer markdown with ## section headings, short paragraphs, and bullet lists where helpful.
6. After updating the draft, summarize what you changed in plain language.`;

function getComposeModel(): string {
  return process.env.COMPOSE_MODEL?.trim() || 'openai/gpt-4.1-mini';
}

export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return NextResponse.json(
      {
        message:
          'AI composition is not configured. Add AI_GATEWAY_API_KEY to your environment.',
      },
      { status: 503 }
    );
  }

  const { user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!canManageContent(user)) {
    return NextResponse.json(
      { message: 'You do not have permission to compose posts.' },
      { status: 403 }
    );
  }

  let body: { messages?: UIMessage[] };
  try {
    body = (await request.json()) as { messages?: UIMessage[] };
  } catch {
    return NextResponse.json(
      { message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const messages = body.messages ?? [];

  const result = streamText({
    model: getComposeModel(),
    system: COMPOSE_SYSTEM,
    messages: await convertToModelMessages(messages),
    tools: {
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
    },
    stopWhen: stepCountIs(6),
  });

  return result.toUIMessageStreamResponse();
}
