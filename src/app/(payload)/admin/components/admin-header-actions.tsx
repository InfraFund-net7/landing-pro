'use client';

import AdminSignOutLink from '@/app/(payload)/admin/components/admin-sign-out-link';
import Link from 'next/link';
import { Bell, MessageSquare, Newspaper } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from '../create-post/create-post.module.css';

type NotificationItem = {
  id: string;
  label: string;
  href: string;
};

type NotificationSummary = {
  pendingComments: number;
  draftPosts: number;
  total: number;
  items: NotificationItem[];
};

type AdminHeaderActionsProps = {
  userInitial: string;
};

export default function AdminHeaderActions({
  userInitial,
}: AdminHeaderActionsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationSummary | null>(null);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState('');

  useEffect(() => {
    if (!notificationsOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [notificationsOpen]);

  useEffect(() => {
    let cancelled = false;

    async function loadNotifications() {
      try {
        const response = await fetch('/admin/api/notifications', {
          credentials: 'include',
        });
        if (!response.ok) return;
        const data = (await response.json()) as NotificationSummary;
        if (!cancelled) {
          setNotifications(data);
        }
      } catch {
        // Ignore background fetch errors; menu can retry on open.
      }
    }

    void loadNotifications();
    return () => {
      cancelled = true;
    };
  }, []);

  async function openNotifications() {
    if (notificationsOpen) {
      setNotificationsOpen(false);
      return;
    }

    setNotificationsOpen(true);
    setNotificationsLoading(true);
    setNotificationsError('');

    try {
      const response = await fetch('/admin/api/notifications', {
        credentials: 'include',
      });
      const data = (await response.json()) as NotificationSummary & {
        message?: string;
      };

      if (!response.ok) {
        setNotificationsError(
          data.message || 'Unable to load notifications right now.'
        );
        return;
      }

      setNotifications(data);
    } catch {
      setNotificationsError('Unable to load notifications right now.');
    } finally {
      setNotificationsLoading(false);
    }
  }

  const notificationCount = notifications?.total ?? 0;

  return (
    <div className={styles.topBarActions} ref={rootRef}>
      <div className={styles.headerMenuWrap}>
        <button
          type="button"
          className={`${styles.iconButton} ${
            notificationsOpen ? styles.iconButtonActive : ''
          }`}
          aria-label="Notifications"
          aria-expanded={notificationsOpen}
          aria-haspopup="menu"
          onClick={() => void openNotifications()}
        >
          <Bell size={16} />
          {notificationCount > 0 ? (
            <span className={styles.notificationBadge} aria-hidden>
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          ) : null}
        </button>
        {notificationsOpen ? (
          <div
            className={styles.headerMenu}
            role="menu"
            aria-label="Notifications"
          >
            <p className={styles.headerMenuTitle}>Notifications</p>
            {notificationsLoading ? (
              <p className={styles.headerMenuEmpty}>Loading…</p>
            ) : notificationsError ? (
              <p className={styles.headerMenuEmpty}>{notificationsError}</p>
            ) : notifications?.items.length ? (
              notifications.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={styles.headerMenuItem}
                  role="menuitem"
                  onClick={() => setNotificationsOpen(false)}
                >
                  {item.id === 'pending-comments' ? (
                    <MessageSquare size={15} />
                  ) : (
                    <Newspaper size={15} />
                  )}
                  {item.label}
                </Link>
              ))
            ) : (
              <p className={styles.headerMenuEmpty}>
                You&apos;re all caught up. No pending comments or drafts.
              </p>
            )}
          </div>
        ) : null}
      </div>

      <AdminSignOutLink />

      <Link
        href="/admin/account"
        className={styles.avatarLink}
        title="Account settings"
      >
        <div className={styles.avatar} aria-hidden>
          {userInitial}
        </div>
      </Link>
    </div>
  );
}
