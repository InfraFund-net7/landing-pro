export function getAccessToken(): string | null {
  const access_token =
    localStorage.getItem('access_token') ?? localStorage.getItem('accessToken');
  console.log(`Access token from accessToken() ${access_token}`);
  return access_token ?? null;
}
