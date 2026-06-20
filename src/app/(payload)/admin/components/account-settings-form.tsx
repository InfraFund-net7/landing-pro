'use client';

import AdminPortalLayout from '@/app/(payload)/admin/components/admin-portal-layout';
import { cmsImageNeedsUnoptimized } from '@/lib/cms-next-image';
import { parsePayloadApiError } from '@/lib/admin-post-form-utils.js';
import { Upload, User, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, type FormEvent } from 'react';
import styles from '../create-post/create-post.module.css';

type AccountProfileValues = {
  email: string;
  fullName: string;
  jobTitle: string;
  profilePhotoId?: number | null;
  profilePhotoUrl?: string | null;
};

type AccountSettingsFormProps = {
  userName: string;
  userInitial: string;
  initialValues: AccountProfileValues;
  error?: string;
  success?: string;
};

export default function AccountSettingsForm({
  userName,
  userInitial,
  initialValues,
  error: initialError,
  success: initialSuccess,
}: AccountSettingsFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(initialValues.fullName || userName);
  const [jobTitle, setJobTitle] = useState(initialValues.jobTitle ?? '');
  const [previewUrl, setPreviewUrl] = useState(
    initialValues.profilePhotoUrl ?? null
  );
  const [mediaId, setMediaId] = useState<number | null>(
    initialValues.profilePhotoId ?? null
  );
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState(initialError ?? '');
  const [formSuccess, setFormSuccess] = useState(initialSuccess ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickFile = () => {
    setFormError('');
    inputRef.current?.click();
  };

  const clearPhoto = () => {
    setPreviewUrl(null);
    setMediaId(null);
    setFormError('');
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setFormError('Only image files are supported.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'alt',
      `${fullName || userName} profile photo`.trim() || 'Profile photo'
    );

    setUploading(true);
    setFormError('');

    try {
      const response = await fetch('/admin/api/media/upload', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData,
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.url || data?.id == null) {
        setFormError(
          typeof data?.message === 'string'
            ? data.message
            : 'Unable to upload profile photo. Please try again.'
        );
        return;
      }

      setPreviewUrl(String(data.url));
      setMediaId(Number(data.id));
    } catch {
      setFormError('Network error while uploading profile photo.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!fullName.trim()) {
      setFormError('Full name is required.');
      return;
    }

    const formData = new FormData();
    formData.set('fullName', fullName.trim());
    formData.set('jobTitle', jobTitle.trim());
    formData.set('profilePhotoId', mediaId != null ? String(mediaId) : '');

    setIsSubmitting(true);

    try {
      const response = await fetch('/admin/api/account', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData,
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setFormError(parsePayloadApiError(data, 'Unable to save profile.'));
        return;
      }

      setFormSuccess('Profile updated successfully.');
    } catch {
      setFormError('Network error while saving profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminPortalLayout userName={userName} userInitial={userInitial}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Account Settings</h1>
          <p className={styles.fieldHint}>
            Update how your name, title, and photo appear on blog posts you
            author.
          </p>
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

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>Profile photo</label>
            <div className={styles.coverField}>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className={styles.coverFileInput}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handleFile(file);
                  event.target.value = '';
                }}
              />
              {previewUrl ? (
                <>
                  <div className={styles.profilePhotoPreview}>
                    <Image
                      src={previewUrl}
                      alt={fullName || userName}
                      fill
                      unoptimized={cmsImageNeedsUnoptimized(previewUrl)}
                      className={styles.coverPreviewImg}
                      sizes="160px"
                    />
                  </div>
                  <div className={styles.profilePhotoActions}>
                    <button
                      type="button"
                      className={styles.btnOutline}
                      onClick={pickFile}
                      disabled={uploading}
                    >
                      <Upload size={16} />
                      {uploading ? 'Uploading…' : 'Replace'}
                    </button>
                    <button
                      type="button"
                      className={styles.coverRemoveBtn}
                      onClick={clearPhoto}
                      disabled={uploading}
                      aria-label="Remove profile photo"
                    >
                      <X size={16} />
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  className={`${styles.coverUploadZone} ${styles.profilePhotoUploadZone}`}
                  onClick={pickFile}
                  disabled={uploading}
                >
                  <User size={32} />
                  <span className={styles.coverUploadTitle}>
                    {uploading ? 'Uploading…' : 'Upload photo'}
                  </span>
                  <span className={styles.coverUploadHint}>No photo yet</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              className={styles.field}
              value={initialValues.email}
              readOnly
              disabled
            />
          </div>

          <div>
            <label htmlFor="fullName" className={styles.label}>
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              className={styles.field}
              placeholder="Dr. Yifeng Tian"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="jobTitle" className={styles.label}>
              Job title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              className={styles.field}
              placeholder="Head of Research and Development"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
            />
          </div>

          <div className={styles.headerActions}>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={isSubmitting || uploading}
            >
              {isSubmitting ? 'Saving…' : 'Save profile'}
            </button>
          </div>
        </div>
      </form>
    </AdminPortalLayout>
  );
}
