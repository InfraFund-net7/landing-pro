'use client';

import { Loader2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import styles from '../create-post/create-post.module.css';

export default function CreateUserPanel() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.set('email', email.trim());
    formData.set('fullName', fullName.trim());

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

      setSuccess(
        data?.message ||
          'Invite sent. The contributor will receive an email to create their password.'
      );
      setEmail('');
      setFullName('');
    } catch {
      setError('Network error while sending invite.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Create user</h1>
          <p className={styles.fieldHint}>
            Add a new contributor by name and email. They will receive an invite
            link to choose their own password — you do not set it here.
          </p>
        </div>
      </div>

      {error ? (
        <p className={`${styles.alert} ${styles.alertError}`}>{error}</p>
      ) : null}
      {success ? (
        <p className={`${styles.alert} ${styles.alertSuccess}`}>{success}</p>
      ) : null}

      <form
        className={styles.formCard}
        onSubmit={(event) => void handleSubmit(event)}
      >
        <div className={styles.formGrid}>
          <div>
            <label htmlFor="create-user-full-name" className={styles.label}>
              Full name
            </label>
            <input
              id="create-user-full-name"
              name="fullName"
              className={styles.field}
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="create-user-email" className={styles.label}>
              Email
            </label>
            <input
              id="create-user-email"
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

          <div className={styles.headerActions}>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className={styles.spinIcon} />
                  Sending invite…
                </>
              ) : (
                'Invite to join'
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
