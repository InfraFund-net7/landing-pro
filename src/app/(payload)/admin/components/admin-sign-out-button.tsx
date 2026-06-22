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

  async function handleSignOut() {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await fetch('/cms/api/users/logout?allSessions=true', {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
      });
    } catch {
      // Continue to the server logout route even if the API call fails.
    }

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
      onClick={() => void handleSignOut()}
    >
      {isSigningOut ? 'Signing out…' : children}
    </button>
  );
}
