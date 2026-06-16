'use client';

import { cmsImageNeedsUnoptimized } from '@/lib/cms-next-image';
import { ImageIcon, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from '../create-post/create-post.module.css';

type PostCoverImagePickerProps = {
  initialImageUrl?: string | null;
  initialMediaId?: number | null;
  onChange?: (value: { mediaId: number | null; url: string | null }) => void;
};

export default function PostCoverImagePicker({
  initialImageUrl = null,
  initialMediaId = null,
  onChange,
}: PostCoverImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl ?? null);
  const [mediaId, setMediaId] = useState<number | null>(initialMediaId ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const updateCover = (nextMediaId: number | null, nextUrl: string | null) => {
    setPreviewUrl(nextUrl);
    setMediaId(nextMediaId);
    onChange?.({ mediaId: nextMediaId, url: nextUrl });
  };

  const pickFile = () => {
    setError('');
    inputRef.current?.click();
  };

  const clearCover = () => {
    updateCover(null, null);
    setError('');
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Only image files are supported.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'alt',
      file.name.replace(/\.[^.]+$/, '') || 'Post cover image'
    );

    setUploading(true);
    setError('');

    try {
      const response = await fetch('/admin/api/media/upload', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData,
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.url || data?.id == null) {
        setError(
          typeof data?.message === 'string'
            ? data.message
            : 'Unable to upload cover image. Please try again.'
        );
        return;
      }

      updateCover(Number(data.id), String(data.url));
    } catch {
      setError('Network error while uploading cover image.');
    } finally {
      setUploading(false);
    }
  };

  return (
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
      <input
        type="hidden"
        name="featuredImageId"
        value={mediaId != null ? String(mediaId) : ''}
      />

      {previewUrl ? (
        <div className={styles.coverPreview}>
          <Image
            src={previewUrl}
            alt="Post cover preview"
            fill
            unoptimized={cmsImageNeedsUnoptimized(previewUrl)}
            className={styles.coverPreviewImg}
            sizes="(max-width: 900px) 100vw, 720px"
          />
          <div className={styles.coverPreviewActions}>
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
              onClick={clearCover}
              disabled={uploading}
              aria-label="Remove cover image"
            >
              <X size={16} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={styles.coverUploadZone}
          onClick={pickFile}
          disabled={uploading}
        >
          <ImageIcon size={28} strokeWidth={1.5} />
          <span className={styles.coverUploadTitle}>
            {uploading ? 'Uploading cover…' : 'Upload cover image'}
          </span>
          <span className={styles.coverUploadHint}>
            Shown on the blog listing card (recommended 16:9, at least 1200px
            wide).
          </span>
        </button>
      )}

      {error ? <p className={styles.coverError}>{error}</p> : null}
    </div>
  );
}
