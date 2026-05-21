/**
 * Configure Neon serverless driver WebSockets for Node (Vercel serverless).
 * Import once before Payload opens a Pool (see payload.config.js).
 */
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
