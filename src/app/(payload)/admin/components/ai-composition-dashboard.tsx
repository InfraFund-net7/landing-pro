'use client';

import AdminPortalLayout from '@/app/(payload)/admin/components/admin-portal-layout';
import {
  Artifact,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from '@/components/ai-elements/artifact';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  extractLatestComposeDraft,
  type ComposePostDraft,
} from '@/lib/compose-post';
import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  isReasoningUIPart,
  isTextUIPart,
  isToolUIPart,
  type UIMessage,
} from 'ai';
import {
  FileText,
  Loader2,
  PenLine,
  Send,
  Sparkles,
  Square,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styles from '../create-post/ai-composition.module.css';

const suggestions = [
  'Draft a post explaining tokenized infrastructure for first-time investors',
  'Write about how climate data improves due diligence for green projects',
  'Create an editorial on blockchain transparency in public infrastructure funding',
  'Outline a thought-leadership piece on bridging Web3 builders and institutional capital',
];

type AiCompositionDashboardProps = {
  userName: string;
  userInitial: string;
  modelLabel?: string;
};

function getTextFromParts(parts: UIMessage['parts']): string {
  return parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join('');
}

function getReasoningFromParts(parts: UIMessage['parts']): string {
  return parts
    .filter(isReasoningUIPart)
    .map((part) => part.text)
    .join('\n\n');
}

export default function AiCompositionDashboard({
  userName,
  userInitial,
  modelLabel = 'gpt-4.1-mini',
}: AiCompositionDashboardProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<ComposePostDraft | null>(null);
  const [input, setInput] = useState('');
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/admin/api/compose-chat',
    }),
  });

  const isStreaming = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    const latest = extractLatestComposeDraft(messages);
    if (latest) {
      setDraft(latest);
    }
  }, [messages]);

  const showArtifact = Boolean(draft);

  const handleSubmit = (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    const text = input.trim();
    if (!text || isStreaming) return;

    setSaveError('');
    setInput('');
    void sendMessage({ text });
  };

  const handleSuggestion = (suggestion: string) => {
    if (isStreaming) return;
    setSaveError('');
    void sendMessage({ text: suggestion });
  };

  const handleSaveDraft = async () => {
    if (!draft) return;

    setIsSaving(true);
    setSaveError('');

    try {
      const response = await fetch('/admin/api/compose-draft', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      const data = (await response.json()) as {
        message?: string;
        id?: number;
      };

      if (!response.ok) {
        setSaveError(data.message || 'Unable to save draft.');
        return;
      }

      if (data.id) {
        router.push(
          `/admin/edit-post/${data.id}?success=Draft%20saved%20from%20AI%20composition`
        );
      }
    } catch {
      setSaveError('Unable to save draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const artifactMarkdown = useMemo(() => {
    if (!draft) return '';
    const meta = [
      draft.description ? `> ${draft.description}` : '',
      draft.categories.length
        ? `**Categories:** ${draft.categories.join(', ')}`
        : '',
      draft.tags.length
        ? `**Tags:** ${draft.tags.map((t) => `#${t}`).join(' ')}`
        : '',
      draft.readTime ? `**Read time:** ${draft.readTime}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    return meta ? `${meta}\n\n---\n\n${draft.markdown}` : draft.markdown;
  }, [draft]);

  return (
    <AdminPortalLayout userName={userName} userInitial={userInitial}>
      <TooltipProvider>
        <div className={`dark ${styles.workspace}`}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>
                <Sparkles size={14} />
                AI Composition
              </p>
              <h1 className={styles.title}>Compose your next post</h1>
              <p className={styles.subtitle}>
                Chat with the editorial agent on the left. Reasoning, tool
                calls, and the live draft artifact update as the model works.
              </p>
            </div>
            <div className={styles.headerActions}>
              <span className={styles.modelBadge}>⚡ {modelLabel}</span>
              <Link
                href="/admin/create-post/manual"
                className={styles.manualLink}
              >
                <PenLine size={14} />
                Manual editor
              </Link>
            </div>
          </header>

          {(error || saveError) && (
            <div className={styles.flashRow}>
              {error ? (
                <p className={styles.flashError}>{error.message}</p>
              ) : null}
              {saveError ? (
                <p className={styles.flashError}>{saveError}</p>
              ) : null}
            </div>
          )}

          <div
            className={`${styles.split} ${showArtifact ? styles.splitWithArtifact : ''}`}
          >
            <section className={styles.chatPane}>
              <Conversation className={styles.conversation}>
                <ConversationContent>
                  {messages.length === 0 ? (
                    <ConversationEmptyState
                      title="Start with a topic"
                      description="Describe the post you want — audience, angle, tone, or key points. The agent will research, draft, and refine the artifact on the right."
                      icon={<Sparkles className="size-8 text-primary" />}
                    />
                  ) : (
                    messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        isStreaming={isStreaming}
                      />
                    ))
                  )}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>

              {messages.length === 0 ? (
                <div className={styles.suggestions}>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className={styles.suggestionChip}
                      onClick={() => handleSuggestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}

              <form className={styles.promptWrap} onSubmit={handleSubmit}>
                <Textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Describe the post you want to create..."
                  disabled={isStreaming}
                  rows={3}
                  className={styles.promptTextarea}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <div className={styles.promptFooter}>
                  <span className={styles.promptHint}>
                    Enter to send, Shift+Enter for a new line. The agent can
                    research topics and update the draft artifact.
                  </span>
                  {isStreaming ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={stop}
                    >
                      <Square className="size-4" />
                      Stop
                    </Button>
                  ) : (
                    <Button type="submit" size="sm" disabled={!input.trim()}>
                      <Send className="size-4" />
                      Send
                    </Button>
                  )}
                </div>
              </form>
            </section>

            {showArtifact && draft ? (
              <section className={styles.artifactPane}>
                <Artifact className={styles.artifact}>
                  <ArtifactHeader>
                    <div>
                      <ArtifactTitle>{draft.title}</ArtifactTitle>
                      <ArtifactDescription>
                        Live draft artifact — updated when the agent calls{' '}
                        <code>updatePostDraft</code>
                      </ArtifactDescription>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => void handleSaveDraft()}
                      disabled={isSaving || isStreaming}
                    >
                      {isSaving ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <FileText className="size-4" />
                      )}
                      Save as draft
                    </Button>
                  </ArtifactHeader>
                  <ArtifactContent className={styles.artifactContent}>
                    <MessageResponse>{artifactMarkdown}</MessageResponse>
                  </ArtifactContent>
                </Artifact>
              </section>
            ) : null}
          </div>
        </div>
      </TooltipProvider>
    </AdminPortalLayout>
  );
}

function ChatMessage({
  message,
  isStreaming,
}: {
  message: UIMessage;
  isStreaming: boolean;
}) {
  const reasoning = getReasoningFromParts(message.parts);
  const text = getTextFromParts(message.parts);
  const toolParts = message.parts.filter(isToolUIPart);
  const messageIsStreaming =
    isStreaming && message.role === 'assistant' && message.id === undefined;

  return (
    <Message from={message.role}>
      <MessageContent>
        {reasoning ? (
          <Reasoning
            isStreaming={
              isStreaming &&
              message.role === 'assistant' &&
              !text &&
              toolParts.length === 0
            }
          >
            <ReasoningTrigger />
            <ReasoningContent>{reasoning}</ReasoningContent>
          </Reasoning>
        ) : null}

        {toolParts.map((part, index) => (
          <Tool
            defaultOpen={part.state === 'output-available'}
            key={`${part.type}-${index}`}
          >
            {part.type === 'dynamic-tool' ? (
              <ToolHeader
                type="dynamic-tool"
                state={part.state}
                toolName={part.toolName}
              />
            ) : (
              <ToolHeader type={part.type} state={part.state} />
            )}
            <ToolContent>
              <ToolInput input={part.input} />
              <ToolOutput output={part.output} errorText={part.errorText} />
            </ToolContent>
          </Tool>
        ))}

        {text ? (
          <MessageResponse isAnimating={messageIsStreaming}>
            {text}
          </MessageResponse>
        ) : null}
      </MessageContent>
    </Message>
  );
}
