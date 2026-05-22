/**
 * Neon serverless driver for Payload on Vercel.
 * poolQueryViaFetch: Pool.query over HTTPS (works from Vercel).
 * Transactions (e.g. register first user) still use WebSocket — create the first user locally instead.
 */
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

if (process.env.VERCEL) {
  // Simple queries over HTTPS via pooled DATABASE_URL; login transactions use WebSocket through pooler.
  neonConfig.poolQueryViaFetch = true;
}
