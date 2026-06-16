export type ComposeScheduleFrequency = 'daily' | 'weekly' | 'monthly';

export type ComposeScheduleRecord = {
  id: number;
  name: string;
  prompt: string;
  frequency: ComposeScheduleFrequency;
  dayOfWeek: number;
  dayOfMonth: number;
  timeUtc: string;
  enabled: boolean;
  nextRunAt?: string | null;
  lastRunAt?: string | null;
  lastRunStatus?: 'idle' | 'running' | 'success' | 'failed' | null;
  lastRunMessage?: string | null;
  lastPost?: number | { id: number } | null;
  createdBy?: number | { id: number } | null;
};

const WEEKDAY_LABELS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function parseTimeUtc(value: string): {
  hours: number;
  minutes: number;
} {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) {
    throw new Error('Time must use HH:MM format in UTC.');
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) {
    throw new Error('Time must use HH:MM format in UTC.');
  }

  return { hours, minutes };
}

export function computeNextRunAt(
  schedule: Pick<
    ComposeScheduleRecord,
    'frequency' | 'dayOfWeek' | 'dayOfMonth' | 'timeUtc'
  >,
  fromDate = new Date()
): Date {
  const { hours, minutes } = parseTimeUtc(schedule.timeUtc);
  const candidate = new Date(fromDate);
  candidate.setUTCSeconds(0, 0);
  candidate.setUTCHours(hours, minutes, 0, 0);

  if (schedule.frequency === 'daily') {
    if (candidate <= fromDate) {
      candidate.setUTCDate(candidate.getUTCDate() + 1);
    }
    return candidate;
  }

  if (schedule.frequency === 'weekly') {
    const targetDay = schedule.dayOfWeek;
    let delta = (targetDay - candidate.getUTCDay() + 7) % 7;
    if (delta === 0 && candidate <= fromDate) {
      delta = 7;
    }
    candidate.setUTCDate(candidate.getUTCDate() + delta);
    return candidate;
  }

  const targetDay = Math.min(Math.max(schedule.dayOfMonth, 1), 28);
  candidate.setUTCDate(targetDay);

  if (candidate <= fromDate) {
    candidate.setUTCMonth(candidate.getUTCMonth() + 1);
    candidate.setUTCDate(targetDay);
  }

  return candidate;
}

export function formatScheduleSummary(
  schedule: Pick<
    ComposeScheduleRecord,
    'frequency' | 'dayOfWeek' | 'dayOfMonth' | 'timeUtc'
  >
): string {
  const timeLabel = `${schedule.timeUtc} UTC`;

  if (schedule.frequency === 'daily') {
    return `Daily at ${timeLabel}`;
  }

  if (schedule.frequency === 'weekly') {
    const day = WEEKDAY_LABELS[schedule.dayOfWeek] ?? 'Monday';
    return `Every ${day} at ${timeLabel}`;
  }

  return `Monthly on day ${schedule.dayOfMonth} at ${timeLabel}`;
}

export function isScheduleRunning(
  schedule: Pick<ComposeScheduleRecord, 'lastRunStatus' | 'lastRunAt'>,
  now = new Date(),
  staleAfterMs = 10 * 60 * 1000
): boolean {
  if (schedule.lastRunStatus !== 'running' || !schedule.lastRunAt) {
    return false;
  }

  return now.getTime() - new Date(schedule.lastRunAt).getTime() < staleAfterMs;
}
