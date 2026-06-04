import { getAdminApiContext, isContentManager } from '@/lib/admin-api-auth.js';
import { buildPayloadMediaFileUrl } from '@/lib/payload-media-file-url.js';
import { cmsMediaFromRelation, resolveCmsMediaUrl } from '@/lib/cms-media-url';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { payload, user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!isContentManager(user)) {
    return NextResponse.json(
      { message: 'You do not have permission to upload media.' },
      { status: 403 }
    );
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { message: 'Image file is required.' },
      { status: 400 }
    );
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json(
      { message: 'Only image files are supported.' },
      { status: 400 }
    );
  }

  const alt = String(formData.get('alt') || file.name || 'Blog image').trim();

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
      user,
      overrideAccess: false,
    });

    const rawUrl =
      cmsMediaFromRelation(doc) ||
      (doc.filename
        ? buildPayloadMediaFileUrl({
            filename: doc.filename,
            prefix: doc.prefix ?? undefined,
          })
        : '');
    const url = resolveCmsMediaUrl(rawUrl) ?? rawUrl;

    if (!url) {
      return NextResponse.json(
        { message: 'Upload succeeded but no URL was returned.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, url, alt: doc.alt ?? alt });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to upload image.';
    return NextResponse.json({ message }, { status: 400 });
  }
}
