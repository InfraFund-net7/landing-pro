import {
  COMPOSE_SYSTEM,
  createComposeTools,
  getComposeModel,
} from '@/lib/compose-agent';
import { canManageContent } from '@/access/roles.js';
import { getAdminApiContext } from '@/lib/admin-api-auth.js';
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from 'ai';
import { NextResponse } from 'next/server';

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
    tools: createComposeTools(),
    stopWhen: stepCountIs(6),
  });

  return result.toUIMessageStreamResponse();
}
