import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { getServerUrl } from '@/utils/get-server-url.util';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const headers = await request.headers;
  const captcha_token =
    headers.get('x-captcha-token') ?? headers.get('X-Captcha-Token');
  if (!captcha_token || !captcha_token.trim()) {
    return NextResponse.json(
      { message: 'Captcha is required. Please try again.' },
      { status: 400 }
    );
  }

  const url_server = getServerUrl(`waitlists`);
  console.log(`Captcha Token: ${captcha_token}`);
  console.log(`URL Server: ${url_server}`);
  return await axios
    .post(url_server, payload, {
      headers: {
        // Match backend docs: only captcha + JSON/problem+json headers.
        'X-Captcha-Token': captcha_token,
        'Content-Type': 'application/json',
        Accept: 'application/problem+json',
      },
    })
    .then(({ data }) => {
      return NextResponse.json(data);
    })
    .catch((error) => {
      const status = error?.response?.status ?? 500;
      const data = error?.response?.data ?? {
        message: error?.message ?? 'Internal Server Error',
      };
      return NextResponse.json(data, { status });
    });
}
