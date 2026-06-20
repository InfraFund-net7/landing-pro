import { requireMasterAdmin } from '@/access/get-admin-user';
import AdminPortalLayout from '@/app/(payload)/admin/components/admin-portal-layout';
import CreateUserPanel from '@/app/(payload)/admin/components/create-user-panel';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { getUserDisplayName } from '@/lib/user-profile.js';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create user | InfraFund Admin',
  description: 'Invite a new blog contributor by email.',
};

export default async function CreateUserPage() {
  const user = await requireMasterAdmin('/admin/create-user');
  const profile = await fetchUserProfileForEdit(user);
  const displayName = getUserDisplayName({ ...user, ...profile });
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <AdminPortalLayout userName={displayName} userInitial={userInitial}>
      <CreateUserPanel />
    </AdminPortalLayout>
  );
}
