import { nodemailerAdapter } from '@payloadcms/email-nodemailer';

/**
 * Same SMTP env vars as backpro contact form / waitlist (`INFRA_CONTACT_FORM_SMTP_*`).
 *
 * @returns {import('@payloadcms/email-nodemailer').NodemailerAdapterArgs | null}
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
    defaultFromAddress: sender,
    defaultFromName: fromName,
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

/** @returns {ReturnType<typeof nodemailerAdapter> | undefined} */
export function platformSmtpEmailAdapter() {
  const smtp = resolvePlatformSmtpEnv();
  if (!smtp) {
    return undefined;
  }

  return nodemailerAdapter({
    defaultFromAddress: smtp.defaultFromAddress,
    defaultFromName: smtp.defaultFromName,
    transportOptions: smtp.transportOptions,
    // Avoid blocking cold starts on Vercel if the provider rejects VERIFY from edge IPs.
    skipVerify: Boolean(process.env.VERCEL),
  });
}

/** Log missing email config at startup (Vercel / production). */
export function logPayloadEmailConfigStatus(serverURL) {
  const smtp = resolvePlatformSmtpEnv();
  if (smtp) {
    console.log(
      `[payload] email: platform-smtp (${smtp.transportOptions.host}:${smtp.transportOptions.port})`
    );
    return;
  }

  const missing = [];
  if (!process.env.INFRA_CONTACT_FORM_SMTP_HOST?.trim()) {
    missing.push('INFRA_CONTACT_FORM_SMTP_HOST');
  }
  if (!process.env.INFRA_CONTACT_FORM_SMTP_PORT?.trim()) {
    missing.push('INFRA_CONTACT_FORM_SMTP_PORT');
  }
  if (!process.env.INFRA_CONTACT_FORM_SMTP_SENDER?.trim()) {
    missing.push('INFRA_CONTACT_FORM_SMTP_SENDER');
  }
  if (!process.env.INFRA_CONTACT_FORM_SMTP_PASSWORD?.trim()) {
    missing.push('INFRA_CONTACT_FORM_SMTP_PASSWORD');
  }

  if (missing.length > 0) {
    console.warn(
      `[payload] email disabled — set ${missing.join(', ')} for forgot-password mail (console-only until then).`
    );
  }

  if (
    !serverURL &&
    (process.env.VERCEL || process.env.NODE_ENV === 'production')
  ) {
    console.warn(
      '[payload] PAYLOAD_PUBLIC_SERVER_URL is missing or invalid — reset links in emails will be wrong.'
    );
  }
}
