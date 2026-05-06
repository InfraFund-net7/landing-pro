import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-custom-pathname', request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: [
    '/((?!_next|admin|cms|api|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
