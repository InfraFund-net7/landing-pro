'use client';

import { useCallback } from 'react';
import { getDashLoginUrl } from '@/utils/dash-login-url';

interface ParticleLoginButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

/** Sends users to the dashboard login page; the app opens the Particle modal there. */
export default function ParticleLoginButton({
  className,
  children = 'Login',
  onClose,
}: ParticleLoginButtonProps) {
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
