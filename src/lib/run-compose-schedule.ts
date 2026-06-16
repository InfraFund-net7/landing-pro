import { importMap } from '@/app/(payload)/admin/importMap.js';
import { runComposeAgent } from '@/lib/compose-agent';
import { getComposeSchedulesPayload } from '@/lib/cms-compose-schedules';
import {
  computeNextRunAt,
  isScheduleRunning,
  type ComposeScheduleRecord,
} from '@/lib/compose-schedule';
import { saveComposeDraftAsPost } from '@/lib/save-compose-draft';
import config from '@payload-config';
import { getPayload } from 'payload';

type RunScheduleResult = {
  scheduleId: number;
  status: 'success' | 'failed' | 'skipped';
  message: string;
  postId?: number;
};

export async function runComposeScheduleById(
  scheduleId: number
): Promise<RunScheduleResult> {
  const payload = await getComposeSchedulesPayload();
  const schedule = await payload.findByID({
    collection: 'compose-schedules',
    id: scheduleId,
    depth: 1,
    overrideAccess: true,
  });

  return runComposeScheduleRecord(payload, schedule);
}

export async function runDueComposeSchedules(): Promise<RunScheduleResult[]> {
  if (!process.env.AI_GATEWAY_API_KEY) {
    throw new Error(
      'AI composition is not configured. Add AI_GATEWAY_API_KEY to your environment.'
    );
  }

  const payload = await getComposeSchedulesPayload();
  const now = new Date();

  const dueSchedules = await payload.find({
    collection: 'compose-schedules',
    where: {
      and: [
        { enabled: { equals: true } },
        { nextRunAt: { less_than_equal: now.toISOString() } },
      ],
    },
    depth: 1,
    limit: 20,
    overrideAccess: true,
  });

  const results: RunScheduleResult[] = [];

  for (const doc of dueSchedules.docs) {
    if (isScheduleRunning(doc, now)) {
      results.push({
        scheduleId: doc.id,
        status: 'skipped',
        message: 'Schedule is already running.',
      });
      continue;
    }

    results.push(await runComposeScheduleRecord(payload, doc));
  }

  return results;
}

async function runComposeScheduleRecord(
  payload: Awaited<ReturnType<typeof getComposeSchedulesPayload>>,
  schedule: ComposeScheduleRecord
): Promise<RunScheduleResult> {
  const scheduleId = schedule.id;
  const now = new Date();

  const createdById =
    typeof schedule.createdBy === 'object' && schedule.createdBy
      ? schedule.createdBy.id
      : schedule.createdBy;

  if (!createdById) {
    await updateSchedule(payload, scheduleId, {
      lastRunAt: now.toISOString(),
      lastRunStatus: 'failed',
      lastRunMessage: 'Schedule is missing a creator user.',
      nextRunAt: computeNextRunAt(schedule, now).toISOString(),
    });

    return {
      scheduleId,
      status: 'failed',
      message: 'Schedule is missing a creator user.',
    };
  }

  const basePayload = await getPayload({ config, importMap });
  const user = await basePayload.findByID({
    collection: 'users',
    id: createdById,
    overrideAccess: true,
  });

  await updateSchedule(payload, scheduleId, {
    lastRunAt: now.toISOString(),
    lastRunStatus: 'running',
    lastRunMessage: 'Generating draft with the editorial agent…',
  });

  try {
    const { draft, summary } = await runComposeAgent(schedule.prompt.trim());

    if (!draft) {
      throw new Error('The agent finished without producing a draft artifact.');
    }

    const saved = await saveComposeDraftAsPost(basePayload, user, draft);
    const message =
      summary || `Saved draft "${draft.title}" from scheduled composition.`;

    await updateSchedule(payload, scheduleId, {
      lastRunAt: new Date().toISOString(),
      lastRunStatus: 'success',
      lastRunMessage: message,
      lastPost: saved.id,
      nextRunAt: computeNextRunAt(schedule, new Date()).toISOString(),
    });

    return {
      scheduleId,
      status: 'success',
      message,
      postId: saved.id,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Scheduled composition failed unexpectedly.';

    await updateSchedule(payload, scheduleId, {
      lastRunAt: new Date().toISOString(),
      lastRunStatus: 'failed',
      lastRunMessage: message,
      nextRunAt: computeNextRunAt(schedule, new Date()).toISOString(),
    });

    return {
      scheduleId,
      status: 'failed',
      message,
    };
  }
}

async function updateSchedule(
  payload: Awaited<ReturnType<typeof getComposeSchedulesPayload>>,
  scheduleId: number,
  data: Record<string, unknown>
) {
  await payload.update({
    collection: 'compose-schedules',
    id: scheduleId,
    overrideAccess: true,
    data,
  });
}
