'use client';

import AdminPortalLayout from '@/app/(payload)/admin/components/admin-portal-layout';
import {
  buildAdminCommentTree,
  type AdminComment,
  type AdminCommentNode,
  type CommentStatus,
  type EditorReplyProfile,
} from '@/lib/cms-comments';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './comment-management.module.css';

type CommentManagementPanelProps = {
  comments: AdminComment[];
  filter: CommentStatus | 'all';
  pendingCount: number;
  editorProfile: EditorReplyProfile;
  userName: string;
  userInitial: string;
  flashSuccess?: string;
  flashError?: string;
};

const filters: Array<{ value: CommentStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'unapproved', label: 'Unapproved' },
  { value: 'spam', label: 'Spam' },
];

type CommentAction = 'approve' | 'unapprove' | 'spam' | 'delete' | 'reply';

export default function CommentManagementPanel({
  comments: initialComments,
  filter,
  pendingCount,
  editorProfile,
  userName,
  userInitial,
  flashSuccess,
  flashError,
}: CommentManagementPanelProps) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [search, setSearch] = useState('');
  const [replyTarget, setReplyTarget] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminComment | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [message, setMessage] = useState(flashSuccess ?? '');
  const [error, setError] = useState(flashError ?? '');

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  useEffect(() => {
    if (flashSuccess) setMessage(flashSuccess);
    if (flashError) setError(flashError);
  }, [flashSuccess, flashError]);

  const filteredComments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return comments;

    return comments.filter((comment) => {
      const haystack = [
        comment.authorName,
        comment.content,
        comment.postTitle,
        comment.postSlug,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [comments, search]);

  const threads = useMemo(
    () => buildAdminCommentTree(filteredComments, filter),
    [filteredComments, filter]
  );

  const refreshComments = useCallback(async () => {
    const response = await fetch('/admin/api/comments', {
      credentials: 'same-origin',
    });
    const data = (await response.json()) as {
      comments?: AdminComment[];
      message?: string;
    };

    if (!response.ok || !data.comments) {
      throw new Error(data.message || 'Unable to refresh comments.');
    }

    setComments(data.comments);
    router.refresh();
  }, [router]);

  const runAction = useCallback(
    async (
      action: CommentAction,
      comment: AdminComment,
      extra?: { content?: string }
    ) => {
      setBusyId(comment.id);
      setMessage('');
      setError('');

      try {
        const response = await fetch('/admin/api/comments', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action,
            commentId: comment.id,
            postId: comment.postId,
            postTitle: comment.postTitle,
            postSlug: comment.postSlug,
            content: extra?.content,
          }),
        });

        const data = (await response.json()) as { message?: string };

        if (!response.ok) {
          throw new Error(data.message || 'Unable to complete that action.');
        }

        if (action === 'reply') {
          setReplyTarget(null);
        }

        if (action === 'delete') {
          setDeleteTarget(null);
        }

        setMessage(data.message || 'Updated.');
        await refreshComments();
      } catch (actionError) {
        setError(
          actionError instanceof Error
            ? actionError.message
            : 'Unable to complete that action.'
        );
      } finally {
        setBusyId(null);
      }
    },
    [refreshComments]
  );

  return (
    <AdminPortalLayout userName={userName} userInitial={userInitial}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h1>Comments</h1>
          <p>
            Review reader comments and reply inline. Replies publish immediately
            on the live blog post under your name.
          </p>
        </div>
        <div className={styles.stats}>
          <span className={styles.statPill}>
            Pending review: <strong>{pendingCount}</strong>
          </span>
          <span className={styles.statPill}>
            Threads: <strong>{threads.length}</strong>
          </span>
        </div>
      </div>

      {error ? (
        <p className={`${styles.alert} ${styles.alertError}`}>{error}</p>
      ) : null}
      {message ? (
        <p className={`${styles.alert} ${styles.alertSuccess}`}>{message}</p>
      ) : null}

      <div className={styles.toolbar}>
        {filters.map((item) => (
          <Link
            key={item.value}
            href={`/admin/comment-management?filter=${item.value}`}
            className={
              filter === item.value
                ? styles.filterChipActive
                : styles.filterChip
            }
          >
            {item.label}
            {item.value === 'pending' && pendingCount > 0
              ? ` (${pendingCount})`
              : ''}
          </Link>
        ))}
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search author, comment, or post..."
          className={styles.searchInput}
          aria-label="Search comments"
        />
      </div>

      {threads.length === 0 ? (
        <div className={styles.emptyState}>
          No comments match this view. Try another filter or search term.
        </div>
      ) : (
        <div className={styles.threadList}>
          {threads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              editorProfile={editorProfile}
              replyTarget={replyTarget}
              setReplyTarget={setReplyTarget}
              setDeleteTarget={setDeleteTarget}
              busyId={busyId}
              onAction={runAction}
            />
          ))}
        </div>
      )}

      {deleteTarget ? (
        <DeleteModal
          comment={deleteTarget}
          busy={busyId === deleteTarget.id}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => runAction('delete', deleteTarget)}
        />
      ) : null}
    </AdminPortalLayout>
  );
}

