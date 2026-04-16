'use client';

import { useCallback, useEffect } from 'react';
import { useAccount, useModal } from '@particle-network/connectkit';
import { getDashLoginUrl } from '@/utils/dash-login-url';
import { isParticleConfigured } from '@/lib/particle-config';

interface ParticleLoginButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

export default function ParticleLoginButton({
  className,
  children = 'Login',
  onClose,
}: ParticleLoginButtonProps) {
  useEffect(() => {
    console.info(
      `[ParticleLoginButton] mode=${isParticleConfigured ? 'particle-modal' : 'fallback-redirect'}`
    );
  }, []);

  const handleFallbackClick = useCallback(() => {
    onClose?.();
    console.info('[ParticleLoginButton] click -> fallback redirect');
    window.location.href = getDashLoginUrl();
  }, [onClose]);

  if (!isParticleConfigured) {
    return (
      <button type="button" className={className} onClick={handleFallbackClick}>
        {children}
      </button>
    );
  }

  return (
    <ParticleLoginButtonWithModal className={className} onClose={onClose}>
      {children}
    </ParticleLoginButtonWithModal>
  );
}

function ParticleLoginButtonWithModal({
  className,
  children,
  onClose,
}: ParticleLoginButtonProps) {
  const { setOpen } = useModal();
  const account = useAccount();

  // Once connected via Particle, redirect to the dashboard
  useEffect(() => {
    if (
      account.status === 'connected' &&
      account.connector.walletConnectorType === 'particleAuth'
    ) {
      window.location.href = getDashLoginUrl();
    }
  }, [account]);

  const handleClick = useCallback(() => {
    onClose?.();
    console.info('[ParticleLoginButton] click -> open particle modal');
    setOpen(true);
  }, [setOpen, onClose]);

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
