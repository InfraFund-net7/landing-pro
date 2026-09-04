import { redirect } from 'next/navigation';

export default function PostsCreateRedirectPage() {
  redirect('/admin/create-post');
}
