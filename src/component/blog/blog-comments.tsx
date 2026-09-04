'use client';

import type { BlogComment } from '@/lib/cms-comment-types';
import { cmsImageNeedsUnoptimized } from '@/lib/cms-next-image';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type BlogCommentsProps = {
  postId: number;
  initialComments: BlogComment[];
};

type EditorSession = {
  name: string;
  title: string;
  avatar: string;
};

export default function BlogComments({
  postId,
  initialComments,
}: BlogCommentsProps) {
  const [comments, setComments] = useState(initialComments);
  const [editor, setEditor] = useState<EditorSession | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadComments = useCallback(async () => {
    const response = await fetch(`/api/blog/comments?postId=${postId}`, {
      credentials: 'same-origin',
    });
    const data = (await response.json()) as {
      comments?: BlogComment[];
      editor?: EditorSession | null;
    };

    if (response.ok && data.comments) {
      setComments(data.comments);
    }

    if (response.ok && data.editor) {
      setEditor(data.editor);
      setAuthorName(data.editor.name);
    }
  }, [postId]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/blog/comments', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          authorName: editor?.name || authorName,
          authorEmail,
          content,
        }),
      });

      const data = (await response.json()) as {
        message?: string;
        publishedImmediately?: boolean;
        comments?: BlogComment[];
      };

      if (!response.ok) {
        setError(data.message || 'Unable to submit your comment.');
        return;
      }

      setContent('');
      if (!editor) {
        setAuthorName('');
        setAuthorEmail('');
      }

      if (data.publishedImmediately && data.comments) {
        setComments(data.comments);
      }

      setMessage(
        data.message ||
          (data.publishedImmediately
            ? 'Your comment was published.'
            : 'Thanks for your comment. It will appear after editorial review.')
      );
    } catch {
      setError('Unable to submit your comment right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-medium text-white">Comments</h2>
        <p className="text-sm text-[#A7B7D9]">
          {editor
            ? 'You are signed in as an editor — your comments publish immediately.'
            : 'Join the conversation. Comments are reviewed before they appear.'}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {comments.length === 0 ? (
          <p className="text-sm text-[#A7B7D9]">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          comments.map((comment) => (
            <CommentThread key={comment.id} comment={comment} />
          ))
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-[#1E2B47] bg-[#0B1220] p-6 flex flex-col gap-4"
      >
        <h3 className="text-lg font-medium text-white">Leave a comment</h3>

        {editor ? (
          <div className="flex items-center gap-3 rounded-xl border border-[#1E8F57]/40 bg-[#0F2C22]/40 px-4 py-3">
            <CommentAvatar
              name={editor.name}
              avatar={editor.avatar}
              size="md"
            />
            <div>
              <p className="text-sm font-medium text-white">{editor.name}</p>
              {editor.title ? (
                <p className="text-xs text-[#8a9bb8]">{editor.title}</p>
              ) : null}
              <p className="text-xs text-[#7DFFB0]">Publishing as InfraFund</p>
            </div>
          </div>
        ) : null}

        {message ? (
          <p className="rounded-lg border border-[#166534] bg-[#0F2C22] px-3 py-2 text-sm text-[#C8FACC]">
            {message}
          </p>
        ) : null}

        {error ? (
          <p className="rounded-lg border border-[#7F1D1D] bg-[#3D1320] px-3 py-2 text-sm text-[#FECACA]">
            {error}
          </p>
        ) : null}

        {!editor ? (
          <>
            <TextField
              id="comment-author"
              label="Name"
              value={authorName}
              onChange={setAuthorName}
              required
            />

            <TextField
              id="comment-email"
              label="Email (optional)"
              value={authorEmail}
              onChange={setAuthorEmail}
              type="email"
            />
          </>
        ) : null}

        <div className="flex flex-col gap-2">
          <label htmlFor="comment-content" className="text-sm text-[#A7B7D9]">
            Comment
          </label>
          <textarea
            id="comment-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            required
            className="w-full rounded-xl border border-[#1E2B47] bg-[#0D1425] px-4 py-3 text-sm text-white outline-none"
            placeholder={
              editor ? 'Write your response…' : 'Share your thoughts...'
            }
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start rounded-lg bg-[#23DB7B] px-5 py-2.5 text-sm font-semibold text-[#032514] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? 'Submitting...'
            : editor
              ? 'Publish comment'
              : 'Submit Comment'}
        </button>
      </form>
    </section>
  );
}

function CommentThread({ comment }: { comment: BlogComment }) {
  return (
    <article className="rounded-2xl border border-[#1E2B47] bg-[#0B1220] p-5">
      <CommentHeader comment={comment} />
      <p className="text-sm leading-7 text-[#D7E2FF] whitespace-pre-wrap">
        {comment.content}
      </p>
      {comment.replies.length > 0 ? (
        <div className="mt-5 flex flex-col gap-4 border-l border-[#1E2B47] pl-4">
          {comment.replies.map((reply) => (
            <Reply key={reply.id} reply={reply} />
          ))}
        </div>
      ) : null}
    </article>
  );
}

function Reply({ reply }: { reply: BlogComment }) {
  return (
    <div className="rounded-xl bg-[#0D1425] p-4">
      <CommentHeader comment={reply} />
      <p className="text-sm leading-7 text-[#D7E2FF] whitespace-pre-wrap">
        {reply.content}
      </p>
    </div>
  );
}

function CommentHeader({ comment }: { comment: BlogComment }) {
  return (
    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <CommentAvatar
          name={comment.authorName}
          avatar={comment.authorAvatar}
          size="md"
        />
        <div>
          <p className="text-sm font-medium text-white">{comment.authorName}</p>
          {comment.authorTitle ? (
            <p className="text-xs text-[#8a9bb8]">{comment.authorTitle}</p>
          ) : null}
          <p className="text-xs text-[#7D8FB3]">{comment.createdAt}</p>
        </div>
      </div>
      {comment.isTeamMember ? (
        <span className="rounded-full border border-[#1E8F57] bg-[#0F2C22]/60 px-3 py-1 text-xs font-medium text-[#7DFFB0]">
          InfraFund
        </span>
      ) : null}
    </div>
  );
}

function CommentAvatar({
  name,
  avatar,
  size = 'md',
}: {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md';
}) {
  const dimension = size === 'sm' ? 36 : 44;
  const className =
    size === 'sm'
      ? 'h-9 w-9 rounded-full object-cover border border-[#2A3B61] shrink-0'
      : 'h-11 w-11 rounded-full object-cover border border-[#2A3B61] shrink-0';

  if (avatar) {
    return (
      <Image
        src={avatar}
        alt={name}
        width={dimension}
        height={dimension}
        unoptimized={cmsImageNeedsUnoptimized(avatar)}
        className={className}
      />
    );
  }

  return (
    <div
      className={`${className} flex items-center justify-center bg-gradient-to-br from-[#1e2b47] to-[#102247] text-sm font-semibold text-[#24ff8e]`}
      aria-hidden
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  required,
  type = 'text',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-[#A7B7D9]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full rounded-xl border border-[#1E2B47] bg-[#0D1425] px-4 py-3 text-sm text-white outline-none"
      />
    </div>
  );
}
