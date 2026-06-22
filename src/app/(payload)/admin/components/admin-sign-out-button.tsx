'use client';

import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

type AdminSignOutButtonProps = {
  children: ReactNode;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'style' | 'tabIndex' | 'title' | 'aria-label'
>;

export default function AdminSignOutButton({
  children,
  className,
  style,
  tabIndex,
  title,
  'aria-label': ariaLabel,
}: AdminSignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  function handleSignOut() {
    if (isSigningOut) return;
    setIsSigningOut(true);
    window.location.assign('/admin/logout');
  }

  return (
    <button
      type="button"
      className={className}
      style={style}
      tabIndex={tabIndex}
      title={title}
      aria-label={ariaLabel}
      disabled={isSigningOut}
      onClick={handleSignOut}
    >
      {isSigningOut ? 'Signing out…' : children}
    </button>
  );
}
