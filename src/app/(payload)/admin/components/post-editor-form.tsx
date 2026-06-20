'use client';

import PostCoverImagePicker from '@/app/(payload)/admin/components/post-cover-image-picker';
import PostPreviewExperience from '@/app/(payload)/admin/components/post-preview-experience';
import PostRichTextEditor, {
  type PostRichTextEditorHandle,
} from '@/app/(payload)/admin/components/post-rich-text-editor';
import TagsInput from '@/app/(payload)/admin/components/tags-input';
import AdminPortalLayout from '@/app/(payload)/admin/components/admin-portal-layout';
import Link from 'next/link';
import {
  buildPostSaveBody,
  buildPreviewBlogFromEditor,
  isEmptyHtml,
  parsePayloadApiError,
  slugifyPost,
} from '@/lib/admin-post-form-utils.js';
import {
  BLOG_READING_WPM,
  calculateReadTimeFromContent,
  countWordsInContent,
} from '@/lib/read-time.js';
import { Eye, Save, Send, Sparkles, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState, type FormEvent } from 'react';
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
  isMasterAdmin?: boolean;
  authorLabel: string;
  authorTitle?: string;
  authorAvatarUrl?: string;
  authorLinkedInUrl?: string;
  authorXUrl?: string;
  error?: string;
  success?: string;
  backToAiHref?: string;
};

