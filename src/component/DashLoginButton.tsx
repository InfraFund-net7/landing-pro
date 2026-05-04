'use client';

import { useCallback } from 'react';
import { getDashLoginUrl } from '@/utils/dash-login-url';

interface DashLoginButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

/** Opens the dashboard login page (OpenFort auth on the dashboard app). */
export default function DashLoginButton({
  className,
  children = 'Login',
  onClose,
}: DashLoginButtonProps) {
  const goToDashboardLogin = useCallback(() => {
    onClose?.();
    window.location.href = getDashLoginUrl();
  }, [onClose]);

  return (
    <button type="button" className={className} onClick={goToDashboardLogin}>
      {children}
    </button>
  );
}
