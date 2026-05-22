/**
 * On Vercel, Payload Drizzle findOne for users+email often misses rows that exist in
 * payload.users (Neon HTTP sees them). Patch findOne to use HTTP for that lookup.
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
