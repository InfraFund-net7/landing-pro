'use client';

import { useConfig, useTranslation } from '@payloadcms/ui';
import { formatAdminURL } from 'payload/shared';

type PayloadSignOutButtonProps = {
  tabIndex?: number;
};

export function PayloadSignOutButton({
  tabIndex = 0,
}: PayloadSignOutButtonProps) {
  const { t } = useTranslation();
  const { config } = useConfig();
  const {
    admin: {
      routes: { logout: logoutRoute },
    },
    routes: { admin: adminRoute },
  } = config;
  const logoutHref = formatAdminURL({ adminRoute, path: logoutRoute });

  return (
    <form action={logoutHref} method="get" style={{ display: 'inline' }}>
      <button
        type="submit"
        aria-label={t('authentication:logOut')}
        className="nav__log-out nav__sign-out-link"
        tabIndex={tabIndex}
        title={t('authentication:logOut')}
      >
        {t('authentication:logOut')}
      </button>
    </form>
  );
}
