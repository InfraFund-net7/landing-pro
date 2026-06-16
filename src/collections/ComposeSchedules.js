import { contentCollectionAccess } from '../access/collection-access.js';

/** @type {import('payload').CollectionConfig} */
export const ComposeSchedules = {
  slug: 'compose-schedules',
  labels: {
    singular: 'Compose Schedule',
    plural: 'Compose Schedules',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'frequency', 'enabled', 'nextRunAt', 'lastRunAt'],
    group: 'Content',
    hidden: true,
    description:
      'Automated AI post creation schedules are managed in the AI Composition dashboard.',
  },
  access: contentCollectionAccess,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'prompt',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Instructions for the editorial agent — topic, audience, angle, or outline.',
      },
    },
    {
      name: 'frequency',
      type: 'select',
      required: true,
      defaultValue: 'weekly',
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
      ],
    },
    {
      name: 'dayOfWeek',
      type: 'number',
      defaultValue: 1,
      min: 0,
      max: 6,
      admin: {
        description:
          '0 = Sunday through 6 = Saturday. Used for weekly schedules.',
        condition: (_, siblingData) => siblingData?.frequency === 'weekly',
      },
    },
    {
      name: 'dayOfMonth',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 28,
      admin: {
        description: 'Day of month (1–28). Used for monthly schedules.',
        condition: (_, siblingData) => siblingData?.frequency === 'monthly',
      },
    },
    {
      name: 'timeUtc',
      type: 'text',
      required: true,
      defaultValue: '09:00',
      admin: {
        description: 'Run time in UTC using HH:MM format, e.g. 09:00.',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'nextRunAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'lastRunAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'lastRunStatus',
      type: 'select',
      defaultValue: 'idle',
      options: [
        { label: 'Idle', value: 'idle' },
        { label: 'Running', value: 'running' },
        { label: 'Success', value: 'success' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'lastRunMessage',
      type: 'textarea',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastPost',
      type: 'relationship',
      relationTo: 'posts',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
};
