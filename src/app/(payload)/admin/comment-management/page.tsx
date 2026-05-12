import CommentManagementPanel from '@/app/(payload)/admin/comment-management/comment-management-panel';
import {
  createEditorialReply,
  deleteComment,
  fetchCommentsForAdmin,
  type CommentStatus,
  updateCommentStatus,
} from '@/lib/cms-comments';
import { redirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{
    filter?: CommentStatus | 'all';
    error?: string;
    success?: string;
  }>;
};

function parseFilter(value: string | undefined): CommentStatus | 'all' {
  if (
    value === 'pending' ||
    value === 'approved' ||
    value === 'unapproved' ||
    value === 'spam'
  ) {
    return value;
  }

  return 'all';
}

async function manageCommentAction(formData: FormData) {
  'use server';

  const intent = String(formData.get('intent') || '').trim();
  const commentId = Number(formData.get('commentId'));
  const filter = parseFilter(String(formData.get('filter') || 'all'));
  const redirectTo = `/admin/comment-management?filter=${filter}`;

  if (!Number.isFinite(commentId)) {
    redirect(`${redirectTo}&error=${encodeURIComponent('Invalid comment id')}`);
  }

  try {
    if (intent === 'approve') {
      await updateCommentStatus(commentId, 'approved');
      redirect(
        `${redirectTo}&success=${encodeURIComponent('Comment approved')}`
      );
    }

    if (intent === 'unapprove') {
      await updateCommentStatus(commentId, 'unapproved');
      redirect(
        `${redirectTo}&success=${encodeURIComponent('Comment unapproved')}`
      );
    }

    if (intent === 'spam') {
      await updateCommentStatus(commentId, 'spam');
      redirect(
        `${redirectTo}&success=${encodeURIComponent('Comment marked as spam')}`
      );
    }

    if (intent === 'delete') {
      await deleteComment(commentId);
      redirect(
        `${redirectTo}&success=${encodeURIComponent('Comment deleted')}`
      );
    }

    if (intent === 'reply') {
      const postId = Number(formData.get('postId'));
      const reply = String(formData.get('reply') || '').trim();

      if (!Number.isFinite(postId) || !reply) {
        redirect(
          `${redirectTo}&error=${encodeURIComponent('Reply content is required')}`
        );
      }

      await createEditorialReply({
        postId,
        parentId: commentId,
        content: reply,
      });

      redirect(
        `${redirectTo}&success=${encodeURIComponent('Reply published')}`
      );
    }

    redirect(`${redirectTo}&error=${encodeURIComponent('Unknown action')}`);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to update comment right now.';
    redirect(`${redirectTo}&error=${encodeURIComponent(message)}`);
  }
}

export default async function CommentManagementPage({
  searchParams,
}: PageProps) {
  const qs = await searchParams;
  const filter = parseFilter(qs.filter);
  const comments = await fetchCommentsForAdmin(filter);

  return (
    <CommentManagementPanel
      comments={comments}
      filter={filter}
      success={qs.success}
      error={qs.error}
      manageAction={manageCommentAction}
    />
  );
}
