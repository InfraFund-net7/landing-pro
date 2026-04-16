export function getServerUrl(url: string | undefined) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl || !baseUrl.trim()) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL is missing. Set it in .env.local (e.g. http://localhost:8080/v1).'
    );
  }
  const normalizedBase = baseUrl.replace(/\/+$/, '');
  const normalizedPath = (url ?? '').replace(/^\/+/, '');
  return `${normalizedBase}/${normalizedPath}`;
}
