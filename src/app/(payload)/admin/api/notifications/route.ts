import { getAdminApiContext, isContentManager } from '@/lib/admin-api-auth.js';
import { fetchAllPostsForAdmin } from '@/lib/cms-admin-posts';
import { fetchAllCommentsForAdmin } from '@/lib/cms-comments';
import { NextResponse } from 'next/server';

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
      { message: 'You do not have permission to view notifications.' },
      { status: 403 }
    );
  }

  const [comments, posts] = await Promise.all([
    fetchAllCommentsForAdmin(),
    fetchAllPostsForAdmin(),
  ]);

  const pendingComments = comments.filter(
    (comment) => comment.status === 'pending'
  ).length;
  const draftPosts = posts.filter((post) => !post.published).length;

  const items = [];

  if (pendingComments > 0) {
    items.push({
      id: 'pending-comments',
      label: `${pendingComments} comment${pendingComments === 1 ? '' : 's'} awaiting moderation`,
      href: '/admin/comment-management?filter=pending',
    });
  }

  if (draftPosts > 0) {
    items.push({
      id: 'draft-posts',
      label: `${draftPosts} draft post${draftPosts === 1 ? '' : 's'}`,
      href: '/admin/post-management?status=draft',
    });
  }

  return NextResponse.json({
    pendingComments,
    draftPosts,
    total: pendingComments + draftPosts,
    items,
  });
}
