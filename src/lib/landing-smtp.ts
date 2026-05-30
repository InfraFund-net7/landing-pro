import nodemailer from 'nodemailer';

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  requireTLS: boolean;
  auth: { user: string; pass: string };
  fromAddress: string;
  fromName: string;
};

function resolveSmtpConfig(): SmtpConfig | null {
  const host = process.env.INFRA_CONTACT_FORM_SMTP_HOST?.trim();
  const portRaw = process.env.INFRA_CONTACT_FORM_SMTP_PORT?.trim();
  const sender = process.env.INFRA_CONTACT_FORM_SMTP_SENDER?.trim();
  const username = process.env.INFRA_CONTACT_FORM_SMTP_USERNAME?.trim();
  const password = process.env.INFRA_CONTACT_FORM_SMTP_PASSWORD?.trim();
  const requireTLS =
    process.env.INFRA_CONTACT_FORM_SMTP_REQUIRE_TLS === 'true' ||
    process.env.INFRA_CONTACT_FORM_SMTP_REQUIRE_TLS === '1';
  const fromName =
    process.env.INFRA_CONTACT_FORM_SMTP_FROM_NAME?.trim() || 'InfraFund';

  if (!host || !portRaw || !sender || !password) {
    return null;
  }

  const port = Number.parseInt(portRaw, 10);
  if (Number.isNaN(port) || port < 1 || port > 65535) {
    return null;
  }

  const secure = portRaw === '465' || port === 465;

  return {
    host,
    port,
    secure,
    requireTLS: requireTLS && !secure,
    auth: { user: username || sender, pass: password },
    fromAddress: sender,
    fromName,
  };
}

function resolveNotificationReceiver(): string | null {
  return process.env.INFRA_CONTACT_FORM_RECEIVER?.trim() || null;
}

export function isLandingEmailEnabled(): boolean {
  return Boolean(resolveSmtpConfig() && resolveNotificationReceiver());
}

export async function sendLandingNotificationEmail(options: {
  subject: string;
  html: string;
}): Promise<void> {
  const smtp = resolveSmtpConfig();
  const to = resolveNotificationReceiver();
  if (!smtp || !to) {
    return;
  }

  const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    requireTLS: smtp.requireTLS,
    auth: smtp.auth,
    tls: { minVersion: 'TLSv1.2' },
  });

  await transport.sendMail({
    from: `"${smtp.fromName}" <${smtp.fromAddress}>`,
    to,
    subject: options.subject,
    html: options.html,
  });
}
