/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next';

import config from '@payload-config';
import { generatePageMetadata } from '@payloadcms/next/views';
import { redirect } from 'next/navigation';
import { formatAdminURL } from 'payload/shared';
import { probeNeonHasPayloadUser } from '@/lib/neon-user-probe.js';
import { getDefaultAdminLandingPath } from '@/lib/admin-default-route.js';
import { payloadAdminRootPage } from '@/lib/payload-admin-root.js';
import { importMap } from '../importMap';
import { initReq } from 'payload-init-req';

type Args = {
  params: Promise<{
    segments?: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = async ({ params, searchParams }: Args) => {
  const resolvedParams = await params;
  const segments = Array.isArray(resolvedParams?.segments)
    ? resolvedParams.segments
    : [];

  if (segments[0] === 'collections' && segments[1] === 'comments') {
    const commentId = segments[2];
    if (commentId && /^\d+$/.test(commentId)) {
      redirect(`/admin/comment-management?commentId=${commentId}`);
    }
    redirect('/admin/comment-management');
  }

  if (segments[0] === 'collections' && segments[1] === 'users') {
    if (segments[2] === 'create') {
      redirect('/admin/create-user');
    }
    redirect('/admin/create-user');
  }

  if (segments[0] === 'collections' && segments[1] === 'posts') {
    const postId = segments[2];
    if (postId && /^\d+$/.test(postId)) {
      redirect(`/admin/edit-post/${postId}`);
    }
    redirect('/admin/post-management');
  }

  if (segments.length === 0) {
    if (process.env.VERCEL) {
      const hasUser = await probeNeonHasPayloadUser();
      if (hasUser === false) {
        const cfg = await config;
        console.log(
          '[payload] /admin: hasUser=false → redirect create-first-user'
        );
        redirect(
          formatAdminURL({
            adminRoute: cfg.routes.admin,
            path: cfg.admin.routes.createFirstUser,
          })
        );
      }
    }

    const { req } = await initReq({
      configPromise: config,
      importMap,
      key: 'adminRootRedirect',
    });

    redirect(getDefaultAdminLandingPath(req.user));
  }

  return payloadAdminRootPage({
    config,
    params: Promise.resolve({ segments }),
    searchParams,
    importMap,
  });
};

export default Page;
