/**
 * Neon driver for Payload on Vercel: prefer HTTP fetch for Pool queries (avoids
 * WebSocket hangs). WebSocket constructor remains a fallback for sessions.
 */
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

if (process.env.VERCEL) {
  // Pool.query over HTTPS — more reliable than WS on serverless (see Neon CONFIG.md).
  neonConfig.poolQueryViaFetch = true;
}
