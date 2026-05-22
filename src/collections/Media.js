import { mediaCollectionAccess } from '../access/collection-access.js';
import { canManageContent } from '../access/roles.js';

/** @type {import('payload').CollectionConfig} */
export const Media = {
  slug: 'media',
  admin: {
    hidden: ({ user }) => !canManageContent(user),
    group: 'Content',
  },
  access: mediaCollectionAccess,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
};
