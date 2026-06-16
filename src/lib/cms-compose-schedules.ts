import { importMap } from '@/app/(payload)/admin/importMap.js';
import type { ComposeScheduleRecord } from '@/lib/compose-schedule';
import config from '@payload-config';
import { getPayload, type TypedUser } from 'payload';

type ComposeScheduleWriteData = {
  name?: string;
  prompt?: string;
  frequency?: ComposeScheduleRecord['frequency'];
  dayOfWeek?: number;
  dayOfMonth?: number;
  timeUtc?: string;
  enabled?: boolean;
  createdBy?: number;
  nextRunAt?: string;
  lastRunAt?: string;
  lastRunStatus?: ComposeScheduleRecord['lastRunStatus'];
  lastRunMessage?: string;
  lastPost?: number;
};

type PayloadWithComposeSchedules = {
  find: (args: {
    collection: 'compose-schedules';
    where?: unknown;
    sort?: string;
    limit?: number;
    depth?: number;
    overrideAccess?: boolean;
    user?: TypedUser;
  }) => Promise<{ docs: ComposeScheduleRecord[]; totalDocs: number }>;
  findByID: (args: {
    collection: 'compose-schedules';
    id: number;
    depth?: number;
    overrideAccess?: boolean;
  }) => Promise<ComposeScheduleRecord>;
  create: (args: {
    collection: 'compose-schedules';
    data: ComposeScheduleWriteData;
    user?: TypedUser;
    overrideAccess?: boolean;
  }) => Promise<ComposeScheduleRecord>;
  update: (args: {
    collection: 'compose-schedules';
    id: number;
    data: ComposeScheduleWriteData;
    user?: TypedUser;
    overrideAccess?: boolean;
  }) => Promise<ComposeScheduleRecord>;
  delete: (args: {
    collection: 'compose-schedules';
    id: number;
    user?: TypedUser;
    overrideAccess?: boolean;
  }) => Promise<unknown>;
};

export async function getComposeSchedulesPayload() {
  const payload = await getPayload({ config, importMap });
  return payload as unknown as PayloadWithComposeSchedules;
}
