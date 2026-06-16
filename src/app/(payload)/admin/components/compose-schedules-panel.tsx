'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ComposeScheduleFrequency } from '@/lib/compose-schedule';
import {
  CalendarClock,
  Loader2,
  Pause,
  Pencil,
  Play,
  Plus,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import styles from '../create-post/ai-composition.module.css';

type ScheduleItem = {
  id: number;
  name: string;
  prompt: string;
  frequency: ComposeScheduleFrequency;
  dayOfWeek: number;
  dayOfMonth: number;
  timeUtc: string;
  enabled: boolean;
  nextRunAt: string | null;
  lastRunAt: string | null;
  lastRunStatus: 'idle' | 'running' | 'success' | 'failed';
  lastRunMessage: string;
  lastPostId: number | null;
  summary: string;
};

type ScheduleFormState = {
  name: string;
  prompt: string;
  frequency: ComposeScheduleFrequency;
  dayOfWeek: number;
  dayOfMonth: number;
  timeUtc: string;
  enabled: boolean;
};

const emptyForm: ScheduleFormState = {
  name: '',
  prompt: '',
  frequency: 'weekly',
  dayOfWeek: 1,
  dayOfMonth: 1,
  timeUtc: '09:00',
  enabled: true,
};

const weekdayOptions = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

function formatDateTime(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function statusLabel(status: ScheduleItem['lastRunStatus']): string {
  switch (status) {
    case 'running':
      return 'Running';
    case 'success':
      return 'Success';
    case 'failed':
      return 'Failed';
    default:
      return 'Idle';
  }
}

export default function ComposeSchedulesPanel() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [form, setForm] = useState<ScheduleFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [runningId, setRunningId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadSchedules = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/admin/api/compose-schedules', {
        credentials: 'include',
      });
      const data = (await response.json()) as {
        message?: string;
        schedules?: ScheduleItem[];
      };

      if (!response.ok) {
        setError(data.message || 'Unable to load schedules.');
        return;
      }

      setSchedules(data.schedules ?? []);
    } catch {
      setError('Unable to load schedules.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSchedules();
  }, [loadSchedules]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        editingId
          ? `/admin/api/compose-schedules/${editingId}`
          : '/admin/api/compose-schedules',
        {
          method: editingId ? 'PATCH' : 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(data.message || 'Unable to save schedule.');
        return;
      }

      setSuccess(
        editingId
          ? 'Schedule updated.'
          : 'Schedule created. Drafts will save automatically when it runs.'
      );
      resetForm();
      await loadSchedules();
    } catch {
      setError('Unable to save schedule.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (schedule: ScheduleItem) => {
    setEditingId(schedule.id);
    setForm({
      name: schedule.name,
      prompt: schedule.prompt,
      frequency: schedule.frequency,
      dayOfWeek: schedule.dayOfWeek,
      dayOfMonth: schedule.dayOfMonth,
      timeUtc: schedule.timeUtc,
      enabled: schedule.enabled,
    });
    setSuccess('');
    setError('');
  };

  const handleDelete = async (scheduleId: number) => {
    if (!window.confirm('Delete this schedule?')) return;

    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `/admin/api/compose-schedules/${scheduleId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(data.message || 'Unable to delete schedule.');
        return;
      }

      if (editingId === scheduleId) {
        resetForm();
      }

      setSuccess('Schedule deleted.');
      await loadSchedules();
    } catch {
      setError('Unable to delete schedule.');
    }
  };

  const handleRunNow = async (scheduleId: number) => {
    setRunningId(scheduleId);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `/admin/api/compose-schedules/${scheduleId}/run`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      const data = (await response.json()) as {
        message?: string;
        result?: { status: string; message: string; postId?: number };
      };

      if (!response.ok) {
        setError(data.message || 'Unable to run schedule.');
        return;
      }

      if (data.result?.status === 'success') {
        setSuccess(
          data.result.postId
            ? `Draft created. Open it in the editor when ready.`
            : 'Schedule ran successfully.'
        );
      } else {
        setError(data.result?.message || 'Schedule run failed.');
      }

      await loadSchedules();
    } catch {
      setError('Unable to run schedule.');
    } finally {
      setRunningId(null);
    }
  };

  const handleToggleEnabled = async (schedule: ScheduleItem) => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `/admin/api/compose-schedules/${schedule.id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...schedule,
            enabled: !schedule.enabled,
          }),
        }
      );
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(data.message || 'Unable to update schedule.');
        return;
      }

      await loadSchedules();
    } catch {
      setError('Unable to update schedule.');
    }
  };

  return (
    <div className={styles.schedulesPanel}>
      <div className={styles.schedulesIntro}>
        <div>
          <h2 className={styles.schedulesTitle}>Automated content schedules</h2>
          <p className={styles.schedulesDescription}>
            Set a topic and cadence. The editorial agent will run on schedule,
            generate a post, and save it as a draft for review.
          </p>
        </div>
        <div className={styles.schedulesNote}>
          <CalendarClock size={16} />
          Times are stored in UTC. On Vercel, set <code>CRON_SECRET</code> so
          hourly jobs can run securely.
        </div>
      </div>

      {(error || success) && (
        <div className={styles.flashRow}>
          {error ? <p className={styles.flashError}>{error}</p> : null}
          {success ? <p className={styles.flashSuccess}>{success}</p> : null}
        </div>
      )}

      <div className={styles.schedulesGrid}>
        <section className={styles.scheduleFormCard}>
          <div className={styles.scheduleFormHeader}>
            <h3>{editingId ? 'Edit schedule' : 'New schedule'}</h3>
            {editingId ? (
              <button
                type="button"
                className={styles.scheduleTextButton}
                onClick={resetForm}
              >
                Cancel edit
              </button>
            ) : null}
          </div>

          <form className={styles.scheduleForm} onSubmit={handleSubmit}>
            <label className={styles.scheduleField}>
              <span>Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Weekly climate finance roundup"
                required
              />
            </label>

            <label className={styles.scheduleField}>
              <span>Agent prompt</span>
              <Textarea
                value={form.prompt}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    prompt: event.target.value,
                  }))
                }
                placeholder="Draft a post about tokenized solar projects for first-time investors. Focus on transparency and measurable impact."
                rows={5}
                className={styles.scheduleTextarea}
                required
              />
            </label>

            <div className={styles.scheduleFieldRow}>
              <label className={styles.scheduleField}>
                <span>Frequency</span>
                <select
                  value={form.frequency}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      frequency: event.target.value as ComposeScheduleFrequency,
                    }))
                  }
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>

              {form.frequency === 'weekly' ? (
                <label className={styles.scheduleField}>
                  <span>Day</span>
                  <select
                    value={form.dayOfWeek}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        dayOfWeek: Number(event.target.value),
                      }))
                    }
                  >
                    {weekdayOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}

              {form.frequency === 'monthly' ? (
                <label className={styles.scheduleField}>
                  <span>Day of month</span>
                  <input
                    type="number"
                    min={1}
                    max={28}
                    value={form.dayOfMonth}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        dayOfMonth: Number(event.target.value),
                      }))
                    }
                  />
                </label>
              ) : null}

              <label className={styles.scheduleField}>
                <span>Time (UTC)</span>
                <input
                  type="time"
                  value={form.timeUtc}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      timeUtc: event.target.value,
                    }))
                  }
                  required
                />
              </label>
            </div>

            <label className={styles.scheduleCheckbox}>
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    enabled: event.target.checked,
                  }))
                }
              />
              <span>Enabled — run automatically on schedule</span>
            </label>

            <div className={styles.scheduleFormActions}>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : editingId ? (
                  <Pencil className="size-4" />
                ) : (
                  <Plus className="size-4" />
                )}
                {editingId ? 'Save changes' : 'Create schedule'}
              </Button>
            </div>
          </form>
        </section>

        <section className={styles.scheduleListCard}>
          <div className={styles.scheduleListHeader}>
            <h3>Active schedules</h3>
            <span className={styles.scheduleCount}>
              {schedules.length} total
            </span>
          </div>

          {isLoading ? (
            <div className={styles.scheduleEmpty}>
              <Loader2 className="size-5 animate-spin" />
              Loading schedules…
            </div>
          ) : schedules.length === 0 ? (
            <div className={styles.scheduleEmpty}>
              No schedules yet. Create one to start automated draft generation.
            </div>
          ) : (
            <div className={styles.scheduleList}>
              {schedules.map((schedule) => (
                <article
                  key={schedule.id}
                  className={`${styles.scheduleItem} ${schedule.enabled ? '' : styles.scheduleItemPaused}`}
                >
                  <div className={styles.scheduleItemMain}>
                    <div className={styles.scheduleItemTop}>
                      <h4>{schedule.name}</h4>
                      <span
                        className={`${styles.scheduleStatus} ${styles[`scheduleStatus_${schedule.lastRunStatus}`]}`}
                      >
                        {statusLabel(schedule.lastRunStatus)}
                      </span>
                    </div>
                    <p className={styles.scheduleSummary}>{schedule.summary}</p>
                    <p className={styles.schedulePrompt}>{schedule.prompt}</p>
                    <div className={styles.scheduleMeta}>
                      <span>Next: {formatDateTime(schedule.nextRunAt)}</span>
                      <span>Last: {formatDateTime(schedule.lastRunAt)}</span>
                    </div>
                    {schedule.lastRunMessage ? (
                      <p className={styles.scheduleMessage}>
                        {schedule.lastRunMessage}
                      </p>
                    ) : null}
                    {schedule.lastPostId ? (
                      <Link
                        href={`/admin/edit-post/${schedule.lastPostId}`}
                        className={styles.scheduleDraftLink}
                      >
                        Open latest draft
                      </Link>
                    ) : null}
                  </div>

                  <div className={styles.scheduleItemActions}>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => void handleRunNow(schedule.id)}
                      disabled={runningId === schedule.id}
                    >
                      {runningId === schedule.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Play className="size-4" />
                      )}
                      Run now
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(schedule)}
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => void handleToggleEnabled(schedule)}
                    >
                      <Pause className="size-4" />
                      {schedule.enabled ? 'Pause' : 'Enable'}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => void handleDelete(schedule.id)}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
