import { NextRequest } from 'next/server';
import { createNonResidentCompany } from '@/lib/landing-forms/non-resident-waitlist';
import {
  emptySuccess,
  requireCaptcha,
  runLandingPostRoute,
} from '@/lib/landing-api-route';

export async function POST(request: NextRequest) {
  return runLandingPostRoute(request, async () => {
    await requireCaptcha(request);
    const body = (await request.json()) as {
      first_name?: string;
      last_name?: string;
      email?: string;
      company_name?: string;
      country_id?: number;
    };

    await createNonResidentCompany({
      first_name: body.first_name ?? '',
      last_name: body.last_name ?? '',
      email: body.email ?? '',
      company_name: body.company_name ?? '',
      country_id: Number(body.country_id),
    });

    return emptySuccess();
  });
}
