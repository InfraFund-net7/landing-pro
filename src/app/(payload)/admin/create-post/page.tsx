import { requireContentManager } from '@/access/get-admin-user';
import PostEditorForm from '@/app/(payload)/admin/components/post-editor-form';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { getUserDisplayName } from '@/lib/user-profile.js';

type PageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function CreatePostPage({ searchParams }: PageProps) {
  const user = await requireContentManager();
  const qs = await searchParams;
  const profile = await fetchUserProfileForEdit(user);
  const displayName = getUserDisplayName({ ...user, ...profile });
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <PostEditorForm
      mode="create"
      userName={displayName}
      userInitial={userInitial}
      authorLabel={displayName}
      authorTitle={profile.jobTitle}
      authorAvatarUrl={profile.profilePhotoUrl ?? ''}
      error={qs.error}
      success={qs.success}
    />
  );
}
