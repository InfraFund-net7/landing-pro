import SetPasswordForm from '@/app/(payload)/admin/components/set-password-form';
import { validateResetToken } from '@/lib/admin-reset-password.js';
import type { Metadata } from 'next';

type SetPasswordPageProps = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  title: 'Create your password | InfraFund',
  description: 'Set your InfraFund contributor account password.',
};

export default async function SetPasswordPage({
  params,
}: SetPasswordPageProps) {
  const { token } = await params;
  const validation = await validateResetToken(token);

  if (!validation.ok) {
    return (
      <SetPasswordForm
        token={token}
        invalid
        invalidMessage={validation.error}
      />
    );
  }

  return <SetPasswordForm token={token} email={validation.email} />;
}
