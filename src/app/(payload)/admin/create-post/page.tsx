import config from '@payload-config';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getPayload } from 'payload';
import type { CSSProperties } from 'react';

type PageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function excerptFrom(value: string): string {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= 160) return clean;
  return `${clean.slice(0, 157)}...`;
}

type PayloadWithPostsCreate = {
  create: (args: {
    collection: 'posts';
    data: {
      title: string;
      slug: string;
      description: string;
      mainContent: string;
      published: boolean;
      publishedAt: string;
      readTime: string;
      author: string;
      category: string;
      categories: string[];
      tags: { tag: string }[];
    };
  }) => Promise<unknown>;
};

async function createPostAction(formData: FormData) {
  'use server';

  const title = String(formData.get('title') || '').trim();
  const manualSlug = String(formData.get('slug') || '').trim();
  const intent = String(formData.get('intent') || '').trim();
  const status = intent || String(formData.get('status') || 'draft');
  const mainContent = String(formData.get('mainContent') || '').trim();
  const tagsRaw = String(formData.get('tags') || '').trim();
  const categories = formData
    .getAll('categories')
    .map((item) => String(item).trim())
    .filter(Boolean);

  if (!title) redirect('/admin/create-post?error=Title is required');
  if (!mainContent)
    redirect('/admin/create-post?error=Main content is required');

  const slug = manualSlug ? slugify(manualSlug) : slugify(title);
  if (!slug) redirect('/admin/create-post?error=Valid slug is required');

  const tags = tagsRaw
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => ({ tag }));

  try {
    const payload = (await getPayload({
      config,
    })) as unknown as PayloadWithPostsCreate;

    await payload.create({
      collection: 'posts',
      data: {
        title,
        slug,
        description: excerptFrom(mainContent),
        mainContent,
        published: status === 'published',
        publishedAt: new Date().toISOString(),
        readTime: '5 min read',
        author: 'Editorial',
        category: categories[0] || 'Insights',
        categories,
        tags,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to create post. Please try again.';
    redirect(`/admin/create-post?error=${encodeURIComponent(message)}`);
  }

  redirect('/admin/create-post?success=Post created successfully');
}

const fieldStyle: CSSProperties = {
  width: '100%',
  background: '#0D1425',
  color: '#E6EEFF',
  border: '1px solid #1E2B47',
  borderRadius: '8px',
  padding: '12px 14px',
  fontSize: '14px',
  outline: 'none',
};

export default async function CreatePostPage({ searchParams }: PageProps) {
  const qs = await searchParams;

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(70% 80% at 50% 0%, #102247 0%, #080F1D 55%, #070B13 100%)',
        color: '#E6EEFF',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '980px',
          margin: '0 auto',
          background: 'rgba(10, 18, 34, 0.95)',
          border: '1px solid #1E2B47',
          borderRadius: '14px',
          boxShadow: '0 10px 35px rgba(0,0,0,0.4)',
          padding: '20px 20px 26px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <h1 style={{ fontSize: 28, margin: 0, fontWeight: 700 }}>
            Create New Post
          </h1>
          <Link
            href="/admin/comment-management"
            style={{
              color: '#A7B7D9',
              textDecoration: 'none',
              fontSize: 13,
              border: '1px solid #2A3B61',
              borderRadius: 8,
              padding: '8px 10px',
            }}
          >
            Manage Comments
          </Link>
          <Link
            href="/admin/collections/posts"
            style={{
              color: '#A7B7D9',
              textDecoration: 'none',
              fontSize: 13,
              border: '1px solid #2A3B61',
              borderRadius: 8,
              padding: '8px 10px',
            }}
          >
            View All Posts
          </Link>
        </div>

        {qs.error ? (
          <p
            style={{
              margin: '0 0 14px',
              background: '#3D1320',
              color: '#FECACA',
              border: '1px solid #7F1D1D',
              borderRadius: 8,
              padding: '10px 12px',
              fontSize: 13,
            }}
          >
            {qs.error}
          </p>
        ) : null}

        {qs.success ? (
          <p
            style={{
              margin: '0 0 14px',
              background: '#0F2C22',
              color: '#C8FACC',
              border: '1px solid #166534',
              borderRadius: 8,
              padding: '10px 12px',
              fontSize: 13,
            }}
          >
            {qs.success}
          </p>
        ) : null}

        <form action={createPostAction}>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label
                htmlFor="title"
                style={{ display: 'block', marginBottom: 8, fontSize: 13 }}
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                placeholder="Enter post title"
                style={fieldStyle}
                required
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 220px',
                gap: 12,
              }}
            >
              <div>
                <label
                  htmlFor="slug"
                  style={{ display: 'block', marginBottom: 8, fontSize: 13 }}
                >
                  Slug (optional)
                </label>
                <input
                  id="slug"
                  name="slug"
                  placeholder="auto-generated from title"
                  style={fieldStyle}
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  style={{ display: 'block', marginBottom: 8, fontSize: 13 }}
                >
                  Status
                </label>
                <select id="status" name="status" style={fieldStyle}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="mainContent"
                style={{ display: 'block', marginBottom: 8, fontSize: 13 }}
              >
                Main Content
              </label>
              <textarea
                id="mainContent"
                name="mainContent"
                placeholder="Write your post content..."
                rows={10}
                style={{ ...fieldStyle, resize: 'vertical' }}
                required
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                alignItems: 'start',
              }}
            >
              <div>
                <p style={{ margin: '0 0 8px', fontSize: 13 }}>Categories</p>
                <div
                  style={{
                    border: '1px solid #1E2B47',
                    background: '#0D1425',
                    borderRadius: 8,
                    padding: '10px 12px',
                    display: 'grid',
                    gap: 8,
                    fontSize: 13,
                  }}
                >
                  {[
                    ['all', 'All'],
                    ['blockchain', 'Blockchain'],
                    ['infrastructure', 'Infrastructure'],
                    ['tokenization', 'Tokenization'],
                    ['impact', 'Impact'],
                    ['research', 'Research'],
                  ].map(([value, label]) => (
                    <label key={value} style={{ display: 'flex', gap: 8 }}>
                      <input type="checkbox" name="categories" value={value} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="tags"
                  style={{ display: 'block', marginBottom: 8, fontSize: 13 }}
                >
                  Tags (comma-separated)
                </label>
                <input
                  id="tags"
                  name="tags"
                  placeholder="web3, rwa, climate"
                  style={fieldStyle}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 10,
                marginTop: 6,
              }}
            >
              <button
                type="submit"
                name="intent"
                value="draft"
                style={{
                  border: '1px solid #2A3B61',
                  borderRadius: 8,
                  background: 'transparent',
                  color: '#A7B7D9',
                  padding: '10px 14px',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Save Draft
              </button>
              <button
                type="submit"
                name="intent"
                value="published"
                style={{
                  border: '1px solid #1E8F57',
                  borderRadius: 8,
                  background: '#23DB7B',
                  color: '#032514',
                  fontWeight: 700,
                  padding: '10px 14px',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
