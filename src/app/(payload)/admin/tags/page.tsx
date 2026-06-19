import { requireContentManager } from '@/access/get-admin-user';
import BlogTaxonomyPanel from '@/app/(payload)/admin/components/blog-taxonomy-panel';
import {
  collectUniqueTags,
  fetchAllPostsForAdmin,
} from '@/lib/cms-admin-posts';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { getUserDisplayName } from '@/lib/user-profile.js';

export default async function TagsPage() {
  const user = await requireContentManager('/admin/tags');
  const posts = await fetchAllPostsForAdmin();
  const tags = collectUniqueTags(posts);
  const profile = await fetchUserProfileForEdit(user);
  const displayName = getUserDisplayName({ ...user, ...profile });
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <BlogTaxonomyPanel
      title="Tags"
      description="Tags used across your blog posts."
      items={tags.map((tag) => `#${tag}`)}
      emptyMessage="No tags yet. Add tags when creating or editing a post."
      userName={displayName}
      userInitial={userInitial}
    />
  );
}
