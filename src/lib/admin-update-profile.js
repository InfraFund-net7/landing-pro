import config from '@payload-config';
import { getPayload } from 'payload';
import { getUserAvatarUrl } from './user-profile.js';

/**
 * @param {import('payload').TypedUser} user
 */
export async function fetchUserProfileForEdit(user) {
  const payload = await getPayload({ config });

  const doc = await payload.findByID({
    collection: 'users',
    id: user.id,
    user,
    overrideAccess: false,
    depth: 1,
  });

  return {
    email: String(doc.email ?? user.email ?? ''),
    fullName: String(doc.fullName ?? ''),
    jobTitle: String(doc.jobTitle ?? ''),
    profilePhotoId:
      doc.profilePhoto && typeof doc.profilePhoto === 'object'
        ? Number(doc.profilePhoto.id)
        : typeof doc.profilePhoto === 'number'
          ? doc.profilePhoto
          : null,
    profilePhotoUrl: getUserAvatarUrl(doc),
  };
}

/**
 * @param {FormData} formData
 * @param {import('payload').TypedUser} user
 */
export async function updateProfileFromFormData(formData, user) {
  const fullName = String(formData.get('fullName') || '').trim();
  const jobTitle = String(formData.get('jobTitle') || '').trim();
  const profilePhotoRaw = String(formData.get('profilePhotoId') ?? '').trim();
  const profilePhoto =
    profilePhotoRaw && Number.isFinite(Number(profilePhotoRaw))
      ? Number(profilePhotoRaw)
      : null;

  if (!fullName) {
    return { ok: false, error: 'Full name is required' };
  }

  try {
    const payload = await getPayload({ config });

    await payload.update({
      collection: 'users',
      id: user.id,
      user,
      overrideAccess: false,
      data: {
        fullName,
        jobTitle,
        profilePhoto,
      },
    });

    return {
      ok: true,
      profile: {
        fullName,
        jobTitle,
        displayName: fullName,
      },
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to update profile. Please try again.';
    return { ok: false, error: message };
  }
}
