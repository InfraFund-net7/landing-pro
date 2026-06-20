'use client';

import InfraFundLogo from '@/../public/svg/infrafund.svg';
import { Eye, EyeOff, Loader2, Mail, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import styles from '../reset/set-password.module.css';

type SetPasswordFormProps = {
  token: string;
  email?: string;
  fullName?: string;
  invalid?: boolean;
  invalidMessage?: string;
};

export default function SetPasswordForm({
  token,
  email,
  fullName,
  invalid = false,
  invalidMessage,
}: SetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(invalid ? invalidMessage || '' : '');
  const [success, setSuccess] = useState('');

  const displayName = fullName?.trim() || email || 'there';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (invalid) return;

    setSubmitting(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.set('token', token);
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);

    try {
      const response = await fetch('/admin/api/reset-password', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData,
      });
      const data = (await response.json().catch(() => null)) as {
        message?: string;
        redirectTo?: string;
      } | null;

      if (!response.ok) {
        setError(data?.message || 'Unable to set password. Please try again.');
        return;
      }

      setSuccess(data?.message || 'Password created successfully.');
      const redirectTo = data?.redirectTo || '/admin/create-post';
      window.setTimeout(() => {
        router.push(redirectTo);
        router.refresh();
      }, 700);
    } catch {
      setError('Network error while saving your password.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.brand}>
          <Image
            src={InfraFundLogo}
            alt="InfraFund"
            className={styles.logo}
            priority
          />
          <p className={styles.tagline}>Fast Financing Infrastructure</p>
        </div>

        <div className={styles.card}>
          {!invalid ? (
            <div className={styles.welcomeBanner}>
              <p className={styles.welcomeEyebrow}>Welcome to InfraFund</p>
              <h1 className={styles.welcomeTitle}>
                Hi {displayName}, glad you are here.
              </h1>
              <p className={styles.welcomeText}>
                You have been invited to join our blog team as a contributor.
                Create your password below to finish setting up your account.
              </p>
            </div>
          ) : (
            <>
              <h1 className={styles.title}>Invite link expired</h1>
              <p className={styles.subtitle}>
                This invite link is no longer valid. Ask your admin to send a
                new invite, or use forgot password if you already have an
                account.
              </p>
            </>
          )}

          {error ? (
            <p className={`${styles.alert} ${styles.alertError}`}>{error}</p>
          ) : null}
          {success ? (
            <p className={`${styles.alert} ${styles.alertSuccess}`}>
              {success}
            </p>
          ) : null}

          {!invalid ? (
            <>
              <div className={styles.accountDetails}>
                {fullName ? (
                  <div className={styles.detailBadge}>
                    <UserRound size={16} />
                    {fullName}
                  </div>
                ) : null}
                {email ? (
                  <div className={styles.detailBadge}>
                    <Mail size={16} />
                    {email}
                  </div>
                ) : null}
              </div>

              <form
                className={styles.form}
                onSubmit={(event) => void handleSubmit(event)}
              >
                <div>
                  <label htmlFor="password" className={styles.label}>
                    Password <span className={styles.required}>*</span>
                  </label>
                  <p className={styles.fieldHint}>Use at least 8 characters.</p>
                  <div className={styles.passwordWrap}>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className={styles.field}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      className={styles.toggleButton}
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm password <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.passwordWrap}>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={styles.field}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      className={styles.toggleButton}
                      onClick={() => setShowConfirmPassword((value) => !value)}
                      aria-label={
                        showConfirmPassword
                          ? 'Hide confirm password'
                          : 'Show confirm password'
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={submitting || Boolean(success)}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className={styles.spinIcon} />
                      Creating account…
                    </>
                  ) : (
                    'Create password and join'
                  )}
                </button>
              </form>
            </>
          ) : null}

          <div className={styles.footerLinks}>
            <Link href="/admin/login" className={styles.footerLink}>
              Back to sign in
            </Link>
            <Link href="/admin/forgot" className={styles.footerLink}>
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
