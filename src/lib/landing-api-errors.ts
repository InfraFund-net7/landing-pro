import { NextResponse } from 'next/server';

export class LandingApiError extends Error {
  status: number;
  title: string;

  constructor(status: number, detail: string, title = 'Error') {
    super(detail);
    this.name = 'LandingApiError';
    this.status = status;
    this.title = title;
  }
}

function problemJson(
  status: number,
  detail: string,
  title = 'Error'
): NextResponse {
  return NextResponse.json(
    { title, detail, status },
    { status, headers: { 'Content-Type': 'application/problem+json' } }
  );
}

export function handleLandingRouteError(error: unknown): NextResponse {
  if (error instanceof LandingApiError) {
    return problemJson(error.status, error.message, error.title);
  }
  console.error('[landing-api]', error);
  return problemJson(500, 'Internal Server Error', 'Internal');
}
