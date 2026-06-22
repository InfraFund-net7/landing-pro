'use client';

import AdminPortalLayout from '@/app/(payload)/admin/components/admin-portal-layout';
import type { AboutUsContributor } from '@/lib/about-us-cms';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import styles from '../create-post/create-post.module.css';

type AboutUsManagementPanelProps = {
  userName: string;
  userInitial: string;
};

type AboutUsFormState = {
  title: string;
  subtitle: string;
  contributors: AboutUsContributor[];
};

function emptyContributor(): AboutUsContributor {
  return {
    name: '',
    role: '',
    description: '',
    linkedin: '',
    imagePath: '',
  };
}

export default function AboutUsManagementPanel({
  userName,
  userInitial,
}: AboutUsManagementPanelProps) {
  const [form, setForm] = useState<AboutUsFormState>({
    title: 'InfraFund Contributors',
    subtitle: '',
    contributors: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/admin/api/about-us', {
        credentials: 'same-origin',
      });
      const data = (await response.json().catch(() => null)) as
        | (AboutUsFormState & { message?: string })
        | null;

      if (!response.ok) {
        setError(data?.message || 'Unable to load About Us content.');
        return;
      }

      if (data) {
        setForm({
          title: data.title,
          subtitle: data.subtitle,
          contributors: data.contributors,
        });
      }
    } catch {
      setError('Network error while loading About Us content.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  function updateContributor(
    index: number,
    patch: Partial<AboutUsContributor>
  ) {
    setForm((current) => ({
      ...current,
      contributors: current.contributors.map((contributor, contributorIndex) =>
        contributorIndex === index ? { ...contributor, ...patch } : contributor
      ),
    }));
  }

  function removeContributor(index: number) {
    setForm((current) => ({
      ...current,
      contributors: current.contributors.filter(
        (_, contributorIndex) => contributorIndex !== index
      ),
    }));
  }

  function addContributor() {
    setForm((current) => ({
      ...current,
      contributors: [...current.contributors, emptyContributor()],
    }));
  }

  async function uploadContributorPhoto(index: number, file: File) {
    setUploadingIndex(index);
    setError('');

    const formData = new FormData();
    formData.set('file', file);
    formData.set('alt', form.contributors[index]?.name || 'Contributor photo');

    try {
      const response = await fetch('/admin/api/media/upload', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData,
      });
      const data = (await response.json().catch(() => null)) as {
        message?: string;
        url?: string;
      } | null;

      if (!response.ok || !data?.url) {
        setError(data?.message || 'Unable to upload photo.');
        return;
      }

      updateContributor(index, {
        imagePath: data.url,
        imageUrl: data.url,
      });
    } catch {
      setError('Network error while uploading photo.');
    } finally {
      setUploadingIndex(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/admin/api/about-us', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setError(data?.message || 'Unable to save About Us content.');
        return;
      }

      setSuccess(data?.message || 'About Us content saved.');
      await loadContent();
    } catch {
      setError('Network error while saving About Us content.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminPortalLayout
      userName={userName}
      userInitial={userInitial}
      isMasterAdmin
    >
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>About Us</h1>
          <p className={styles.fieldHint} style={{ marginTop: 8 }}>
            Manage the contributors shown on the public About Us page. Changes
            appear on the live site after you save.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnOutline}
            onClick={() => addContributor()}
            disabled={loading || saving}
          >
            <Plus size={16} />
            Add contributor
          </button>
        </div>
      </div>

      {error ? (
        <p className={`${styles.alert} ${styles.alertError}`}>{error}</p>
      ) : null}
      {success ? (
        <p className={`${styles.alert} ${styles.alertSuccess}`}>{success}</p>
      ) : null}

      {loading ? (
        <div className={styles.formCard}>
          <p className={styles.fieldHint}>
            <Loader2 size={16} className={styles.spinIcon} /> Loading About Us
            content…
          </p>
        </div>
      ) : (
        <form
          className={styles.formCard}
          onSubmit={(event) => void handleSubmit(event)}
        >
          <div className={styles.formGrid}>
            <div>
              <label htmlFor="about-us-title" className={styles.label}>
                Section title
              </label>
              <input
                id="about-us-title"
                className={styles.field}
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                required
              />
            </div>

            <div>
              <label htmlFor="about-us-subtitle" className={styles.label}>
                Section subtitle
              </label>
              <textarea
                id="about-us-subtitle"
                className={styles.textarea}
                rows={3}
                value={form.subtitle}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    subtitle: event.target.value,
                  }))
                }
              />
            </div>

            {form.contributors.length === 0 ? (
              <p className={styles.fieldHint}>
                No contributors yet. Add your first contributor to get started.
              </p>
            ) : (
              form.contributors.map((contributor, index) => {
                const previewSrc =
                  contributor.imageUrl || contributor.imagePath || '';
                const contributorKey = `${contributor.name}-${index}`;

                return (
                  <div key={contributorKey} className={styles.contributorCard}>
                    <div className={styles.contributorCardHeader}>
                      <h2 className={styles.contributorCardTitle}>
                        Contributor {index + 1}
                      </h2>
                      <button
                        type="button"
                        className={styles.btnDanger}
                        onClick={() => removeContributor(index)}
                        disabled={saving}
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>

                    <div className={styles.contributorPhotoRow}>
                      <div className={styles.contributorPhotoPreview}>
                        {previewSrc ? (
                          <Image
                            src={previewSrc}
                            alt={contributor.name || 'Contributor photo'}
                            width={96}
                            height={96}
                            className={styles.contributorPhotoImage}
                            unoptimized
                          />
                        ) : (
                          <span className={styles.fieldHint}>No photo</span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor={`contributor-photo-${index}`}
                          className={styles.label}
                        >
                          Photo
                        </label>
                        <input
                          id={`contributor-photo-${index}`}
                          type="file"
                          accept="image/*"
                          className={styles.field}
                          disabled={uploadingIndex === index || saving}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              void uploadContributorPhoto(index, file);
                            }
                            event.target.value = '';
                          }}
                        />
                        {uploadingIndex === index ? (
                          <p className={styles.fieldHint}>
                            <Loader2 size={14} className={styles.spinIcon} />{' '}
                            Uploading…
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className={styles.contributorFieldsGrid}>
                      <div>
                        <label
                          htmlFor={`contributor-name-${index}`}
                          className={styles.label}
                        >
                          Name
                        </label>
                        <input
                          id={`contributor-name-${index}`}
                          className={styles.field}
                          value={contributor.name}
                          onChange={(event) =>
                            updateContributor(index, {
                              name: event.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`contributor-role-${index}`}
                          className={styles.label}
                        >
                          Role
                        </label>
                        <input
                          id={`contributor-role-${index}`}
                          className={styles.field}
                          value={contributor.role}
                          onChange={(event) =>
                            updateContributor(index, {
                              role: event.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className={styles.contributorFullWidthField}>
                        <label
                          htmlFor={`contributor-linkedin-${index}`}
                          className={styles.label}
                        >
                          LinkedIn URL
                        </label>
                        <input
                          id={`contributor-linkedin-${index}`}
                          className={styles.field}
                          value={contributor.linkedin}
                          onChange={(event) =>
                            updateContributor(index, {
                              linkedin: event.target.value,
                            })
                          }
                          placeholder="https://www.linkedin.com/in/..."
                        />
                      </div>
                      <div className={styles.contributorFullWidthField}>
                        <label
                          htmlFor={`contributor-description-${index}`}
                          className={styles.label}
                        >
                          Description
                        </label>
                        <textarea
                          id={`contributor-description-${index}`}
                          className={styles.textarea}
                          rows={3}
                          value={contributor.description}
                          onChange={(event) =>
                            updateContributor(index, {
                              description: event.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            <div className={styles.headerActions}>
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={saving || uploadingIndex !== null}
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className={styles.spinIcon} />
                    Saving…
                  </>
                ) : (
                  'Save changes'
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </AdminPortalLayout>
  );
}
