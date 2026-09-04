import { requireContentManager } from '@/access/get-admin-user';
import { isMasterAdmin } from '@/access/roles.js';
import PostManagementPanel from '@/app/(payload)/admin/post-management/post-management-panel';
import {
  buildAdminPostStats,
  fetchAllPostsForAdmin,
} from '@/lib/cms-admin-posts';
import type {
  AdminPostSort,
  AdminPostStatusFilter,
} from '@/lib/cms-post-types';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { getUserDisplayName } from '@/lib/user-profile.js';

type PageProps = {
  searchParams: Promise<{
    status?: string;
    category?: string;
    sort?: string;
    success?: string;
  }>;
};

function parseStatusFilter(value: string | undefined): AdminPostStatusFilter {
  if (value === 'published' || value === 'draft') return value;
  return 'all';
}

function parseSort(value: string | undefined): AdminPostSort {
  if (
    value === 'oldest' ||
    value === 'title-asc' ||
    value === 'title-desc' ||
    value === 'newest'
  ) {
    return value;
  }
  return 'newest';
}

export default async function PostManagementPage({ searchParams }: PageProps) {
  const user = await requireContentManager('/admin/post-management');
  const qs = await searchParams;
  const posts = await fetchAllPostsForAdmin();
  const stats = buildAdminPostStats(posts);
  const profile = await fetchUserProfileForEdit(user);
  const displayName = getUserDisplayName({ ...user, ...profile });
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <PostManagementPanel
      posts={posts}
      stats={stats}
      statusFilter={parseStatusFilter(qs.status)}
      categoryFilter={qs.category?.trim() || 'all'}
      sort={parseSort(qs.sort)}
      userName={displayName}
      userInitial={userInitial}
      isMasterAdmin={isMasterAdmin(user)}
      flashSuccess={qs.success}
    />
  );
}
