import {
  adminPanelUsers,
  masterAdminOrSelf,
} from '../access/collection-access.js';
import { isMasterAdmin, ROLES } from '../access/roles.js';
import { resolveUsersAuthConfig } from '../lib/payload-auth-cookies.js';

/** @param {{ req: import('payload').PayloadRequest; id?: string | number }} args */
const profileFieldUpdateAccess = ({ req, id }) =>
  isMasterAdmin(req.user) ||
  (req.user?.id != null && id != null && String(req.user.id) === String(id));

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
  auth: resolveUsersAuthConfig(),
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

        try {
          await req.payload.update({
            collection: 'users',
            id: user.id,
            data: { role: ROLES.MASTER_ADMIN },
            req,
            overrideAccess: true,
          });
        } catch (err) {
          console.warn(
            '[payload] afterLogin role bootstrap failed:',
            err instanceof Error ? err.message : err
          );
        }
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
      name: 'fullName',
      type: 'text',
      admin: {
        description: 'Shown on blog posts when you are the author.',
      },
      access: {
        read: () => true,
        update: profileFieldUpdateAccess,
      },
    },
    {
      name: 'jobTitle',
      type: 'text',
      admin: {
        description:
          'Role or title shown under your name on blog posts, e.g. Head of Research and Development.',
      },
      access: {
        read: () => true,
        update: profileFieldUpdateAccess,
      },
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile picture shown on blog posts you author.',
      },
      access: {
        read: () => true,
        update: profileFieldUpdateAccess,
      },
    },
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
