'use client';

import PostCoverImagePicker from '@/app/(payload)/admin/components/post-cover-image-picker';
import PostRichTextEditor, {
  type PostRichTextEditorHandle,
} from '@/app/(payload)/admin/components/post-rich-text-editor';
import TagsInput from '@/app/(payload)/admin/components/tags-input';
import AdminPortalLayout from '@/app/(payload)/admin/components/admin-portal-layout';
import Link from 'next/link';
import {
  buildPostSaveBody,
  isEmptyHtml,
  parsePayloadApiError,
  slugifyPost,
} from '@/lib/admin-post-form-utils.js';
import { Eye, Save, Send, X } from 'lucide-react';
import { useCallback, useRef, useState, type FormEvent } from 'react';
import styles from '../create-post/create-post.module.css';

type PostEditorInitialValues = {
  title: string;
  slug: string;
  mainContent: string;
  author: string;
  categories: string[];
  tags: string;
  readTime: string;
  published: boolean;
  publishedAt: string;
  featuredImageId?: number | null;
  featuredImageUrl?: string | null;
};

type PostEditorFormProps = {
  mode: 'create' | 'edit';
  postId?: string;
  initialValues?: PostEditorInitialValues;
  userName: string;
  userInitial: string;
  authorLabel: string;
  error?: string;
  success?: string;
};

