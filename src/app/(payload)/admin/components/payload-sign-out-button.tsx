'use client';

import { Link, useConfig, useTranslation } from '@payloadcms/ui';
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

  return (
    <Link
      aria-label={t('authentication:logOut')}
      className="nav__log-out nav__sign-out-link"
      href={formatAdminURL({ adminRoute, path: logoutRoute })}
      prefetch={false}
      tabIndex={tabIndex}
      title={t('authentication:logOut')}
    >
      {t('authentication:logOut')}
    </Link>
  );
}
