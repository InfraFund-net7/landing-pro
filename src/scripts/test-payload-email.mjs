/**
 * Send a test email through Payload's SMTP adapter (same config as forgot-password).
 *
 *   DATABASE_URL='...' PAYLOAD_SECRET='...' \
 *   PAYLOAD_PUBLIC_SERVER_URL='https://beta.infrafund.net' \
 *   INFRA_CONTACT_FORM_SMTP_HOST=... INFRA_CONTACT_FORM_SMTP_PORT=587 ... \
 *   node src/scripts/test-payload-email.mjs you@example.com
 */
import { getPayload } from 'payload';
import config from '../payload.config.js';

const to = process.argv[2]?.trim();

if (!to) {
  console.error('Usage: node src/scripts/test-payload-email.mjs <to-email>');
  process.exit(1);
}

const payload = await getPayload({ config });

if (!payload.email) {
  console.error(
    'Payload email adapter is not configured. Set INFRA_CONTACT_FORM_SMTP_* env vars.'
  );
  process.exit(1);
}

await payload.sendEmail({
  to,
  subject: 'InfraFund Payload email test',
  html: `<p>If you received this, forgot-password email is configured correctly.</p>
<p>serverURL: ${payload.config.serverURL ?? '(from request origin)'}</p>`,
});

console.log(`Test email sent to ${to}`);
process.exit(0);
