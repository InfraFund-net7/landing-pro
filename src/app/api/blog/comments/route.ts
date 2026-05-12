import { createBlogComment } from '@/lib/cms-comments';
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

    const authorEmail = parsed.data.authorEmail?.trim();

    await createBlogComment({
      postId: parsed.data.postId,
      authorName: parsed.data.authorName,
      authorEmail: authorEmail || undefined,
      content: parsed.data.content,
    });

    return NextResponse.json({
      message:
        'Thanks for your comment. It will appear after editorial review.',
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to submit your comment right now.' },
      { status: 500 }
    );
  }
}
