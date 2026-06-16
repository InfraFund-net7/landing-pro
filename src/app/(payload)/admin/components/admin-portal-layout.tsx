'use client';

import AdminSignOutLink from '@/app/(payload)/admin/components/admin-sign-out-link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Headphones,
  Bell,
  LayoutDashboard,
  Trophy,
  Settings,
  MessageSquare,
  Newspaper,
} from 'lucide-react';
import type { ReactNode } from 'react';
import styles from '../create-post/create-post.module.css';

type AdminPortalLayoutProps = {
  userName: string;
  userInitial: string;
  children: ReactNode;
};

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  {
    href: '/admin/create-post',
    label: 'AI Composition',
    icon: Trophy,
  },
  {
    href: '/admin/post-management',
    label: 'All Posts',
    icon: Newspaper,
  },
  {
    href: '/admin/comment-management',
    label: 'Comments',
    icon: MessageSquare,
  },
  { href: '/admin/account', label: 'Account Setting', icon: Settings },
];

export default function AdminPortalLayout({
  userName,
  userInitial,
  children,
}: AdminPortalLayoutProps) {
  const pathname = usePathname();

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.logo}>
            <div className={styles.logoMark} aria-hidden />
            <span className={styles.logoText}>INFRAFUND</span>
          </div>
          <nav className={styles.nav}>
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === '/admin/create-post'
                  ? pathname === href ||
                    pathname.startsWith('/admin/edit-post/')
                  : href === '/admin/comment-management'
                    ? pathname.startsWith('/admin/comment-management')
                    : href === '/admin/post-management'
                      ? pathname.startsWith('/admin/post-management')
                      : pathname === href ||
                        (href !== '/admin' && pathname.startsWith(href));

              return (
                <Link
                  key={href}
                  href={href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                >
                  <Icon size={18} strokeWidth={1.75} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className={styles.main}>
          <header className={styles.topBar}>
            <span className={styles.greeting}>Hi {userName} - Admin</span>
            <div className={styles.topBarActions}>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Support"
              >
                <Headphones size={16} />
              </button>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Notifications"
              >
                <Bell size={16} />
              </button>
              <AdminSignOutLink />
              <div className={styles.avatar} aria-hidden>
                {userInitial}
              </div>
            </div>
          </header>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}
