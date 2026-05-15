import nodemailer from 'nodemailer';

/**
 * Same SMTP env vars as backpro contact form / waitlist (`INFRA_CONTACT_FORM_SMTP_*`).
 *
 * @returns {{ sender: string, fromName: string, transportOptions: import('nodemailer').TransportOptions } | null}
 */
function resolvePlatformSmtpEnv() {
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

  const portNum = Number.parseInt(portRaw, 10);
  if (Number.isNaN(portNum) || portNum < 1 || portNum > 65535) {
    return null;
  }

  const authUser = username || sender;
  const portStr = String(portRaw).trim();
  const secure = portStr === '465' || portNum === 465;

  return {
    sender,
    fromName,
    transportOptions: {
      host,
      port: portNum,
      secure,
      requireTLS: requireTLS && !secure,
      auth: {
        user: authUser,
        pass: password,
      },
      tls: {
        minVersion: 'TLSv1.2',
      },
    },
  };
}

/**
 * Payload `email` adapter (forgot password, etc.) using platform SMTP.
 * Payload calls `email({ payload })` and expects `{ name, sendEmail, ... }`.
 */
export function platformSmtpEmailAdapter() {
  const smtp = resolvePlatformSmtpEnv();
  if (!smtp) {
    return undefined;
  }

  return (adapterContext) => {
    void adapterContext.payload;
    const transport = nodemailer.createTransport(smtp.transportOptions);
    return {
      name: 'platform-smtp',
      defaultFromAddress: smtp.sender,
      defaultFromName: smtp.fromName,
      sendEmail: async (message) =>
        transport.sendMail({
          from: `${smtp.fromName} <${smtp.sender}>`,
          ...message,
        }),
    };
  };
}
