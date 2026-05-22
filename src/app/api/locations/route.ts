import { NextRequest, NextResponse } from 'next/server';
import { listCountries } from '@/lib/landing-forms/locations';
import { handleLandingRouteError } from '@/lib/landing-api-errors';

export const revalidate = 86400;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') ?? '';
    const offset = Number.parseInt(searchParams.get('offset') ?? '0', 10);
    const limit = Number.parseInt(searchParams.get('limit') ?? '300', 10);

    const data = await listCountries({
      query,
      offset: Number.isNaN(offset) ? 0 : offset,
      limit: Number.isNaN(limit) ? 300 : limit,
    });

    return NextResponse.json({
      code: 'OK',
      data,
    });
  } catch (error) {
    return handleLandingRouteError(error);
  }
}
