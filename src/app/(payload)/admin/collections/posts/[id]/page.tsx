import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostEditRedirect({ params }: PageProps) {
  const { id } = await params;
  redirect(`/admin/edit-post/${id}`);
}
