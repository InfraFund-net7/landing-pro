// Function to set a cookie that lasts for 7 days

export function setTokenCookie(token: string) {
  const days = 7;
  const secondsInDay = 86400;
  const maxAge = days * secondsInDay;

  // Set the cookie with security flags
  document.cookie = `access_token=${token}; Max-Age=${maxAge}; path=/; SameSite=Lax; Secure`;
}
