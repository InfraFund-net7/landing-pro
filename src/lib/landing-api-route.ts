import { NextRequest, NextResponse } from 'next/server';
import {
  handleLandingRouteError,
  LandingApiError,
} from '@/lib/landing-api-errors';
import { verifyRecaptchaToken } from '@/lib/landing-recaptcha';

function readCaptchaToken(request: NextRequest): string | null {
  return (
    request.headers.get('x-captcha-token') ??
    request.headers.get('X-Captcha-Token')
  );
}

export async function requireCaptcha(request: NextRequest): Promise<void> {
  const token = readCaptchaToken(request);
  if (!token?.trim()) {
    throw new LandingApiError(
      400,
      'Captcha is required. Please try again.',
      'Bad Request'
    );
  }

  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const remoteIp = forwarded?.split(',')[0]?.trim() ?? null;
    await verifyRecaptchaToken(token, remoteIp);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'captcha verification failed';
    if (message === 'failed to verify captcha') {
      throw new LandingApiError(500, message, 'Internal');
    }
    throw new LandingApiError(
      401,
      'captcha verification failed',
      'Unauthorized'
    );
  }
}

export function emptySuccess(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

export async function runLandingPostRoute(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error) {
    return handleLandingRouteError(error);
  }
}
