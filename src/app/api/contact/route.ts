import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { getServerUrl } from '@/utils/get-server-url.util';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const headers = request.headers;

  return await axios
    .post(getServerUrl('contact-forms'), payload, {
      headers: {
        Authorization: headers.get('Authorization') ?? '',
        'X-Captcha-Token': headers.get('X-Captcha-Token') ?? '',
      },
    })
    .then(({ data }) => NextResponse.json(data))
    .catch(({ response }) =>
      NextResponse.json(response.data, { status: response.status })
    );
}
