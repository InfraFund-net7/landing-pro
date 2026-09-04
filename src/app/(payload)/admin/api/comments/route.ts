import { getAdminApiContext, isContentManager } from '@/lib/admin-api-auth.js';
import {
  createEditorialReply,
  deleteComment,
  fetchAllCommentsForAdmin,
  updateCommentStatus,
} from '@/lib/cms-comments';
import { getUserDisplayName } from '@/lib/user-profile.js';
import { NextResponse } from 'next/server';

type CommentAction =
  | 'approve'
  | 'unapprove'
  | 'spam'
  | 'delete'
  | 'reply'
  | 'list';

type CommentActionBody = {
  action?: CommentAction;
  commentId?: number;
  postId?: number;
  postTitle?: string;
  postSlug?: string;
  content?: string;
};

function parseCommentId(value: unknown): number | null {
  const id = Number(value);
  return Number.isFinite(id) ? id : null;
}

export async function GET(request: Request) {
  const { user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!isContentManager(user)) {
    return NextResponse.json(
      { message: 'You do not have permission to manage comments.' },
      { status: 403 }
    );
  }

  const comments = await fetchAllCommentsForAdmin();
  const pendingCount = comments.filter(
    (comment) => comment.status === 'pending'
  ).length;

  return NextResponse.json({ comments, pendingCount });
}

export async function POST(request: Request) {
  const { user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!isContentManager(user)) {
    return NextResponse.json(
      { message: 'You do not have permission to manage comments.' },
      { status: 403 }
    );
  }

  let body: CommentActionBody;
  try {
    body = (await request.json()) as CommentActionBody;
  } catch {
    return NextResponse.json(
      { message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const action = body.action;
  const commentId = parseCommentId(body.commentId);

  if (!action) {
    return NextResponse.json(
      { message: 'Action is required.' },
      { status: 400 }
    );
  }

  if (action !== 'list' && commentId === null) {
    return NextResponse.json(
      { message: 'Invalid comment id.' },
      { status: 400 }
    );
  }

  try {
    if (action === 'list') {
      const comments = await fetchAllCommentsForAdmin();
      return NextResponse.json({ ok: true, comments });
    }

    if (action === 'approve') {
      await updateCommentStatus(commentId!, 'approved');
      return NextResponse.json({ ok: true, message: 'Comment approved.' });
    }

    if (action === 'unapprove') {
      await updateCommentStatus(commentId!, 'unapproved');
      return NextResponse.json({ ok: true, message: 'Comment unapproved.' });
    }

    if (action === 'spam') {
      await updateCommentStatus(commentId!, 'spam');
      return NextResponse.json({
        ok: true,
        message: 'Comment marked as spam.',
      });
    }

    if (action === 'delete') {
      await deleteComment(commentId!);
      return NextResponse.json({ ok: true, message: 'Comment deleted.' });
    }

    if (action === 'reply') {
      const postId = parseCommentId(body.postId);
      const content = String(body.content ?? '').trim();

      if (postId === null || !content) {
        return NextResponse.json(
          { message: 'Reply content is required.' },
          { status: 400 }
        );
      }

      const reply = await createEditorialReply({
        postId,
        parentId: commentId!,
        content,
        authorName: getUserDisplayName(user),
        authorUserId: Number(user.id),
        postTitle: body.postTitle,
        postSlug: body.postSlug,
      });

      return NextResponse.json({
        ok: true,
        message: 'Reply published on the live post.',
        reply,
      });
    }

    return NextResponse.json({ message: 'Unknown action.' }, { status: 400 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to update comment right now.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
