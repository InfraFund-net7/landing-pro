'use client';

import AdminHeaderActions from '@/app/(payload)/admin/components/admin-header-actions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Folder,
  Home,
  MessageSquare,
  PenLine,
  Settings,
  Tag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from '../create-post/create-post.module.css';

type AdminPortalLayoutProps = {
  userName: string;
  userInitial: string;
  children: ReactNode;
};

type BlogNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: (pathname: string) => boolean;
};

const blogNavItems: BlogNavItem[] = [
  {
    href: '/admin/create-post',
    label: 'Overview',
    icon: Box,
    isActive: (pathname) =>
      pathname === '/admin/create-post' ||
      pathname.startsWith('/admin/create-post/') ||
      pathname.startsWith('/admin/edit-post/'),
  },
  {
    href: '/admin/post-management',
    label: 'Posts',
    icon: PenLine,
    isActive: (pathname) => pathname.startsWith('/admin/post-management'),
  },
  {
    href: '/admin/comment-management',
    label: 'Comments',
    icon: MessageSquare,
    isActive: (pathname) => pathname.startsWith('/admin/comment-management'),
  },
  {
    href: '/admin/categories',
    label: 'Categories',
    icon: Folder,
    isActive: (pathname) => pathname.startsWith('/admin/categories'),
  },
  {
    href: '/admin/tags',
    label: 'Tags',
    icon: Tag,
    isActive: (pathname) => pathname.startsWith('/admin/tags'),
  },
];

function BrandMark() {
  return (
    <svg
      className={styles.brandMark}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      aria-hidden
    >
      <path fill="currentColor" d="M11 1.5 13.2 7 11 5.5 8.8 7Z" />
      <path fill="currentColor" d="M11 20.5 13.2 15 11 16.5 8.8 15Z" />
      <path fill="currentColor" d="M1.5 11 7 13.2 5.5 11 7 8.8Z" />
      <path fill="currentColor" d="M20.5 11 15 13.2 16.5 11 15 8.8Z" />
    </svg>
  );
}

export default function AdminPortalLayout({
  userName,
  userInitial,
  children,
}: AdminPortalLayoutProps) {
  const pathname = usePathname();
  const isDashboardActive = pathname === '/admin';
  const isAccountActive = pathname.startsWith('/admin/account');

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBrand}>
            <BrandMark />
            <span className={styles.sidebarBrandText}>{userName}</span>
          </div>

          <nav className={styles.nav}>
            <Link
              href="/admin"
              className={`${styles.navLink} ${isDashboardActive ? styles.navLinkActive : ''}`}
            >
              <Home size={20} strokeWidth={1.75} />
              Dashboard
            </Link>

            <div className={styles.blogNavGroup}>
              <div className={styles.blogNavHeader}>
                <Box size={20} strokeWidth={1.75} />
                Blog
              </div>
              <div className={styles.blogNavItems}>
                {blogNavItems.map(({ href, label, icon: Icon, isActive }) => {
                  const active = isActive(pathname);

                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`${styles.blogNavLink} ${active ? styles.blogNavLinkActive : ''}`}
                    >
                      <Icon size={20} strokeWidth={1.75} />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              href="/admin/account"
              className={`${styles.navLink} ${styles.navLinkSpaced} ${isAccountActive ? styles.navLinkActive : ''}`}
            >
              <Settings size={20} strokeWidth={1.75} />
              Account Setting
            </Link>
          </nav>
        </aside>

        <div className={styles.main}>
          <header className={styles.topBar}>
            <span className={styles.greeting}>Hi {userName} - Admin</span>
            <AdminHeaderActions userInitial={userInitial} />
          </header>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}
