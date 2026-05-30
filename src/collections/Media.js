import { mediaCollectionAccess } from '../access/collection-access.js';
import { canManageContent } from '../access/roles.js';
import { buildPayloadMediaFileUrl } from '../lib/payload-media-file-url.js';
import { isCmsMediaFileProxy } from '../lib/blob-storage-mode.js';

/** @type {import('payload').CollectionConfig} */
export const Media = {
  slug: 'media',
  admin: {
    hidden: ({ user }) => !canManageContent(user),
    group: 'Content',
  },
  access: mediaCollectionAccess,
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc?.filename || !isCmsMediaFileProxy()) return doc;
        return {
          ...doc,
          url: buildPayloadMediaFileUrl({
            filename: doc.filename,
            prefix: doc.prefix,
          }),
        };
      },
    ],
  },
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
