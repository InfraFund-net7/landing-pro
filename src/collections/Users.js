import {
  adminPanelUsers,
  masterAdminOrSelf,
} from '../access/collection-access.js';
import { isMasterAdmin, ROLES } from '../access/roles.js';

/** @type {import('payload').CollectionConfig} */
export const Users = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
    description:
      'Master admins can invite other admins and assign the Content Editor role.',
    hidden: ({ user }) => !isMasterAdmin(user),
  },
  // Vercel: skip session rows in DB (updateOne + transactions use WebSocket and timeout).
  auth: process.env.VERCEL ? { useSessions: false } : true,
  access: {
    admin: adminPanelUsers,
    read: masterAdminOrSelf,
    update: masterAdminOrSelf,
    delete: ({ req }) => isMasterAdmin(req.user),
    create: async ({ req }) => {
      if (isMasterAdmin(req.user)) return true;
      const { totalDocs } = await req.payload.count({
        collection: 'users',
        req,
      });
      return totalDocs === 0;
    },
  },
  hooks: {
    afterLogin: [
      async ({ user, req }) => {
        if (!user?.id || user.role) return;

        await req.payload.update({
          collection: 'users',
          id: user.id,
          data: { role: ROLES.MASTER_ADMIN },
          req,
          overrideAccess: true,
        });
      },
    ],
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data;

        const { totalDocs } = await req.payload.count({
          collection: 'users',
          req,
        });

        if (totalDocs === 0) {
          data.role = ROLES.MASTER_ADMIN;
          return data;
        }

        if (!data.role) {
          data.role = ROLES.CONTENT_EDITOR;
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: ROLES.MASTER_ADMIN,
      saveToJWT: true,
      options: [
        { label: 'Master Admin', value: ROLES.MASTER_ADMIN },
        { label: 'Content Editor', value: ROLES.CONTENT_EDITOR },
      ],
      admin: {
        description:
          'Master Admin: full CMS access. Content Editor: Posts and Comments only.',
        position: 'sidebar',
      },
      access: {
        read: ({ req }) => Boolean(req.user),
        create: ({ req }) => isMasterAdmin(req.user),
        update: ({ req }) => isMasterAdmin(req.user),
      },
    },
  ],
};
