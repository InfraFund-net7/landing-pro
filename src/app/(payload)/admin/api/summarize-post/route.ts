import { getAdminApiContext, isContentManager } from '@/lib/admin-api-auth.js';
import { summarizePostContent } from '@/lib/summarize-post-content';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!isContentManager(user)) {
    return NextResponse.json(
      { message: 'You do not have permission to summarize posts.' },
      { status: 403 }
    );
  }

  let body: { mainContent?: string };
  try {
    body = (await request.json()) as { mainContent?: string };
  } catch {
    return NextResponse.json(
      { message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const mainContent =
    typeof body.mainContent === 'string' ? body.mainContent : '';

  try {
    const result = await summarizePostContent(mainContent);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to generate summary. Please try again.';
    const status = message.includes('not configured') ? 503 : 400;
    return NextResponse.json({ message }, { status });
  }
}
