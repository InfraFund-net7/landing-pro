'use client';

import { Loader2, UserPlus } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import styles from '../create-post/create-post.module.css';

export default function InviteContributorButton() {
  const [canInvite, setCanInvite] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadPermission() {
      try {
        const response = await fetch('/admin/api/invite-contributor', {
          credentials: 'same-origin',
        });
        if (!response.ok) return;
        const data = (await response.json()) as { canInvite?: boolean };
        if (!cancelled) {
          setCanInvite(Boolean(data.canInvite));
        }
      } catch {
        // Ignore background permission check errors.
      }
    }

    void loadPermission();
    return () => {
      cancelled = true;
    };
  }, []);

  function resetForm() {
    setEmail('');
    setFullName('');
    setJobTitle('');
    setError('');
    setSuccess('');
  }

  function closeModal() {
    setOpen(false);
    resetForm();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.set('email', email.trim());
    formData.set('fullName', fullName.trim());
    formData.set('jobTitle', jobTitle.trim());

    try {
      const response = await fetch('/admin/api/invite-contributor', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData,
      });
      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setError(data?.message || 'Unable to send invite. Please try again.');
        return;
      }

      setSuccess(data?.message || 'Invite sent.');
      setEmail('');
      setFullName('');
      setJobTitle('');
    } catch {
      setError('Network error while sending invite.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!canInvite) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={styles.inviteNavButton}
        onClick={() => {
          setOpen(true);
          setError('');
          setSuccess('');
        }}
      >
        <UserPlus size={20} strokeWidth={1.75} />
        Invite contributor
      </button>

      {open ? (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <form
            className={`${styles.modal} ${styles.inviteModal}`}
            onSubmit={(event) => void handleSubmit(event)}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>Invite contributor</h2>
            <p className={styles.modalText}>
              Send an email invite so a contributor can set their password and
              start writing blog posts.
            </p>

            {error ? (
              <p className={`${styles.alert} ${styles.alertError}`}>{error}</p>
            ) : null}
            {success ? (
              <p className={`${styles.alert} ${styles.alertSuccess}`}>
                {success}
              </p>
            ) : null}

            <div className={styles.inviteModalFields}>
              <div>
                <label htmlFor="invite-email" className={styles.label}>
                  Email
                </label>
                <input
                  id="invite-email"
                  name="email"
                  type="email"
                  className={styles.field}
                  placeholder="contributor@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="invite-full-name" className={styles.label}>
                  Full name
                </label>
                <input
                  id="invite-full-name"
                  name="fullName"
                  className={styles.field}
                  placeholder="Dr. Yifeng Tian"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="invite-job-title" className={styles.label}>
                  Job title
                </label>
                <input
                  id="invite-job-title"
                  name="jobTitle"
                  className={styles.field}
                  placeholder="Head of Research and Development"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                />
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.btnOutline}
                onClick={closeModal}
                disabled={submitting}
              >
                {success ? 'Close' : 'Cancel'}
              </button>
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className={styles.spinIcon} />
                    Sending…
                  </>
                ) : (
                  'Send invite'
                )}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
