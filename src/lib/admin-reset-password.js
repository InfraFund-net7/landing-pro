import { importMap } from '@/app/(payload)/admin/importMap.js';
import config from '@payload-config';
import { initReq } from 'payload-init-req';
import { resetPasswordOperation } from 'payload';

const MIN_PASSWORD_LENGTH = 8;

/** @returns {Promise<import('payload').PayloadRequest>} */
async function getPayloadReq() {
  const { req } = await initReq({
    configPromise: config,
    importMap,
    key: 'resetPassword',
  });
  return req;
}

/**
 * @param {string} token
 */
export async function validateResetToken(token) {
  const trimmed = token?.trim();
  if (!trimmed) {
    return { ok: false, error: 'Invite link is missing or invalid.' };
  }

  const req = await getPayloadReq();
  const { docs } = await req.payload.find({
    collection: 'users',
    where: {
      and: [
        { resetPasswordToken: { equals: trimmed } },
        {
          resetPasswordExpiration: {
            greater_than: new Date().toISOString(),
          },
        },
      ],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  const user = docs[0];
  if (!user) {
    return {
      ok: false,
      error: 'This invite link is invalid or has expired.',
    };
  }

  return {
    ok: true,
    email: typeof user.email === 'string' ? user.email : '',
    fullName: typeof user.fullName === 'string' ? user.fullName : '',
  };
}

/**
 * @param {FormData} formData
 */
export async function resetPasswordFromFormData(formData) {
  const token = String(formData.get('token') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  if (!token) {
    return { ok: false, error: 'Invite link is missing or invalid.' };
  }

  if (!password) {
    return { ok: false, error: 'Password is required.' };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      ok: false,
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
  }

  if (password !== confirmPassword) {
    return { ok: false, error: 'Passwords do not match.' };
  }

  const req = await getPayloadReq();
  const collection = req.payload.collections.users;

  try {
    const result = await resetPasswordOperation({
      collection,
      data: { token, password },
      overrideAccess: true,
      req,
    });

    return {
      ok: true,
      authToken: result.token,
      collectionAuthConfig: collection.config.auth,
      cookiePrefix: req.payload.config.cookiePrefix,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to set password.';
    return { ok: false, error: message };
  }
}
