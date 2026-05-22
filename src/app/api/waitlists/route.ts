import { NextRequest } from 'next/server';
import { createWaitlistEntry } from '@/lib/landing-forms/waitlist';
import {
  emptySuccess,
  requireCaptcha,
  runLandingPostRoute,
} from '@/lib/landing-api-route';

export async function POST(request: NextRequest) {
  return runLandingPostRoute(request, async () => {
    await requireCaptcha(request);
    const body = (await request.json()) as { email?: string };
    await createWaitlistEntry(body.email ?? '');
    return emptySuccess();
  });
}
