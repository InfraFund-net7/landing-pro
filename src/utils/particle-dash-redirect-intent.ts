const STORAGE_KEY = 'infrafund_particle_dash_redirect_intent';

/** Call when the user explicitly starts Particle login (header or survey). */
export function markParticleDashRedirectIntent(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // storage blocked / private mode
  }
}

export function peekParticleDashRedirectIntent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function clearParticleDashRedirectIntent(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
