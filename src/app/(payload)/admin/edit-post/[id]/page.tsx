import { requireContentManager } from '@/access/get-admin-user';
import PostEditorForm from '@/app/(payload)/admin/components/post-editor-form';
import {
  fetchPostForEdit,
  postToEditorInitialValues,
} from '@/lib/admin-post-for-edit.js';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

function displayNameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? 'Admin';
  return local.charAt(0).toUpperCase() + local.slice(1);
}

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

  const email = user.email ?? 'admin@infrafund.com';
  const userName = displayNameFromEmail(email);
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <PostEditorForm
      mode="edit"
      postId={String(post.id)}
      initialValues={postToEditorInitialValues(post)}
      userName={userName}
      userInitial={userInitial}
      authorOptions={[
        ...new Set(
          [userName, 'Editorial', String(post.author ?? '')].filter(Boolean)
        ),
      ]}
      error={qs.error}
      success={qs.success}
    />
  );
}
