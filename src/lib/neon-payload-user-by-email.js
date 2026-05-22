/**
 * Load a Payload users row over Neon HTTP (works on Vercel). Drizzle findOne often
 * returns null for the same DB where `SELECT … FROM payload.users` succeeds.
 *
 * Do not import postgres-pool-config (pulls in pg → fs).
 */
import { neon } from '@neondatabase/serverless';

/** @param {string} [connectionString] */
function resolveNeonConnectionString(connectionString) {
  return (
    connectionString ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL
  )?.trim();
}

/** @param {Record<string, unknown>} row */
function mapPayloadUserRow(row) {
  /** @type {Record<string, unknown>} */
  const doc = {};
  for (const [key, value] of Object.entries(row)) {
    const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    doc[camel] = value;
  }
  return doc;
}

/**
 * @param {string} email
 * @param {string} [connectionString]
 */
export async function findPayloadUserByEmailViaNeon(email, connectionString) {
  const url = resolveNeonConnectionString(connectionString);
  if (!url?.includes('.neon.tech')) return null;

  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  try {
    const sql = neon(url);
    const rows = await sql`
      SELECT *
      FROM payload.users
      WHERE email = ${normalized}
      LIMIT 1
    `;
    const row = rows[0];
    if (!row) return null;
    return mapPayloadUserRow(row);
  } catch (err) {
    console.warn(
      '[payload] neon user-by-email lookup failed:',
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

/**
 * @param {string | number} id
 * @param {string} [connectionString]
 */
export async function findPayloadUserByIdViaNeon(id, connectionString) {
  const url = resolveNeonConnectionString(connectionString);
  if (!url?.includes('.neon.tech')) return null;

  try {
    const sql = neon(url);
    const rows = await sql`
      SELECT *
      FROM payload.users
      WHERE id = ${id}
      LIMIT 1
    `;
    const row = rows[0];
    if (!row) return null;
    return mapPayloadUserRow(row);
  } catch (err) {
    console.warn(
      '[payload] neon user-by-id lookup failed:',
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

/**
 * @param {import('payload').Where} [where]
 * @returns {string | null}
 */
export function extractEmailEqualsFromWhere(where) {
  if (!where || typeof where !== 'object') return null;
  const email = where.email;
  if (email && typeof email === 'object' && 'equals' in email) {
    const value = email.equals;
    if (typeof value === 'string') return value;
  }
  return null;
}

/**
 * @param {import('payload').Where} [where]
 * @returns {string | number | null}
 */
export function extractIdEqualsFromWhere(where) {
  if (!where || typeof where !== 'object') return null;
  const id = where.id;
  if (id && typeof id === 'object' && 'equals' in id) {
    const value = id.equals;
    if (typeof value === 'string' || typeof value === 'number') return value;
  }
  return null;
}
