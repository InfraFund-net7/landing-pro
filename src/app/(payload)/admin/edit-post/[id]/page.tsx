import { requireContentManager } from '@/access/get-admin-user';
import PostEditorForm from '@/app/(payload)/admin/components/post-editor-form';
import {
  fetchPostForEdit,
  postToEditorInitialValues,
} from '@/lib/admin-post-for-edit.js';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { getUserDisplayName } from '@/lib/user-profile.js';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function EditPostPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const redirectPath = `/admin/edit-post/${id}`;
  const user = await requireContentManager(redirectPath);
  const qs = await searchParams;

  const post = await fetchPostForEdit(id, user);
  if (!post) {
    notFound();
  }

  const profile = await fetchUserProfileForEdit(user);
  const displayName = getUserDisplayName({ ...user, ...profile });
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <PostEditorForm
      mode="edit"
      postId={String(post.id)}
      initialValues={postToEditorInitialValues(post)}
      userName={displayName}
      userInitial={userInitial}
      authorLabel={displayName}
      error={qs.error}
      success={qs.success}
    />
  );
}
