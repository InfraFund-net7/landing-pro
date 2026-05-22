import { LandingApiError } from '@/lib/landing-api-errors';
import { getLandingSql, isPgErrorCode } from '@/lib/landing-db';
import {
  sendLandingNotificationEmail,
  isLandingEmailEnabled,
} from '@/lib/landing-smtp';

export async function createWaitlistEntry(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !/\S+@\S+\.\S+/.test(normalized)) {
    throw new LandingApiError(400, 'email is required', 'Validation');
  }

  const sql = getLandingSql();

  const existing = await sql`
    SELECT EXISTS (SELECT 1 FROM public.waitlist WHERE email = ${normalized}) AS exists
  `;
  if (existing[0]?.exists) {
    throw new LandingApiError(409, 'email already exists', 'Conflict');
  }

  try {
    await sql`
      INSERT INTO public.waitlist (email, created_at)
      VALUES (${normalized}, NOW())
    `;
  } catch (error) {
    if (isPgErrorCode(error, '23505')) {
      throw new LandingApiError(409, 'email already exists', 'Conflict');
    }
    throw error;
  }

  if (isLandingEmailEnabled()) {
    void notifyWaitlistSignup(normalized);
  }
}

async function notifyWaitlistSignup(email: string): Promise<void> {
  const signedUpAt = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const html = `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;color:#333;">
  <div style="max-width:600px;margin:24px auto;padding:24px;background:#fff;border-radius:8px;">
    <h2>New Waitlist Signup</h2>
    <p>Someone just joined the InfraFund waitlist.</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Signed up at:</strong> ${escapeHtml(signedUpAt)}</p>
  </div>
</body></html>`;

  try {
    await sendLandingNotificationEmail({
      subject: '[InfraFund] New Waitlist Signup',
      html,
    });
  } catch (error) {
    console.error('[waitlist] notification email failed:', error);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
