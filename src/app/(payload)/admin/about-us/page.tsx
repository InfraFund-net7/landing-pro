import { requireMasterAdmin } from '@/access/get-admin-user';
import AboutUsManagementPanel from '@/app/(payload)/admin/components/about-us-management-panel';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { getUserDisplayName } from '@/lib/user-profile.js';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | InfraFund Admin',
  description: 'Manage About Us page contributors.',
};

export default async function AboutUsAdminPage() {
  const user = await requireMasterAdmin('/admin/about-us');
  const profile = await fetchUserProfileForEdit(user);
  const displayName = getUserDisplayName({ ...user, ...profile });
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <AboutUsManagementPanel userName={displayName} userInitial={userInitial} />
  );
}
