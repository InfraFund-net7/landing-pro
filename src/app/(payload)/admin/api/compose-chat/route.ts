import { canManageContent } from '@/access/roles.js';
import { getAdminApiContext } from '@/lib/admin-api-auth.js';
import {
  callContentAgentChat,
  getContentAgentUrl,
  getLastUserMessageText,
  isContentAgentEnabled,
} from '@/lib/content-agent-client';
import {
  COMPOSE_SYSTEM,
  createComposeTools,
  getComposeModel,
} from '@/lib/compose-agent';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  stepCountIs,
  streamText,
  type UIMessage,
} from 'ai';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const THREAD_COOKIE = 'compose-agent-thread-id';

export const maxDuration = 300;

function normalizeToolOutput(output: unknown): unknown {
  if (typeof output !== 'string') return output;
  try {
    return JSON.parse(output) as unknown;
  } catch {
    return output;
  }
}

async function streamFromContentAgent(
  messages: UIMessage[],
  threadId: string | undefined
) {
  const prompt = getLastUserMessageText(messages);
  if (!prompt) {
    throw new Error('Send a message to start composing.');
  }

  const agentResult = await callContentAgentChat({
    message: prompt,
    threadId,
  });

  const stream = createUIMessageStream({
    originalMessages: messages,
    onError: (error) =>
      error instanceof Error ? error.message : 'Content agent stream failed.',
    execute: ({ writer }) => {
      writer.write({ type: 'start' });
      writer.write({ type: 'start-step' });

      for (const event of agentResult.tool_events) {
        const toolCallId = event.toolCallId || generateId();

        writer.write({
          type: 'tool-input-start',
          toolCallId,
          toolName: event.toolName,
          dynamic: true,
        });

        writer.write({
          type: 'tool-input-available',
          toolCallId,
          toolName: event.toolName,
          input: event.input ?? {},
          dynamic: true,
        });

        writer.write({
          type: 'tool-output-available',
          toolCallId,
          output: normalizeToolOutput(event.output),
          dynamic: true,
        });
      }

      const assistantText =
        agentResult.assistant_text.trim() ||
        (agentResult.draft?.title
          ? `Draft ready: ${agentResult.draft.title}`
          : 'The content agent finished without a text summary.');

      const textId = generateId();
      writer.write({ type: 'text-start', id: textId });
      writer.write({
        type: 'text-delta',
        id: textId,
        delta: assistantText,
      });
      writer.write({ type: 'text-end', id: textId });

      writer.write({ type: 'finish-step' });
      writer.write({ type: 'finish', finishReason: 'stop' });
    },
  });

  const response = createUIMessageStreamResponse({ stream });
  response.headers.set(
    'Set-Cookie',
    `${THREAD_COOKIE}=${agentResult.thread_id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
  );
  return response;
}

export async function POST(request: Request) {
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

  if (isContentAgentEnabled()) {
    try {
      const cookieStore = await cookies();
      const threadId = cookieStore.get(THREAD_COOKIE)?.value;
      return await streamFromContentAgent(messages, threadId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Content agent request failed.';
      return NextResponse.json({ message }, { status: 502 });
    }
  }

  if (!process.env.AI_GATEWAY_API_KEY) {
    const agentUrl = getContentAgentUrl();
    return NextResponse.json(
      {
        message: agentUrl
          ? 'Content agent is unreachable. Check CONTENT_AGENT_URL and VM service health.'
          : 'AI composition is not configured. Set CONTENT_AGENT_URL (LangGraph VM) or AI_GATEWAY_API_KEY.',
      },
      { status: 503 }
    );
  }

  const result = streamText({
    model: getComposeModel(),
    system: COMPOSE_SYSTEM,
    messages: await convertToModelMessages(messages),
    tools: createComposeTools(),
    stopWhen: stepCountIs(8),
  });

  return result.toUIMessageStreamResponse({
    onError: (error) =>
      error instanceof Error
        ? error.message
        : 'AI Gateway composition failed. Set CONTENT_AGENT_URL on Preview to use the LangGraph VM agent instead.',
  });
}
