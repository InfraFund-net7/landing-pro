import { neon } from '@neondatabase/serverless';
import { LandingApiError } from '@/lib/landing-api-errors';

function resolveLandingDatabaseUrl(): string | null {
  return (process.env.DATABASE_URL ?? process.env.POSTGRES_URL)?.trim() ?? null;
}

export function getLandingSql() {
  const url = resolveLandingDatabaseUrl();
  if (!url) {
    throw new LandingApiError(
      503,
      'Form storage is not configured (set DATABASE_URL or POSTGRES_URL).',
      'Unavailable'
    );
  }
  return neon(url);
}

export function isPgErrorCode(error: unknown, code: string): boolean {
  if (!error || typeof error !== 'object') return false;
  const pgCode = (error as { code?: string }).code;
  if (pgCode === code) return true;
  const message = (error as { message?: string }).message ?? '';
  if (code === '23505' && /duplicate key|unique constraint/i.test(message)) {
    return true;
  }
  if (code === '23503' && /foreign key|violates foreign key/i.test(message)) {
    return true;
  }
  return false;
}
