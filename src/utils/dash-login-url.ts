/** Dashboard login URL (Particle / app login). Set NEXT_PUBLIC_DASH_LOGIN_URL in .env.local */
export function getDashLoginUrl(): string {
  return (
    process.env.NEXT_PUBLIC_DASH_LOGIN_URL ??
    'http://dash.infrafund.test:3001/login'
  );
}
