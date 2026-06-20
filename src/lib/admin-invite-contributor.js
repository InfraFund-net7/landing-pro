import { isMasterAdmin, ROLES } from '../access/roles.js';
import config from '@payload-config';
import crypto from 'crypto';
import { getPayload } from 'payload';
import { formatAdminURL } from 'payload/shared';
import { getUserDisplayName } from './user-profile.js';

const INVITE_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * @param {import('payload').Payload} payload
 * @param {Request} [request]
 */
function resolveServerURL(payload, request) {
  const configured = payload.config.serverURL?.trim();
  if (configured) return configured;

  if (request) {
    try {
      return new URL(request.url).origin;
    } catch {
      /* ignore */
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) {
    try {
      return new URL(siteUrl).origin;
    } catch {
      /* ignore */
    }
  }

  return null;
}

/**
 * @param {{
 *   payload: import('payload').Payload;
 *   token: string;
 *   inviteeEmail: string;
 *   inviteeName?: string;
 *   inviterName: string;
 *   request?: Request;
 * }} options
 */
function buildInviteEmailHtml({
  payload,
  token,
  inviteeEmail,
  inviteeName,
  inviterName,
  request,
}) {
  const serverURL = resolveServerURL(payload, request);
  if (!serverURL) {
    throw new Error(
      'Server URL is not configured. Set PAYLOAD_PUBLIC_SERVER_URL for invite links.'
    );
  }

  const inviteUrl = formatAdminURL({
    adminRoute: payload.config.routes.admin,
    path: `${payload.config.admin.routes.reset ?? '/reset'}/${token}`,
    serverURL,
  });

  const greetingName = inviteeName?.trim() || inviteeEmail;

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f4f7fb;font-family:Arial,sans-serif;color:#0b1220;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #d8e0ef;border-radius:12px;border-collapse:collapse;border-spacing:0;">
      <tr>
        <td style="padding:28px 28px 8px;">
          <p style="margin:0 0 12px;font-size:18px;font-weight:700;">You are invited to InfraFund</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
            Hi ${escapeHtml(greetingName)},
          </p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
            ${escapeHtml(inviterName)} invited you to join the InfraFund blog as a content contributor.
            Use the button below to set your password and access the admin portal.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 24px;">
          <a href="${inviteUrl}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:#24ff8e;color:#032514;font-size:15px;font-weight:700;text-decoration:none;">
            Set your password
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 28px;">
          <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#5b6b86;">
            Or copy this link into your browser:
          </p>
          <p style="margin:0;font-size:13px;line-height:1.6;word-break:break-all;color:#1d4ed8;">
            ${inviteUrl}
          </p>
          <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#5b6b86;">
            This invite link expires in 7 days. If you did not expect this email, you can ignore it.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** @param {string} value */
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** @param {string} email */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * @param {import('payload').Payload} payload
 * @param {string | number} userId
 */
async function assignInviteToken(payload, userId) {
  const token = crypto.randomBytes(20).toString('hex');
  const resetPasswordExpiration = new Date(
    Date.now() + INVITE_EXPIRATION_MS
  ).toISOString();

  await payload.update({
    collection: 'users',
    id: userId,
    data: {
      resetPasswordToken: token,
      resetPasswordExpiration,
    },
    overrideAccess: true,
  });

  return token;
}

/**
 * @param {{
 *   inviter: import('payload').TypedUser;
 *   email: string;
 *   fullName?: string;
 *   jobTitle?: string;
 *   request?: Request;
 * }} input
 */
async function inviteContributor(input) {
  const { inviter, request } = input;

  if (!isMasterAdmin(inviter)) {
    return { ok: false, error: 'Only master admins can invite contributors.' };
  }

  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName?.trim() ?? '';
  const jobTitle = input.jobTitle?.trim() ?? '';

  if (!email) {
    return { ok: false, error: 'Email is required.' };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: 'Enter a valid email address.' };
  }

  const payload = await getPayload({ config });

  if (!payload.email) {
    return {
      ok: false,
      error:
        'Email is not configured. Set INFRA_CONTACT_FORM_SMTP_* environment variables.',
    };
  }

  if (!resolveServerURL(payload, request)) {
    return {
      ok: false,
      error:
        'Server URL is not configured. Set PAYLOAD_PUBLIC_SERVER_URL so invite links work.',
    };
  }

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  const existing = docs[0];
  let userId = existing?.id ?? null;
  let resent = false;

  if (existing) {
    if (isMasterAdmin(existing)) {
      return {
        ok: false,
        error: 'That email already belongs to a master admin account.',
      };
    }

    await payload.update({
      collection: 'users',
      id: existing.id,
      data: {
        ...(fullName ? { fullName } : {}),
        ...(jobTitle ? { jobTitle } : {}),
        role: ROLES.CONTENT_EDITOR,
      },
      overrideAccess: true,
    });
    resent = true;
  } else {
    const created = await payload.create({
      collection: 'users',
      data: {
        email,
        password: crypto.randomBytes(32).toString('hex'),
        role: ROLES.CONTENT_EDITOR,
        ...(fullName ? { fullName } : {}),
        ...(jobTitle ? { jobTitle } : {}),
      },
      overrideAccess: true,
    });
    userId = created.id;
  }

  if (userId == null) {
    return { ok: false, error: 'Unable to create contributor invite.' };
  }

  const token = await assignInviteToken(payload, userId);
  const inviterName = getUserDisplayName(inviter);

  await payload.sendEmail({
    to: email,
    subject: 'You are invited to contribute on InfraFund',
    html: buildInviteEmailHtml({
      payload,
      token,
      inviteeEmail: email,
      inviteeName: fullName,
      inviterName,
      request,
    }),
  });

  return {
    ok: true,
    email,
    resent,
  };
}

/**
 * @param {FormData} formData
 * @param {import('payload').TypedUser} inviter
 * @param {Request} [request]
 */
export async function inviteContributorFromFormData(
  formData,
  inviter,
  request
) {
  return inviteContributor({
    inviter,
    email: String(formData.get('email') ?? ''),
    fullName: String(formData.get('fullName') ?? ''),
    jobTitle: String(formData.get('jobTitle') ?? ''),
    request,
  });
}
