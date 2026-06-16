'use client';

import AdminPortalLayout from '@/app/(payload)/admin/components/admin-portal-layout';
import type {
  AdminPost,
  AdminPostSort,
  AdminPostStats,
  AdminPostStatusFilter,
} from '@/lib/cms-post-types';
import Link from 'next/link';
import {
  ExternalLink,
  MessageSquare,
  Pencil,
  Plus,
  Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import styles from './post-management.module.css';

type PostManagementPanelProps = {
  posts: AdminPost[];
  stats: AdminPostStats;
  statusFilter: AdminPostStatusFilter;
  categoryFilter: string;
  sort: AdminPostSort;
  userName: string;
  userInitial: string;
};

const statusFilters: Array<{ value: AdminPostStatusFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
];

const sortOptions: Array<{ value: AdminPostSort; label: string }> = [
  { value: 'newest', label: 'Newest updated' },
  { value: 'oldest', label: 'Oldest updated' },
  { value: 'title-asc', label: 'Title A–Z' },
  { value: 'title-desc', label: 'Title Z–A' },
];

function formatDisplayDate(value: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function buildFilterHref({
  status,
  category,
  sort,
}: {
  status: AdminPostStatusFilter;
  category: string;
  sort: AdminPostSort;
}) {
  const params = new URLSearchParams();
  if (status !== 'all') params.set('status', status);
  if (category !== 'all') params.set('category', category);
  if (sort !== 'newest') params.set('sort', sort);
  const query = params.toString();
  return query ? `/admin/post-management?${query}` : '/admin/post-management';
}

export default function PostManagementPanel({
  posts,
  stats,
  statusFilter,
  categoryFilter,
  sort,
  userName,
  userInitial,
}: PostManagementPanelProps) {
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const values = new Set<string>();
    for (const post of posts) {
      for (const category of post.categories) {
        values.add(category);
      }
    }
    return [...values].sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let next = posts.filter((post) => {
      if (statusFilter !== 'all' && post.status !== statusFilter) {
        return false;
      }

      if (
        categoryFilter !== 'all' &&
        !post.categories.some(
          (category) => category.toLowerCase() === categoryFilter.toLowerCase()
        )
      ) {
        return false;
      }

      if (!query) return true;

      const haystack = [
        post.title,
        post.slug,
        post.description,
        post.author,
        post.readTime,
        ...post.categories,
        ...post.tags,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });

    next = [...next].sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return (
            new Date(a.updatedAt || a.publishedAt).getTime() -
            new Date(b.updatedAt || b.publishedAt).getTime()
          );
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'newest':
        default:
          return (
            new Date(b.updatedAt || b.publishedAt).getTime() -
            new Date(a.updatedAt || a.publishedAt).getTime()
          );
      }
    });

    return next;
  }, [posts, search, statusFilter, categoryFilter, sort]);

  return (
    <AdminPortalLayout userName={userName} userInitial={userInitial}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h1>All Posts</h1>
          <p>
            Search, filter, and manage blog posts. Published posts appear on the
            public blog; drafts stay in the editor until you publish.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/create-post" className={styles.createBtn}>
            <Plus size={16} />
            Create post
          </Link>
        </div>
      </div>

      <section className={styles.dashboard} aria-label="Post statistics">
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Total posts</p>
          <p className={styles.statValue}>{stats.total}</p>
          <p className={styles.statHint}>All entries in the CMS</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Published</p>
          <p className={styles.statValue}>{stats.published}</p>
          <p className={styles.statHint}>Live on /blog</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Drafts</p>
          <p className={styles.statValue}>{stats.drafts}</p>
          <p className={styles.statHint}>Not visible publicly</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Categories</p>
          <p className={styles.statValue}>{stats.categories}</p>
          <p className={styles.statHint}>Unique topic labels</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Published this month</p>
          <p className={styles.statValue}>{stats.publishedThisMonth}</p>
          <p className={styles.statHint}>Based on publish date</p>
        </article>
      </section>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, slug, author, tags, categories..."
            className={styles.searchInput}
          />
        </div>

        <select
          className={styles.select}
          value={categoryFilter}
          onChange={(event) => {
            window.location.href = buildFilterHref({
              status: statusFilter,
              category: event.target.value,
              sort,
            });
          }}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={sort}
          onChange={(event) => {
            window.location.href = buildFilterHref({
              status: statusFilter,
              category: categoryFilter,
              sort: event.target.value as AdminPostSort,
            });
          }}
          aria-label="Sort posts"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.toolbar}>
        {statusFilters.map((option) => {
          const href = buildFilterHref({
            status: option.value,
            category: categoryFilter,
            sort,
          });
          const active = statusFilter === option.value;

          return (
            <Link
              key={option.value}
              href={href}
              className={active ? styles.filterChipActive : styles.filterChip}
            >
              {option.label}
            </Link>
          );
        })}
      </div>

      <p className={styles.resultsMeta}>
        Showing <strong>{filteredPosts.length}</strong> of{' '}
        <strong>{posts.length}</strong> posts
        {search.trim() ? ` matching “${search.trim()}”` : ''}
      </p>

      {filteredPosts.length === 0 ? (
        <div className={styles.emptyState}>
          No posts match your current search and filters.
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Post</th>
                <th>Status</th>
                <th>Author</th>
                <th>Categories</th>
                <th>Updated</th>
                <th>Read time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <PostRow key={post.id} post={post} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminPortalLayout>
  );
}

