import { canManageContent } from '@/access/roles.js';
import { getAdminApiContext } from '@/lib/admin-api-auth.js';
import { getComposeSchedulesPayload } from '@/lib/cms-compose-schedules';
import {
  computeNextRunAt,
  formatScheduleSummary,
  parseTimeUtc,
  type ComposeScheduleFrequency,
  type ComposeScheduleRecord,
} from '@/lib/compose-schedule';
import { NextResponse } from 'next/server';

type SchedulePayload = {
  name?: string;
  prompt?: string;
  frequency?: ComposeScheduleFrequency;
  dayOfWeek?: number;
  dayOfMonth?: number;
  timeUtc?: string;
  enabled?: boolean;
};

function serializeSchedule(doc: ComposeScheduleRecord) {
  const lastPostId =
    typeof doc.lastPost === 'object' && doc.lastPost
      ? doc.lastPost.id
      : doc.lastPost;

  return {
    id: doc.id,
    name: doc.name,
    prompt: doc.prompt,
    frequency: doc.frequency,
    dayOfWeek: doc.dayOfWeek ?? 1,
    dayOfMonth: doc.dayOfMonth ?? 1,
    timeUtc: doc.timeUtc,
    enabled: Boolean(doc.enabled),
    nextRunAt: doc.nextRunAt ?? null,
    lastRunAt: doc.lastRunAt ?? null,
    lastRunStatus: doc.lastRunStatus ?? 'idle',
    lastRunMessage: doc.lastRunMessage ?? '',
    lastPostId: lastPostId ?? null,
    summary: formatScheduleSummary(doc),
  };
}

function parseScheduleInput(body: SchedulePayload) {
  const name = body.name?.trim() ?? '';
  const prompt = body.prompt?.trim() ?? '';
  const frequency = body.frequency ?? 'weekly';
  const dayOfWeek = Number(body.dayOfWeek ?? 1);
  const dayOfMonth = Number(body.dayOfMonth ?? 1);
  const timeUtc = body.timeUtc?.trim() ?? '09:00';
  const enabled = body.enabled ?? true;

  if (!name) {
    return { error: 'Schedule name is required.' };
  }

  if (!prompt) {
    return { error: 'Prompt is required.' };
  }

  if (!['daily', 'weekly', 'monthly'].includes(frequency)) {
    return { error: 'Frequency must be daily, weekly, or monthly.' };
  }

  try {
    parseTimeUtc(timeUtc);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Invalid schedule time.',
    };
  }

  if (frequency === 'weekly' && (dayOfWeek < 0 || dayOfWeek > 6)) {
    return { error: 'Day of week must be between 0 (Sunday) and 6.' };
  }

  if (frequency === 'monthly' && (dayOfMonth < 1 || dayOfMonth > 28)) {
    return { error: 'Day of month must be between 1 and 28.' };
  }

  const schedule = {
    name,
    prompt,
    frequency,
    dayOfWeek,
    dayOfMonth,
    timeUtc,
    enabled,
    nextRunAt: computeNextRunAt({
      frequency,
      dayOfWeek,
      dayOfMonth,
      timeUtc,
    }).toISOString(),
  };

  return { schedule };
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
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
      { message: 'You do not have permission to manage schedules.' },
      { status: 403 }
    );
  }

  let body: SchedulePayload;
  try {
    body = (await request.json()) as SchedulePayload;
  } catch {
    return NextResponse.json(
      { message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const parsed = parseScheduleInput(body);
  if ('error' in parsed) {
    return NextResponse.json({ message: parsed.error }, { status: 400 });
  }

  const payload = await getComposeSchedulesPayload();
  const doc = await payload.update({
    collection: 'compose-schedules',
    id,
    user,
    overrideAccess: false,
    data: parsed.schedule,
  });

  return NextResponse.json({
    schedule: serializeSchedule(doc),
  });
}

export async function DELETE(request: Request, context: RouteContext) {
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
      { message: 'You do not have permission to manage schedules.' },
      { status: 403 }
    );
  }

  const payload = await getComposeSchedulesPayload();
  await payload.delete({
    collection: 'compose-schedules',
    id,
    user,
    overrideAccess: false,
  });

  return NextResponse.json({ ok: true });
}
