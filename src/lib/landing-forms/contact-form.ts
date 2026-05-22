import { LandingApiError } from '@/lib/landing-api-errors';
import { getLandingSql } from '@/lib/landing-db';
import {
  sendLandingNotificationEmail,
  isLandingEmailEnabled,
} from '@/lib/landing-smtp';

type ContactFormInput = {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  user_agent?: string;
};

export async function createContactFormEntry(
  input: ContactFormInput
): Promise<void> {
  const firstName = input.first_name?.trim();
  const lastName = input.last_name?.trim();
  const email = input.email?.trim().toLowerCase();
  const subject = input.subject?.trim();
  const message = input.message?.trim();

  if (!firstName || !lastName || !email || !subject || !message) {
    throw new LandingApiError(400, 'All fields are required.', 'Validation');
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new LandingApiError(
      400,
      'Please enter a valid email address.',
      'Validation'
    );
  }

  const sql = getLandingSql();
  await sql`
    INSERT INTO public.contact_forms (
      first_name,
      last_name,
      email,
      subject,
      message,
      status,
      ip,
      user_agent
    )
    VALUES (
      ${firstName},
      ${lastName},
      ${email},
      ${subject},
      ${message},
      'new'::contact_status,
      ${input.ip ?? null},
      ${input.user_agent ?? null}
    )
  `;

  if (isLandingEmailEnabled()) {
    void notifyContactForm({
      firstName,
      lastName,
      email,
      subject,
      message,
      ip: input.ip ?? '',
      userAgent: input.user_agent ?? '',
    });
  }
}

async function notifyContactForm(form: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
  userAgent: string;
}): Promise<void> {
  const receivedAt = new Date().toISOString();
  const html = `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;color:#333;">
  <div style="max-width:600px;margin:24px auto;padding:24px;background:#fff;border-radius:8px;">
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(`${form.firstName} ${form.lastName}`)}</p>
    <p><strong>Email:</strong> ${escapeHtml(form.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(form.subject)}</p>
    <p><strong>IP:</strong> ${escapeHtml(form.ip || '—')}</p>
    <p><strong>User agent:</strong> ${escapeHtml(form.userAgent || '—')}</p>
    <p><strong>Received at:</strong> ${escapeHtml(receivedAt)}</p>
    <pre style="background:#f4f4f4;padding:12px;border-radius:4px;white-space:pre-wrap;">${escapeHtml(form.message)}</pre>
  </div>
</body></html>`;

  try {
    await sendLandingNotificationEmail({
      subject: '[Infrafund] New Contact Form Submission',
      html,
    });
  } catch (error) {
    console.error('[contact-form] notification email failed:', error);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
