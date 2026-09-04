type ContentAgentToolEvent = {
  toolCallId: string;
  toolName: string;
  input?: unknown;
  output?: unknown;
};

type ContentAgentDraft = {
  title: string;
  description?: string;
  markdown: string;
  categories?: string[];
  tags?: string[];
  readTime?: string;
  wordCount?: number;
};

type ContentAgentChatResult = {
  thread_id: string;
  assistant_text: string;
  tool_events: ContentAgentToolEvent[];
  draft: ContentAgentDraft | null;
};

export function getContentAgentUrl(): string | null {
  const raw = process.env.CONTENT_AGENT_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, '');
}

export function isContentAgentEnabled(): boolean {
  return Boolean(getContentAgentUrl());
}

export async function callContentAgentChat({
  message,
  threadId,
}: {
  message: string;
  threadId?: string | null;
}): Promise<ContentAgentChatResult> {
  const baseUrl = getContentAgentUrl();
  if (!baseUrl) {
    throw new Error('CONTENT_AGENT_URL is not configured.');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const apiKey = process.env.CONTENT_AGENT_API_KEY?.trim();
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const response = await fetch(`${baseUrl}/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message,
      thread_id: threadId ?? undefined,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(280_000),
  });

  let data: ContentAgentChatResult & { detail?: string | { msg?: string } };
  try {
    data = (await response.json()) as ContentAgentChatResult & {
      detail?: string | { msg?: string };
    };
  } catch {
    throw new Error(
      `Content agent returned a non-JSON response (HTTP ${response.status}). Check CONTENT_AGENT_URL and VM firewall.`
    );
  }

  if (!response.ok) {
    const detail = data.detail;
    const detailText =
      typeof detail === 'string'
        ? detail
        : detail && typeof detail === 'object' && 'msg' in detail
          ? String(detail.msg)
          : `Content agent request failed (HTTP ${response.status}).`;
    throw new Error(detailText);
  }

  return data;
}

export function getLastUserMessageText(
  messages: Array<{
    role: string;
    parts?: Array<{ type: string; text?: string }>;
  }>
): string {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role !== 'user') continue;
    const text = (message.parts ?? [])
      .filter((part) => part.type === 'text')
      .map((part) => part.text ?? '')
      .join('')
      .trim();
    if (text) return text;
  }
  return '';
}
