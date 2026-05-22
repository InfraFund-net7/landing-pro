const PAYLOAD_VERCEL_KNOWN_USER_KEY = '__payloadVercelKnownHasUser';

export function markVercelKnownHasUser() {
  globalThis[PAYLOAD_VERCEL_KNOWN_USER_KEY] = true;
}

export function clearVercelKnownHasUser() {
  delete globalThis[PAYLOAD_VERCEL_KNOWN_USER_KEY];
}