function ThreadCard({
  thread,
  editorProfile,
  replyTarget,
  setReplyTarget,
  setDeleteTarget,
  busyId,
  onAction,
}: {
  thread: AdminCommentNode;
  editorProfile: EditorReplyProfile;
  replyTarget: number | null;
  setReplyTarget: (value: number | null) => void;
  setDeleteTarget: (value: AdminComment | null) => void;
  busyId: number | null;
  onAction: (
    action: CommentAction,
    comment: AdminComment,
    extra?: { content?: string }
  ) => Promise<void>;
}) {
  return (
    <article className={styles.threadCard}>
      <div className={styles.threadHeader}>
        <div>
          {thread.postSlug ? (
            <Link
              href={`/blog/${thread.postSlug}`}
              className={styles.postLink}
              target="_blank"
              rel="noreferrer"
            >
              {thread.postTitle}
            </Link>
          ) : (
            <span className={styles.postLink}>{thread.postTitle}</span>
          )}
          <div className={styles.postMeta}>Live blog post</div>
        </div>
      </div>

      <div className={styles.commentStack}>
        <CommentNodeView
          node={thread}
          depth={0}
          editorProfile={editorProfile}
          replyTarget={replyTarget}
          setReplyTarget={setReplyTarget}
          setDeleteTarget={setDeleteTarget}
          busyId={busyId}
          onAction={onAction}
        />
      </div>
    </article>
  );
}

function CommentNodeView({
  node,
  depth,
  editorProfile,
  replyTarget,
  setReplyTarget,
  setDeleteTarget,
  busyId,
  onAction,
}: {
  node: AdminCommentNode;
  depth: number;
  editorProfile: EditorReplyProfile;
  replyTarget: number | null;
  setReplyTarget: (value: number | null) => void;
  setDeleteTarget: (value: AdminComment | null) => void;
  busyId: number | null;
  onAction: (
    action: CommentAction,
    comment: AdminComment,
    extra?: { content?: string }
  ) => Promise<void>;
}) {
  const isReplyOpen = replyTarget === node.id;
  const isBusy = busyId === node.id;
  const canReply = !node.isEditorialReply;

  return (
    <div
      className={`${styles.commentNode} ${depth > 0 ? styles.commentNodeNested : ''}`}
    >
      <div
        className={`${styles.commentRow} ${
          node.status === 'pending' ? styles.pendingHighlight : ''
        }`}
      >
        <CommentAvatar
          name={node.authorName}
          isEditorial={node.isEditorialReply}
          avatar={node.isEditorialReply ? editorProfile.avatar : ''}
        />

        <div className={styles.commentBody}>
          <div className={styles.commentMeta}>
            <p className={styles.authorName}>{node.authorName}</p>
            {node.isEditorialReply ? (
              <span className={styles.editorialBadge}>InfraFund reply</span>
            ) : null}
            <StatusBadge status={node.status} />
            <span className={styles.commentDate}>{node.createdAt}</span>
          </div>

          <p className={styles.commentText}>{node.content}</p>

          <div className={styles.actions}>
            {node.status === 'pending' ? (
              <button
                type="button"
                className={styles.actionBtnPrimary}
                disabled={isBusy}
                onClick={() => onAction('approve', node)}
              >
                Approve
              </button>
            ) : null}

            {canReply ? (
              <button
                type="button"
                className={styles.actionBtn}
                disabled={isBusy}
                onClick={() => setReplyTarget(isReplyOpen ? null : node.id)}
              >
                Reply
              </button>
            ) : null}

            {node.status === 'approved' ? (
              <button
                type="button"
                className={styles.actionBtnMuted}
                disabled={isBusy}
                onClick={() => onAction('unapprove', node)}
              >
                Hide
              </button>
            ) : null}

            <button
              type="button"
              className={styles.actionBtnMuted}
              disabled={isBusy}
              onClick={() => onAction('spam', node)}
            >
              Spam
            </button>

            <button
              type="button"
              className={styles.actionBtnDanger}
              disabled={isBusy}
              onClick={() => setDeleteTarget(node)}
            >
              Delete
            </button>
          </div>

          {isReplyOpen ? (
            <ReplyComposer
              target={node}
              editorProfile={editorProfile}
              busy={isBusy}
              onCancel={() => setReplyTarget(null)}
              onSubmit={(content) => onAction('reply', node, { content })}
            />
          ) : null}
        </div>
      </div>

      {node.replies.map((reply) => (
        <CommentNodeView
          key={reply.id}
          node={reply}
          depth={depth + 1}
          editorProfile={editorProfile}
          replyTarget={replyTarget}
          setReplyTarget={setReplyTarget}
          setDeleteTarget={setDeleteTarget}
          busyId={busyId}
          onAction={onAction}
        />
      ))}
    </div>
  );
}

