'use client';

import AdminSignOutLink from '@/app/(payload)/admin/components/admin-sign-out-link';
import type { AdminComment, CommentStatus } from '@/lib/cms-comments';
import Link from 'next/link';
import { useState } from 'react';

type CommentManagementPanelProps = {
  comments: AdminComment[];
  filter: CommentStatus | 'all';
  success?: string;
  error?: string;
  manageAction: (formData: FormData) => void | Promise<void>;
};

const filters: Array<{ value: CommentStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'unapproved', label: 'Unapproved' },
  { value: 'spam', label: 'Spam' },
];

export default function CommentManagementPanel({
  comments,
  filter,
  success,
  error,
  manageAction,
}: CommentManagementPanelProps) {
  const [deleteTarget, setDeleteTarget] = useState<AdminComment | null>(null);
  const [replyTarget, setReplyTarget] = useState<number | null>(null);

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(70% 80% at 50% 0%, #102247 0%, #080F1D 55%, #070B13 100%)',
        color: '#E6EEFF',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          background: 'rgba(10, 18, 34, 0.95)',
          border: '1px solid #1E2B47',
          borderRadius: '14px',
          boxShadow: '0 10px 35px rgba(0,0,0,0.4)',
          padding: '20px 20px 26px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <h1 style={{ fontSize: 28, margin: 0, fontWeight: 700 }}>
            Comment Management
          </h1>
          <Link
            href="/admin/collections/posts"
            style={{
              color: '#A7B7D9',
              textDecoration: 'none',
              fontSize: 13,
              border: '1px solid #2A3B61',
              borderRadius: 8,
              padding: '8px 10px',
            }}
          >
            View Posts
          </Link>
          <AdminSignOutLink />
        </div>

        {error ? <Alert tone="error" message={error} /> : null}
        {success ? <Alert tone="success" message={success} /> : null}

        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 18,
          }}
        >
          {filters.map((item) => (
            <Link
              key={item.value}
              href={`/admin/comment-management?filter=${item.value}`}
              style={{
                textDecoration: 'none',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 13,
                border:
                  filter === item.value
                    ? '1px solid #3B82F6'
                    : '1px solid #2A3B61',
                background:
                  filter === item.value
                    ? 'rgba(59,130,246,0.15)'
                    : 'transparent',
                color: filter === item.value ? '#BFDBFE' : '#A7B7D9',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 220px 120px',
            gap: 12,
            padding: '0 12px 10px',
            color: '#7D8FB3',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          <span>Author</span>
          <span>Comment</span>
          <span>In Response To</span>
          <span>Date</span>
        </div>

        {comments.length === 0 ? (
          <p style={{ margin: '12px', color: '#A7B7D9', fontSize: 14 }}>
            No comments found for this filter.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {comments.map((comment) => (
              <CommentRow
                key={comment.id}
                comment={comment}
                replyTarget={replyTarget}
                setReplyTarget={setReplyTarget}
                setDeleteTarget={setDeleteTarget}
                manageAction={manageAction}
                filter={filter}
              />
            ))}
          </div>
        )}
      </div>

      {deleteTarget ? (
        <DeleteModal
          comment={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          manageAction={manageAction}
          filter={filter}
        />
      ) : null}
    </main>
  );
}

function CommentRow({
  comment,
  replyTarget,
  setReplyTarget,
  setDeleteTarget,
  manageAction,
  filter,
}: {
  comment: AdminComment;
  replyTarget: number | null;
  setReplyTarget: (value: number | null) => void;
  setDeleteTarget: (value: AdminComment | null) => void;
  manageAction: (formData: FormData) => void | Promise<void>;
  filter: CommentStatus | 'all';
}) {
  return (
    <div
      style={{
        border: '1px solid #1E2B47',
        borderRadius: 12,
        background: '#0B1220',
        padding: '14px 12px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr 220px 120px',
          gap: 12,
          alignItems: 'start',
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
            {comment.authorName}
          </p>
          <StatusBadge status={comment.status} />
        </div>

        <div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            {comment.content}
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 10,
              fontSize: 13,
              flexWrap: 'wrap',
            }}
          >
            <ActionForm
              label="Approve"
              color="#7DFFB0"
              action="approve"
              commentId={comment.id}
              manageAction={manageAction}
              filter={filter}
            />
            <button
              type="button"
              onClick={() =>
                setReplyTarget(replyTarget === comment.id ? null : comment.id)
              }
              style={actionButtonStyle('#93C5FD')}
            >
              Reply
            </button>
            <button
              type="button"
              onClick={() => setDeleteTarget(comment)}
              style={actionButtonStyle('#FCA5A5')}
            >
              Delete
            </button>
            <ActionForm
              label="Spam"
              color="#FCD34D"
              action="spam"
              commentId={comment.id}
              manageAction={manageAction}
              filter={filter}
            />
            <ActionForm
              label="Unapprove"
              color="#FDBA74"
              action="unapprove"
              commentId={comment.id}
              manageAction={manageAction}
              filter={filter}
            />
          </div>

          {replyTarget === comment.id ? (
            <form
              action={manageAction}
              style={{ marginTop: 14, display: 'grid', gap: 10 }}
            >
              <input type="hidden" name="intent" value="reply" />
              <input type="hidden" name="commentId" value={comment.id} />
              <input type="hidden" name="postId" value={comment.postId} />
              <input type="hidden" name="filter" value={filter} />
              <textarea
                name="reply"
                rows={4}
                required
                placeholder="Write your reply..."
                style={{
                  width: '100%',
                  background: '#0D1425',
                  color: '#E6EEFF',
                  border: '1px solid #1E2B47',
                  borderRadius: 8,
                  padding: '12px 14px',
                  fontSize: 14,
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
              <button
                type="submit"
                style={{
                  justifySelf: 'start',
                  border: '1px solid #1E8F57',
                  borderRadius: 8,
                  background: '#23DB7B',
                  color: '#032514',
                  fontWeight: 700,
                  padding: '10px 14px',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Submit Reply
              </button>
            </form>
          ) : null}
        </div>

        <div>
          {comment.postSlug ? (
            <Link
              href={`/blog/${comment.postSlug}`}
              style={{
                color: '#93C5FD',
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              {comment.postTitle}
            </Link>
          ) : (
            <span style={{ color: '#A7B7D9', fontSize: 13 }}>
              {comment.postTitle}
            </span>
          )}
        </div>

        <span style={{ color: '#A7B7D9', fontSize: 13 }}>
          {comment.createdAt}
        </span>
      </div>
    </div>
  );
}

function ActionForm({
  label,
  color,
  action,
  commentId,
  manageAction,
  filter,
}: {
  label: string;
  color: string;
  action: 'approve' | 'spam' | 'unapprove';
  commentId: number;
  manageAction: (formData: FormData) => void | Promise<void>;
  filter: CommentStatus | 'all';
}) {
  return (
    <form action={manageAction}>
      <input type="hidden" name="intent" value={action} />
      <input type="hidden" name="commentId" value={commentId} />
      <input type="hidden" name="filter" value={filter} />
      <button type="submit" style={actionButtonStyle(color)}>
        {label}
      </button>
    </form>
  );
}

function actionButtonStyle(color: string) {
  return {
    border: 'none',
    background: 'transparent',
    color,
    padding: 0,
    fontSize: 13,
    cursor: 'pointer',
  } as const;
}

function StatusBadge({ status }: { status: CommentStatus }) {
  const colors: Record<CommentStatus, string> = {
    pending: '#FCD34D',
    approved: '#7DFFB0',
    unapproved: '#FDBA74',
    spam: '#FCA5A5',
  };

  return (
    <span
      style={{
        color: colors[status],
        fontSize: 12,
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  );
}

function Alert({
  tone,
  message,
}: {
  tone: 'error' | 'success';
  message: string;
}) {
  const styles =
    tone === 'error'
      ? {
          background: '#3D1320',
          color: '#FECACA',
          border: '1px solid #7F1D1D',
        }
      : {
          background: '#0F2C22',
          color: '#C8FACC',
          border: '1px solid #166534',
        };

  return (
    <p
      style={{
        margin: '0 0 14px',
        borderRadius: 8,
        padding: '10px 12px',
        fontSize: 13,
        ...styles,
      }}
    >
      {message}
    </p>
  );
}

function DeleteModal({
  comment,
  onClose,
  manageAction,
  filter,
}: {
  comment: AdminComment;
  onClose: () => void;
  manageAction: (formData: FormData) => void | Promise<void>;
  filter: CommentStatus | 'all';
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 8, 18, 0.72)',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#0B1220',
          border: '1px solid #1E2B47',
          borderRadius: 14,
          padding: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20 }}>Confirm Deletion</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#A7B7D9',
              fontSize: 18,
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>
        <p style={{ margin: '0 0 18px', color: '#A7B7D9', fontSize: 14 }}>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <form action={manageAction}>
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="commentId" value={comment.id} />
          <input type="hidden" name="filter" value={filter} />
          <DeleteActions onClose={onClose} />
        </form>
      </div>
    </div>
  );
}

function DeleteActions({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
      <button
        type="button"
        onClick={onClose}
        style={{
          border: '1px solid #2A3B61',
          borderRadius: 8,
          background: 'transparent',
          color: '#A7B7D9',
          padding: '10px 14px',
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>
      <button
        type="submit"
        style={{
          border: '1px solid #7F1D1D',
          borderRadius: 8,
          background: '#B91C1C',
          color: '#FEE2E2',
          padding: '10px 14px',
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        Yes, Delete
      </button>
    </div>
  );
}
