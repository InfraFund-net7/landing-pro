/**
 * Vercel + Neon runtime fixes for Payload:
 * - findOne(users): Drizzle often misses rows; use Neon HTTP (same as user probe).
 * - beginTransaction: WebSocket transactions timeout; login runs without a DB transaction.
 */
import {
  extractEmailEqualsFromWhere,
  extractIdEqualsFromWhere,
  findPayloadUserByEmailViaNeon,
  findPayloadUserByIdViaNeon,
} from './neon-payload-user-by-email.js';

/** @param {import('payload').Payload} payload */
export function patchPayloadDbFindOneOnVercel(payload) {
  if (!process.env.VERCEL) return;

  if (typeof payload.db.beginTransaction === 'function') {
    payload.db.beginTransaction = async () => {
      // poolQueryViaFetch handles single queries; drizzle.transaction uses WebSocket and times out.
      return null;
    };
  }

  const originalFindOne = payload.db.findOne.bind(payload.db);

  payload.db.findOne = async (args) => {
    if (args.collection === 'users') {
      const email = extractEmailEqualsFromWhere(args.where);
      if (email) {
        const doc = await findPayloadUserByEmailViaNeon(email);
        if (doc) return doc;
        console.warn(
          `[payload] vercel users findOne: neon HTTP miss for email=${email}`
        );
      }

      const id = extractIdEqualsFromWhere(args.where);
      if (id != null) {
        const doc = await findPayloadUserByIdViaNeon(id);
        if (doc) return doc;
      }
    }
    return originalFindOne(args);
  };
}
