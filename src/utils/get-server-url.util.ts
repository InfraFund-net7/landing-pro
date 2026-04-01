export function getServerUrl(url: string | undefined) {
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url ?? ''}`;
}
