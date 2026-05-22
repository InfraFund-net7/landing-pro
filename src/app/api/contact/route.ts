import { NextRequest } from 'next/server';
import { createContactFormEntry } from '@/lib/landing-forms/contact-form';
import {
  emptySuccess,
  requireCaptcha,
  runLandingPostRoute,
} from '@/lib/landing-api-route';

export async function POST(request: NextRequest) {
  return runLandingPostRoute(request, async () => {
    await requireCaptcha(request);
    const body = (await request.json()) as {
      first_name?: string;
      last_name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim();

    await createContactFormEntry({
      first_name: body.first_name ?? '',
      last_name: body.last_name ?? '',
      email: body.email ?? '',
      subject: body.subject ?? '',
      message: body.message ?? '',
      ip,
      user_agent: request.headers.get('user-agent') ?? undefined,
    });

    return emptySuccess();
  });
}
