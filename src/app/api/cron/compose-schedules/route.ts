import { runDueComposeSchedules } from '@/lib/run-compose-schedule';
import { NextResponse } from 'next/server';

function isAuthorizedCronRequest(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!cronSecret) {
    return process.env.NODE_ENV !== 'production';
  }

  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const results = await runDueComposeSchedules();
    return NextResponse.json({
      ok: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Scheduled composition failed unexpectedly.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