function PostRow({ post }: { post: AdminPost }) {
  const initial = post.title.charAt(0).toUpperCase() || 'P';

  return (
    <tr>
      <td>
        <div className={styles.postCell}>
          {post.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.imageUrl} alt="" className={styles.thumb} />
          ) : (
            <div className={styles.thumbFallback}>{initial}</div>
          )}
          <div>
            <p className={styles.postTitle}>{post.title}</p>
            <p className={styles.postDescription}>{post.description}</p>
            <p className={styles.slug}>/blog/{post.slug}</p>
          </div>
        </div>
      </td>
      <td>
        <span
          className={
            post.published ? styles.statusPublished : styles.statusDraft
          }
        >
          {post.published ? 'Published' : 'Draft'}
        </span>
      </td>
      <td>
        <span className={styles.metaText}>{post.author}</span>
      </td>
      <td>
        <div className={styles.pillRow}>
          {post.categories.slice(0, 3).map((category) => (
            <span key={category} className={styles.categoryPill}>
              {category}
            </span>
          ))}
          {post.categories.length === 0 ? (
            <span className={styles.metaText}>—</span>
          ) : null}
        </div>
        {post.tags.length > 0 ? (
          <div className={styles.pillRow} style={{ marginTop: 6 }}>
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className={styles.tagPill}>
                #{tag.replace(/^#/, '')}
              </span>
            ))}
          </div>
        ) : null}
      </td>
      <td>
        <span className={styles.metaText}>
          {formatDisplayDate(post.updatedAt || post.publishedAt)}
        </span>
      </td>
      <td>
        <span className={styles.metaText}>{post.readTime || '—'}</span>
      </td>
      <td>
        <div className={styles.actions}>
          <Link
            href={`/admin/edit-post/${post.id}`}
            className={styles.actionLink}
          >
            <Pencil size={14} />
            Edit
          </Link>
          {post.published ? (
            <Link
              href={`/blog/${post.slug}`}
              className={styles.actionLink}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={14} />
              View
            </Link>
          ) : null}
          <Link
            href={`/admin/comment-management?post=${encodeURIComponent(post.slug)}`}
            className={styles.actionLinkMuted}
          >
            <MessageSquare size={14} />
            Comments
          </Link>
        </div>
      </td>
    </tr>
  );
}
