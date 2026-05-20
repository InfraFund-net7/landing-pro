import { mediaCollectionAccess } from '../access/collection-access.js';
import { isMasterAdmin } from '../access/roles.js';

/** @type {import('payload').CollectionConfig} */
export const Media = {
  slug: 'media',
  admin: {
    hidden: ({ user }) => !isMasterAdmin(user),
  },
  access: mediaCollectionAccess,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
};
