'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import styles from '../create-post/create-post.module.css';

export default function InviteContributorNavLink({
  isActive = false,
}: {
  isActive?: boolean;
}) {
  const [canInvite, setCanInvite] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPermission() {
      try {
        const response = await fetch('/admin/api/invite-contributor', {
          credentials: 'same-origin',
        });
        if (!response.ok) return;
        const data = (await response.json()) as { canInvite?: boolean };
        if (!cancelled) {
          setCanInvite(Boolean(data.canInvite));
        }
      } catch {
        // Ignore background permission check errors.
      }
    }

    void loadPermission();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!canInvite) {
    return null;
  }

  return (
    <Link
      href="/admin/create-user"
      className={`${styles.navLink} ${styles.navLinkSpaced} ${isActive ? styles.navLinkActive : ''}`}
    >
      <UserPlus size={20} strokeWidth={1.75} />
      Create user
    </Link>
  );
}
