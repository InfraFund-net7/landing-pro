import { canAccessAdmin, canManageContent, isMasterAdmin } from './roles.js';

/** @param {{ req: import('payload').PayloadRequest }} args */
export const adminPanelUsers = ({ req }) => canAccessAdmin(req.user);

export const anyone = () => true;

/** @param {{ req: import('payload').PayloadRequest }} args */
const masterAdminOnly = ({ req }) => isMasterAdmin(req.user);

/** @param {{ req: import('payload').PayloadRequest }} args */
export const contentManagers = ({ req }) => canManageContent(req.user);

/** @param {{ req: import('payload').PayloadRequest; id?: string | number }} args */
export const masterAdminOrSelf = ({ req, id }) =>
  isMasterAdmin(req.user) ||
  (req.user?.id != null && String(req.user.id) === String(id));

export const contentCollectionAccess = {
  read: anyone,
  create: contentManagers,
  update: contentManagers,
  delete: contentManagers,
  admin: contentManagers,
};

/** Public read; editors can upload for post featured images. */
export const mediaCollectionAccess = {
  read: anyone,
  create: contentManagers,
  update: contentManagers,
  delete: masterAdminOnly,
  admin: masterAdminOnly,
};

export const siteContentReadAccess = {
  read: anyone,
  create: masterAdminOnly,
  update: masterAdminOnly,
  delete: masterAdminOnly,
  admin: masterAdminOnly,
};
