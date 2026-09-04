import { getAdminApiContext, isMasterAdminUser } from '@/lib/admin-api-auth.js';
import {
  fetchAboutUsContributorsForAdmin,
  saveAboutUsContributorsForAdmin,
} from '@/lib/admin-about-us-page.js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { payload, user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!isMasterAdminUser(user)) {
    return NextResponse.json(
      { message: 'Only master admins can manage About Us content.' },
      { status: 403 }
    );
  }

  try {
    const content = await fetchAboutUsContributorsForAdmin(payload);
    return NextResponse.json(content);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to load About Us content.';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { payload, user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!isMasterAdminUser(user)) {
    return NextResponse.json(
      { message: 'Only master admins can manage About Us content.' },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const data = body as {
    title?: string;
    subtitle?: string;
    contributors?: Array<{
      name?: string;
      role?: string;
      description?: string;
      linkedin?: string;
      imagePath?: string;
      imageUrl?: string;
    }>;
  };

  try {
    const result = await saveAboutUsContributorsForAdmin(payload, user, {
      title: String(data.title || ''),
      subtitle: String(data.subtitle || ''),
      contributors: Array.isArray(data.contributors)
        ? data.contributors.map((contributor) => ({
            name: String(contributor.name || ''),
            role: String(contributor.role || ''),
            description: String(contributor.description || ''),
            linkedin: String(contributor.linkedin || ''),
            imagePath: String(
              contributor.imagePath || contributor.imageUrl || ''
            ),
          }))
        : [],
    });

    if (!result.ok) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true, message: 'About Us content saved.' });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to save About Us content.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
