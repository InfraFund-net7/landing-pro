import { requireContentManager } from '@/access/get-admin-user';
import PostPreviewFrame from './post-preview-frame';

export default async function PostPreviewPage() {
  await requireContentManager('/post-preview');
  return <PostPreviewFrame />;
}