function CommentAvatar({
  name,
  isEditorial,
  avatar,
}: {
  name: string;
  isEditorial: boolean;
  avatar: string;
}) {
  if (isEditorial && avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={avatar} alt="" className={styles.avatarImage} />
    );
  }

  return (
    <div className={styles.avatar} aria-hidden>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function ReplyComposer({
  target,
  editorProfile,
  busy,
  onCancel,
  onSubmit,
}: {
  target: AdminComment;
  editorProfile: EditorReplyProfile;
  busy: boolean;
  onCancel: () => void;
  onSubmit: (content: string) => Promise<void>;
}) {
  const [content, setContent] = useState('');

  return (
    <div className={styles.replyComposer}>
      <div className={styles.replyContext}>
        <CommentAvatar
          name={editorProfile.name}
          isEditorial
          avatar={editorProfile.avatar}
        />
        <span>
          Replying to <strong>{target.authorName}</strong> as{' '}
          <strong>{editorProfile.name}</strong>
          {editorProfile.title ? ` · ${editorProfile.title}` : ''}
        </span>
      </div>

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
            event.preventDefault();
            if (content.trim() && !busy) {
              void onSubmit(content.trim());
              setContent('');
            }
          }
        }}
        rows={4}
        className={styles.replyTextarea}
        placeholder={`Reply to ${target.authorName}...`}
        autoFocus
      />

      <p className={styles.replyHint}>
        Press Cmd+Enter to publish. Your reply appears on the live post
        immediately.
      </p>

      <div className={styles.replyActions}>
        <button
          type="button"
          className={styles.actionBtnMuted}
          disabled={busy}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className={styles.actionBtnPrimary}
          disabled={busy || !content.trim()}
          onClick={() => {
            void onSubmit(content.trim());
            setContent('');
          }}
        >
          {busy ? 'Publishing...' : 'Post reply'}
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: CommentStatus }) {
  const className = {
    pending: styles.statusPending,
    approved: styles.statusApproved,
    unapproved: styles.statusUnapproved,
    spam: styles.statusSpam,
  }[status];

  return <span className={`${styles.statusBadge} ${className}`}>{status}</span>;
}

function DeleteModal({
  busy,
  onClose,
  onConfirm,
}: {
  comment: AdminComment;
  busy: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  return (
    <div className={styles.modalBackdrop} role="presentation">
      <div className={styles.modal} role="dialog" aria-modal="true">
        <h2 className={styles.modalTitle}>Delete comment?</h2>
        <p className={styles.modalText}>
          This removes the comment from moderation and the live blog. This
          cannot be undone.
        </p>
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.actionBtnMuted}
            disabled={busy}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.actionBtnDanger}
            disabled={busy}
            onClick={() => void onConfirm()}
          >
            {busy ? 'Deleting...' : 'Delete comment'}
          </button>
        </div>
      </div>
    </div>
  );
}
