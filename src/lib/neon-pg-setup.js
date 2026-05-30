/**
 * Neon serverless driver for Payload on Vercel.
 * poolQueryViaFetch: Pool.query over HTTPS (works from Vercel).
 * Interactive DB transactions (login session writes) use WebSocket and timeout on Vercel —
 * runtime patches skip transactions; create the first user locally (not on Vercel).
 */
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

if (process.env.VERCEL) {
  // Simple queries over HTTPS via pooled DATABASE_URL (no WebSocket transactions on Vercel).
  neonConfig.poolQueryViaFetch = true;
}
