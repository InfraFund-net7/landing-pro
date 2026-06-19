import { requireContentManager } from '@/access/get-admin-user';
import BlogTaxonomyPanel from '@/app/(payload)/admin/components/blog-taxonomy-panel';
import {
  collectUniqueCategories,
  fetchAllPostsForAdmin,
} from '@/lib/cms-admin-posts';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { getUserDisplayName } from '@/lib/user-profile.js';

export default async function CategoriesPage() {
  const user = await requireContentManager('/admin/categories');
  const posts = await fetchAllPostsForAdmin();
  const categories = collectUniqueCategories(posts);
  const profile = await fetchUserProfileForEdit(user);
  const displayName = getUserDisplayName({ ...user, ...profile });
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <BlogTaxonomyPanel
      title="Categories"
      description="Categories used across your blog posts."
      items={categories}
      emptyMessage="No categories yet. Add categories when creating or editing a post."
      userName={displayName}
      userInitial={userInitial}
      buildItemHref={(category) =>
        `/admin/post-management?category=${encodeURIComponent(category)}`
      }
    />
  );
}
