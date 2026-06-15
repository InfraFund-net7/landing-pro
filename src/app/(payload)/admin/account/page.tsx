import { requireContentManager } from '@/access/get-admin-user';
import AccountSettingsForm from '@/app/(payload)/admin/components/account-settings-form';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { getUserDisplayName } from '@/lib/user-profile.js';

type PageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function AccountSettingsPage({ searchParams }: PageProps) {
  const user = await requireContentManager('/admin/account');
  const qs = await searchParams;
  const profile = await fetchUserProfileForEdit(user);
  const displayName = getUserDisplayName(user);
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <AccountSettingsForm
      userName={displayName}
      userInitial={userInitial}
      initialValues={profile}
      error={qs.error}
      success={qs.success}
    />
  );
}
