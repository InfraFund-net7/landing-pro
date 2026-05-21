'use client';

import { useEffect, useState } from 'react';
import { DASHBOARD_LOGIN_URL, getDashLoginUrl } from '@/utils/dash-login-url';

interface DashLoginButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

/** Links to the dashboard login page (OpenFort auth on dashboard.infrafund.net). */
export default function DashLoginButton({
  className,
  children = 'Login',
  onClose,
}: DashLoginButtonProps) {
  const [href, setHref] = useState(DASHBOARD_LOGIN_URL);

  useEffect(() => {
    setHref(getDashLoginUrl());
  }, []);

  return (
    <a href={href} className={className} onClick={() => onClose?.()}>
      {children}
    </a>
  );
}
