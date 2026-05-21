/**
 * Neon serverless driver for Payload: WebSocket sessions for transactions (register user, etc.).
 * Import before Payload opens a Pool (see payload.config.js).
 */
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

// Do not set poolQueryViaFetch: true — Payload/Drizzle transactions need a WebSocket session.
// (Simple queries can use fetch; beginTransaction always connects over WS and timed out at 30s.)
