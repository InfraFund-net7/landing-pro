import { anyone, contentManagers } from '../access/collection-access.js';
import { canManageContent } from '../access/roles.js';

/** @type {import('payload').CollectionConfig} */
export const Comments = {
  slug: 'comments',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'status', 'post', 'createdAt'],
    group: 'Content',
    hidden: true,
    description:
      'Moderation and replies live in the admin sidebar under Comments (/admin/comment-management).',
  },
  access: {
    read: ({ req }) => {
      if (canManageContent(req.user)) return true;
      return {
        status: {
          equals: 'approved',
        },
      };
    },
    create: anyone,
    update: contentManagers,
    delete: contentManagers,
    admin: contentManagers,
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create') {
          if (req.user && canManageContent(req.user)) {
            data.status = 'approved';
            if (!data.authorUser) {
              data.authorUser = req.user.id;
            }
          } else if (!req.user) {
            data.status = 'pending';
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'authorEmail',
      type: 'email',
    },
    {
      name: 'authorUser',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description:
          'CMS team member profile for editorial replies and auto-published admin comments.',
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Unapproved', value: 'unapproved' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'comments',
      admin: {
        description: 'Set for replies, including editorial responses.',
      },
    },
    {
      name: 'isEditorialReply',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
