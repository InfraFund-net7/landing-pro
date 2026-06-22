'use client';

import AdminSignOutButton from '@/app/(payload)/admin/components/admin-sign-out-button';
import { useTranslation } from '@payloadcms/ui';

type PayloadSignOutButtonProps = {
  tabIndex?: number;
};

export function PayloadSignOutButton({
  tabIndex = 0,
}: PayloadSignOutButtonProps) {
  const { t } = useTranslation();

  return (
    <AdminSignOutButton
      aria-label={t('authentication:logOut')}
      className="nav__log-out nav__sign-out-link"
      tabIndex={tabIndex}
      title={t('authentication:logOut')}
    >
      {t('authentication:logOut')}
    </AdminSignOutButton>
  );
}