export default function PostEditorForm({
  mode,
  postId,
  initialValues,
  userName,
  userInitial,
  isMasterAdmin = false,
  authorLabel,
  authorTitle = '',
  authorAvatarUrl = '',
  authorLinkedInUrl = '',
  authorXUrl = '',
  error: initialError,
  success: initialSuccess,
  backToAiHref,
}: PostEditorFormProps) {
  const router = useRouter();
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
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialValues?.featuredImageUrl ?? null
  );
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [previewError, setPreviewError] = useState('');
  const [formError, setFormError] = useState(initialError ?? '');
  const [formSuccess, setFormSuccess] = useState(initialSuccess ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const estimatedReadTime = useMemo(
    () => calculateReadTimeFromContent(mainContent),
    [mainContent]
  );
  const wordCount = useMemo(
    () => countWordsInContent(mainContent),
    [mainContent]
  );

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

  const buildPreviewBlog = useCallback(() => {
    const form = formRef.current;
    if (!form) return null;

    const formData = new FormData(form);
    const contentHtml = editorRef.current?.getHtml() ?? mainContent;

    return buildPreviewBlogFromEditor({
      title,
      slug,
      mainContent: contentHtml,
      authorKind: String(formData.get('author') || 'self'),
      userDisplayName: authorLabel,
      authorTitle,
      authorAvatarUrl,
      authorLinkedInUrl,
      authorXUrl,
      coverImageUrl,
      categoriesRaw: String(formData.get('categories') || ''),
      tagsRaw: String(formData.get('tags') || ''),
      postId: postId ? Number(postId) : undefined,
    });
  }, [
    authorAvatarUrl,
    authorLinkedInUrl,
    authorXUrl,
    authorLabel,
    authorTitle,
    coverImageUrl,
    mainContent,
    postId,
    slug,
    title,
  ]);

  const handlePreview = useCallback(() => {
    setPreviewError('');

    if (!title.trim()) {
      setPreviewError('Add a title before previewing.');
      return;
    }

    const contentHtml = editorRef.current?.getHtml() ?? mainContent;
    if (!contentHtml.trim() || isEmptyHtml(contentHtml)) {
      setPreviewError('Add main content before previewing.');
      return;
    }

    setViewMode('preview');
  }, [mainContent, title]);

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

  const closePreview = useCallback(() => {
    setViewMode('edit');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleDelete = async () => {
    if (!postId) return;

    setIsDeleting(true);
    setFormError('');

    try {
      const response = await fetch(`/admin/api/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      const data = await response.json().catch(() => null);

      if (response.status === 401) {
        window.location.href =
          '/admin/login?redirect=' +
          encodeURIComponent(`/admin/edit-post/${postId}`);
        return;
      }

      if (!response.ok) {
        setFormError(
          parsePayloadApiError(data, 'Unable to delete post. Please try again.')
        );
        setShowDeleteConfirm(false);
        return;
      }

      router.push(
        '/admin/post-management?success=' +
          encodeURIComponent('Post deleted successfully.')
      );
    } catch {
      setFormError('Network error. Check your connection and try again.');
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const defaultIntent =
    isEdit && initialValues?.published ? 'published' : 'draft';

  const previewBlog = viewMode === 'preview' ? buildPreviewBlog() : null;

  return (
    <>
      {viewMode === 'preview' && previewBlog ? (
        <PostPreviewExperience
          blog={previewBlog}
          slug={previewBlog.slug}
          isPublished={Boolean(initialValues?.published)}
          onClose={closePreview}
        />
      ) : null}

      <div className={viewMode === 'preview' ? styles.editorHidden : undefined}>
        <AdminPortalLayout
          userName={userName}
          userInitial={userInitial}
          isMasterAdmin={isMasterAdmin}
        >
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>
              {isEdit ? 'Edit Post' : 'Create New Post'}
            </h1>
            <div className={styles.headerActions}>
              {backToAiHref ? (
                <Link href={backToAiHref} className={styles.aiCompositionLink}>
                  <Sparkles size={16} />
                  AI Composition
                </Link>
              ) : null}
              <button
                type="submit"
                form="post-editor-form"
                className={styles.btnOutline}
                disabled={isSubmitting || isDeleting}
                onClick={() => setIntent('draft')}
              >
                <Save size={16} />
                {isSubmitting ? 'Saving…' : 'Save Draft'}
              </button>
              <button
                type="button"
                className={styles.btnOutline}
                onClick={handlePreview}
                disabled={isSubmitting || isDeleting}
              >
                <Eye size={16} />
                Preview
              </button>
              <button
                type="submit"
                form="post-editor-form"
                className={styles.btnPrimary}
                disabled={isSubmitting || isDeleting}
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
              {isEdit && postId ? (
                <button
                  type="button"
                  className={styles.btnDanger}
                  disabled={isSubmitting || isDeleting}
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              ) : null}
            </div>
          </div>

          {previewError ? (
            <p className={`${styles.alert} ${styles.alertError}`}>
              {previewError}
            </p>
          ) : null}

          {formError ? (
            <p className={`${styles.alert} ${styles.alertError}`}>
              {formError}
            </p>
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
            <input
              type="hidden"
              name="mainContent"
              value={mainContent}
              readOnly
            />
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
                  <span className={styles.label}>Estimated read time</span>
                  <p className={styles.readTimeValue}>{estimatedReadTime}</p>
                  <p className={styles.fieldHint}>
                    {wordCount.toLocaleString()} words at {BLOG_READING_WPM} WPM
                  </p>
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
                  onChange={({ url }) => setCoverImageUrl(url)}
                />
              </div>

              <div>
                <label className={styles.label}>Main Content</label>
                <p className={styles.fieldHint}>
                  Use <strong>Heading 1</strong> for each major section — you
                  can add as many as you need. Each one appears in the live post
                  sidebar as you scroll. Use Heading 2 or 3 for subheadings
                  inside a section. Insert images from your computer with the
                  image button in the toolbar.
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
        </AdminPortalLayout>
      </div>

      {showDeleteConfirm && isEdit ? (
        <div className={styles.modalBackdrop} role="presentation">
          <div className={styles.modal} role="dialog" aria-modal="true">
            <h2 className={styles.modalTitle}>Delete post?</h2>
            <p className={styles.modalText}>
              This permanently removes &ldquo;{title || 'this post'}&rdquo; from
              the CMS and the public blog. This cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.btnOutline}
                disabled={isDeleting}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.btnDanger}
                disabled={isDeleting}
                onClick={() => void handleDelete()}
              >
                {isDeleting ? 'Deleting…' : 'Delete post'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
