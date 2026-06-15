import { getAdminApiContext, isContentManager } from '@/lib/admin-api-auth.js';
import {
  createBlogComment,
  fetchApprovedCommentsForPost,
} from '@/lib/cms-comments';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { getUserDisplayName, getUserAvatarUrl } from '@/lib/user-profile.js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createCommentSchema = z.object({
  postId: z.number().int().positive(),
  authorName: z.string().trim().min(1).max(120),
  authorEmail: z
    .union([z.string().trim().email().max(200), z.literal('')])
    .optional(),
  content: z.string().trim().min(1).max(5000),
});

function parsePostId(value: string | null): number | null {
  const id = Number(value);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function GET(request: Request) {
  const postId = parsePostId(new URL(request.url).searchParams.get('postId'));

  if (postId === null) {
    return NextResponse.json(
      { message: 'postId is required.' },
      { status: 400 }
    );
  }

  try {
    const comments = await fetchApprovedCommentsForPost(postId);
    const { user } = await getAdminApiContext(request);
    const isAdmin = isContentManager(user);

    if (!isAdmin || !user) {
      return NextResponse.json({ comments, editor: null });
    }

    const profile = await fetchUserProfileForEdit(user);
    const displayName = getUserDisplayName({ ...user, ...profile });

    return NextResponse.json({
      comments,
      editor: {
        name: displayName,
        title: profile.jobTitle,
        avatar:
          profile.profilePhotoUrl || getUserAvatarUrl({ ...user, ...profile }),
      },
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to load comments right now.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createCommentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Please provide a valid name and comment.' },
        { status: 400 }
      );
    }

    const { user } = await getAdminApiContext(request);
    const isAdmin = isContentManager(user);
    const authorEmail = parsed.data.authorEmail?.trim();

    const result = await createBlogComment({
      postId: parsed.data.postId,
      authorName: parsed.data.authorName,
      authorEmail: authorEmail || undefined,
      content: parsed.data.content,
      adminUser: isAdmin ? user : null,
    });

    if (result.publishedImmediately) {
      const comments = await fetchApprovedCommentsForPost(parsed.data.postId);
      return NextResponse.json({
        message: 'Your comment was published.',
        publishedImmediately: true,
        comments,
      });
    }

    return NextResponse.json({
      message:
        'Thanks for your comment. It will appear after editorial review.',
      publishedImmediately: false,
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to submit your comment right now.' },
      { status: 500 }
    );
  }
}
