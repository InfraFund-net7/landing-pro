'use client';

import AdminPortalLayout from '@/app/(payload)/admin/components/admin-portal-layout';
import Link from 'next/link';
import styles from '../create-post/create-post.module.css';

type BlogTaxonomyPanelProps = {
  title: string;
  description: string;
  items: string[];
  emptyMessage: string;
  userName: string;
  userInitial: string;
  buildItemHref?: (item: string) => string;
};

export default function BlogTaxonomyPanel({
  title,
  description,
  items,
  emptyMessage,
  userName,
  userInitial,
  buildItemHref,
}: BlogTaxonomyPanelProps) {
  return (
    <AdminPortalLayout userName={userName} userInitial={userInitial}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{title}</h1>
          <p className={styles.fieldHint} style={{ marginTop: 8 }}>
            {description}
          </p>
        </div>
      </div>

      <div className={styles.formCard}>
        {items.length === 0 ? (
          <p className={styles.fieldHint}>{emptyMessage}</p>
        ) : (
          <ul className={styles.taxonomyList}>
            {items.map((item) => (
              <li key={item}>
                {buildItemHref ? (
                  <Link
                    href={buildItemHref(item)}
                    className={styles.taxonomyItem}
                  >
                    {item}
                  </Link>
                ) : (
                  <span className={styles.taxonomyItemStatic}>{item}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminPortalLayout>
  );
}
