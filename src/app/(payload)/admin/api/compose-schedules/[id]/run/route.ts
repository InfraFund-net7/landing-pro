import { canManageContent } from '@/access/roles.js';
import { getAdminApiContext } from '@/lib/admin-api-auth.js';
import { runComposeScheduleById } from '@/lib/run-compose-schedule';
import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return NextResponse.json(
      {
        message:
          'AI composition is not configured. Add AI_GATEWAY_API_KEY to your environment.',
      },
      { status: 503 }
    );
  }

  const { user } = await getAdminApiContext(request);
  const { id: rawId } = await context.params;
  const id = Number(rawId);

  if (!Number.isFinite(id)) {
    return NextResponse.json(
      { message: 'Invalid schedule id.' },
      { status: 400 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!canManageContent(user)) {
    return NextResponse.json(
      { message: 'You do not have permission to run schedules.' },
      { status: 403 }
    );
  }

  try {
    const result = await runComposeScheduleById(id);
    return NextResponse.json({ result });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to run schedule. Please try again.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
