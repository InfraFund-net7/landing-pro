import { requireContentManager } from '@/access/get-admin-user';
import CommentManagementPanel from '@/app/(payload)/admin/comment-management/comment-management-panel';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { fetchAllCommentsForAdmin } from '@/lib/cms-comments';
import { type CommentStatus } from '@/lib/cms-comment-types';
import { getUserDisplayName } from '@/lib/user-profile.js';

type PageProps = {
  searchParams: Promise<{
    filter?: CommentStatus | 'all';
    commentId?: string;
    post?: string;
    error?: string;
    success?: string;
  }>;
};

function parseCommentId(value: string | undefined): number | null {
  const id = Number(value);
  return Number.isFinite(id) && id > 0 ? id : null;
}

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

export default async function CommentManagementPage({
  searchParams,
}: PageProps) {
  const user = await requireContentManager('/admin/comment-management');
  const qs = await searchParams;
  const filter = parseFilter(qs.filter);
  const comments = await fetchAllCommentsForAdmin();
  const pendingCount = comments.filter(
    (comment) => comment.status === 'pending'
  ).length;
  const profile = await fetchUserProfileForEdit(user);

  const displayName = getUserDisplayName({ ...user, ...profile });
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <CommentManagementPanel
      comments={comments}
      filter={filter}
      pendingCount={pendingCount}
      userName={displayName}
      userInitial={userInitial}
      editorProfile={{
        name: displayName,
        title: profile.jobTitle,
        avatar: profile.profilePhotoUrl,
      }}
      flashSuccess={qs.success}
      flashError={qs.error}
      focusCommentId={parseCommentId(qs.commentId)}
      postSlug={qs.post?.trim() || undefined}
    />
  );
}