export default function PostEditorForm({
  mode,
  postId,
  initialValues,
  userName,
  userInitial,
  authorLabel,
  error: initialError,
  success: initialSuccess,
}: PostEditorFormProps) {
  const isEdit = mode === 'edit';
  const formRef = useRef<HTMLFormElement>(null);
  const intentRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<PostRichTextEditorHandle>(null);
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [slug, setSlug] = useState(initialValues?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [mainContent, setMainContent] = useState(
    initialValues?.mainContent ?? ''
  );
  const [readTime, setReadTime] = useState(initialValues?.readTime ?? '');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [formError, setFormError] = useState(initialError ?? '');
  const [formSuccess, setFormSuccess] = useState(initialSuccess ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setIntent = (value: 'draft' | 'published') => {
    if (intentRef.current) {
      intentRef.current.value = value;
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugifyPost(value));
    }
  };

  const handlePreview = useCallback(() => {
    setPreviewOpen(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormSuccess('');

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const intent = String(formData.get('intent') || 'draft');
    const author = String(formData.get('author') || 'self');
    const tagsRaw = String(formData.get('tags') || '');
    const categoriesRaw = String(formData.get('categories') || '');
    const readTimeRaw = String(formData.get('readTime') || readTime);

    if (!title.trim()) {
      setFormError('Title is required');
      return;
    }
    const contentHtml = editorRef.current?.getHtml() ?? mainContent;
    if (!contentHtml.trim() || isEmptyHtml(contentHtml)) {
      setFormError('Main content is required');
      return;
    }

    const body = buildPostSaveBody({
      title,
      slug,
      mainContent: contentHtml,
      intent,
      authorKind: author,
      userId: undefined,
      userDisplayName: authorLabel,
      categoriesRaw,
      tagsRaw,
      readTimeRaw,
      existingPublishedAt: initialValues?.publishedAt,
    });

    if (!body.slug) {
      setFormError('Valid slug is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.set('title', title);
      submitData.set('slug', slug);
      submitData.set('mainContent', contentHtml);
      submitData.set('intent', intent);
      submitData.set('author', author);
      submitData.set('tags', tagsRaw);
      submitData.set('categories', categoriesRaw);
      submitData.set('readTime', readTimeRaw);
      if (initialValues?.publishedAt) {
        submitData.set('existingPublishedAt', initialValues.publishedAt);
      }
      submitData.set(
        'featuredImageId',
        String(formData.get('featuredImageId') ?? '')
      );

      const endpoint = isEdit
        ? `/admin/api/posts/${postId}`
        : '/admin/api/create-post';

      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'same-origin',
        body: submitData,
      });

      const data = await response.json().catch(() => null);

      if (response.status === 401) {
        const redirectPath = isEdit
          ? `/admin/edit-post/${postId}`
          : '/admin/create-post';
        window.location.href =
          '/admin/login?redirect=' + encodeURIComponent(redirectPath);
        return;
      }

      if (!response.ok) {
        setFormError(
          parsePayloadApiError(
            data,
            `Unable to ${intent === 'published' ? 'publish' : 'save'} the post. Please try again.`
          )
        );
        return;
      }

      const successMessage = isEdit
        ? intent === 'published'
          ? 'Post updated and published.'
          : 'Draft saved.'
        : intent === 'published'
          ? 'Post published successfully.'
          : 'Draft saved successfully.';

      const savedPostId =
        isEdit && postId
          ? postId
          : data && typeof data === 'object' && 'id' in data
            ? String((data as { id: string | number }).id)
            : null;

      const redirectPath = savedPostId
        ? `/admin/edit-post/${savedPostId}?success=${encodeURIComponent(successMessage)}`
        : `/admin/create-post?success=${encodeURIComponent(successMessage)}`;

      window.location.href = redirectPath;
    } catch {
      setFormError('Network error. Check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultIntent =
    isEdit && initialValues?.published ? 'published' : 'draft';

  return (
    <AdminPortalLayout userName={userName} userInitial={userInitial}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </h1>
        <div className={styles.headerActions}>
          <button
            type="submit"
            form="post-editor-form"
            className={styles.btnOutline}
            disabled={isSubmitting}
            onClick={() => setIntent('draft')}
          >
            <Save size={16} />
            {isSubmitting ? 'Saving…' : 'Save Draft'}
          </button>
          <button
            type="button"
            className={styles.btnOutline}
            onClick={handlePreview}
            disabled={isSubmitting}
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            type="submit"
            form="post-editor-form"
            className={styles.btnPrimary}
            disabled={isSubmitting}
            onClick={() => setIntent('published')}
          >
            <Send size={16} />
            {isSubmitting
              ? isEdit
                ? 'Updating…'
                : 'Publishing…'
              : isEdit
                ? 'Update'
                : 'Publish'}
          </button>
        </div>
      </div>

      {formError ? (
        <p className={`${styles.alert} ${styles.alertError}`}>{formError}</p>
      ) : null}

      {formSuccess ? (
        <p className={`${styles.alert} ${styles.alertSuccess}`}>
          {formSuccess}
        </p>
      ) : null}

      {isEdit && slug ? (
        <p className={styles.fieldHint} style={{ marginBottom: 16 }}>
          <Link
            href={`/admin/comment-management?post=${encodeURIComponent(slug)}`}
          >
            View and reply to comments on this post
          </Link>
        </p>
      ) : null}

      <form
        ref={formRef}
        id="post-editor-form"
        onSubmit={handleSubmit}
        className={styles.formCard}
      >
        <input
          ref={intentRef}
          type="hidden"
          name="intent"
          defaultValue={defaultIntent}
        />
        <input type="hidden" name="mainContent" value={mainContent} readOnly />
        <div className={styles.formGrid}>
          <div>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              id="title"
              name="title"
              className={styles.field}
              placeholder="Enter your post title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
          </div>

          <div className={styles.row2}>
            <div>
              <label htmlFor="slug" className={styles.label}>
                Slug (URL)
              </label>
              <input
                id="slug"
                name="slug"
                className={styles.field}
                placeholder="Post-url-slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="readTime" className={styles.label}>
                Estimated read time
              </label>
              <input
                id="readTime"
                name="readTime"
                className={styles.field}
                placeholder="5 min read"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
              />
              <p className={styles.fieldHint}>e.g. 8 min read or just 8</p>
            </div>
            <div>
              <label htmlFor="author" className={styles.label}>
                Author
              </label>
              <select
                id="author"
                name="author"
                className={styles.field}
                defaultValue={initialValues?.author ?? 'self'}
              >
                <option value="self">{authorLabel}</option>
                <option value="editorial">Editorial</option>
              </select>
            </div>
          </div>

          <div>
            <label className={styles.label}>Cover image</label>
            <p className={styles.fieldHint}>
              This image appears on the blog grid at <strong>/blog</strong>,
              like your other published posts.
            </p>
            <PostCoverImagePicker
              initialImageUrl={initialValues?.featuredImageUrl}
              initialMediaId={initialValues?.featuredImageId}
            />
          </div>

          <div>
            <label className={styles.label}>Main Content</label>
            <p className={styles.fieldHint}>
              Only text set to <strong>Heading 1</strong> in the toolbar becomes
              a section in the sticky sidebar on the live post. Use Heading 2 or
              3 for subheadings inside a section. Insert images from your
              computer with the image button in the toolbar.
            </p>
            <PostRichTextEditor
              ref={editorRef}
              defaultValue={initialValues?.mainContent}
              onChange={setMainContent}
            />
          </div>

          <div className={styles.row2Bottom}>
            <div>
              <label className={styles.label}>Categories</label>
              <TagsInput
                name="categories"
                placeholder="Add categories..."
                defaultTags={initialValues?.categories ?? []}
              />
            </div>

            <div>
              <label className={styles.label}>Tags</label>
              <TagsInput
                name="tags"
                defaultTags={
                  initialValues?.tags
                    ? initialValues.tags
                        .split(',')
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                    : []
                }
              />
            </div>
          </div>
        </div>
      </form>

      {previewOpen ? (
        <div
          className={styles.previewOverlay}
          onClick={() => setPreviewOpen(false)}
          role="presentation"
        >
          <div
            className={styles.previewModal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="preview-title"
          >
            <div className={styles.previewHeader}>
              <h2 id="preview-title" className={styles.previewTitle}>
                {title || 'Untitled Post'}
              </h2>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setPreviewOpen(false)}
                aria-label="Close preview"
              >
                <X size={16} />
              </button>
            </div>
            <div
              className={styles.previewBody}
              dangerouslySetInnerHTML={{
                __html:
                  mainContent || '<p style="color:#5a6b88">No content yet.</p>',
              }}
            />
          </div>
        </div>
      ) : null}
    </AdminPortalLayout>
  );
}
