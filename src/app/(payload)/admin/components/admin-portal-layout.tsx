'use client';

import AdminHeaderActions from '@/app/(payload)/admin/components/admin-header-actions';
import InfraFundLogo from '@/../public/svg/infrafund.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Folder,
  Home,
  LayoutGrid,
  MessageSquare,
  PenLine,
  Settings,
  Tag,
  UserPlus,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from '../create-post/create-post.module.css';

type AdminPortalLayoutProps = {
  userName: string;
  userInitial: string;
  isMasterAdmin?: boolean;
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

export default function AdminPortalLayout({
  userName,
  userInitial,
  isMasterAdmin = false,
  children,
}: AdminPortalLayoutProps) {
  const pathname = usePathname();
  const isDashboardActive =
    pathname === '/admin/create-post' || pathname === '/admin';
  const isAccountActive = pathname.startsWith('/admin/account');
  const isCreateUserActive = pathname.startsWith('/admin/create-user');
  const isAboutUsActive = pathname.startsWith('/admin/about-us');
  const isPayloadCmsActive =
    pathname.startsWith('/admin/globals') ||
    pathname.startsWith('/admin/collections/site-pages') ||
    pathname.startsWith('/admin/collections/media') ||
    pathname.startsWith('/admin/collections/compose-schedules');

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <Link href="/" className={styles.sidebarBrand}>
            <Image
              src={InfraFundLogo}
              alt="InfraFund"
              className={styles.sidebarLogo}
              priority
            />
          </Link>

          <nav className={styles.nav}>
            <Link
              href="/admin/create-post"
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

            {isMasterAdmin ? (
              <>
                <Link
                  href="/admin/globals/home-page"
                  className={`${styles.navLink} ${styles.navLinkSpaced} ${isPayloadCmsActive ? styles.navLinkActive : ''}`}
                >
                  <LayoutGrid size={20} strokeWidth={1.75} />
                  Website CMS
                </Link>
                <Link
                  href="/admin/about-us"
                  className={`${styles.navLink} ${isAboutUsActive ? styles.navLinkActive : ''}`}
                >
                  <Users size={20} strokeWidth={1.75} />
                  About Us
                </Link>
                <Link
                  href="/admin/create-user"
                  className={`${styles.navLink} ${isCreateUserActive ? styles.navLinkActive : ''}`}
                >
                  <UserPlus size={20} strokeWidth={1.75} />
                  Create user
                </Link>
              </>
            ) : null}

            <Link
              href="/admin/account"
              className={`${styles.navLink} ${isAccountActive ? styles.navLinkActive : ''}`}
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
