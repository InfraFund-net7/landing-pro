import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import pg from 'pg';
import { LandingApiError } from '@/lib/landing-api-errors';
import {
  isNeonDatabaseUrl,
  normalizePgConnectionString,
  pgSslOption,
} from '@/lib/postgres-pool-config';

type LandingSql = NeonQueryFunction<false, false>;

function resolveLandingDatabaseUrl(): string | null {
  return (process.env.DATABASE_URL ?? process.env.POSTGRES_URL)?.trim() ?? null;
}

let cachedPool: pg.Pool | null = null;
let cachedPoolUrl: string | null = null;

/** Tagged-template shim so callers can keep using `sql\`...\`` against a plain pg.Pool. */
function pgTag(pool: pg.Pool): LandingSql {
  const tag = (async (strings: TemplateStringsArray, ...values: unknown[]) => {
    let text = strings[0];
    for (let i = 0; i < values.length; i++) {
      text += `$${i + 1}${strings[i + 1]}`;
    }
    const { rows } = await pool.query(text, values);
    return rows;
  }) as LandingSql;
  return tag;
}

/** Non-Neon Postgres (self-hosted, Azure, etc.) — the Neon HTTP driver only works against Neon hosts. */
function getPgPool(url: string): pg.Pool {
  if (cachedPool && cachedPoolUrl === url) return cachedPool;
  cachedPool?.end().catch(() => {});
  const normalized = normalizePgConnectionString(url);
  cachedPool = new pg.Pool({
    connectionString: normalized,
    ssl: pgSslOption(normalized),
    max: 5,
  });
  cachedPoolUrl = url;
  return cachedPool;
}

export function getLandingSql(): LandingSql {
  const url = resolveLandingDatabaseUrl();
  if (!url) {
    throw new LandingApiError(
      503,
      'Form storage is not configured (set DATABASE_URL or POSTGRES_URL).',
      'Unavailable'
    );
  }
  if (isNeonDatabaseUrl(url)) {
    return neon(url);
  }
  return pgTag(getPgPool(url));
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
