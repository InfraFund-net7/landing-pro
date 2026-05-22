import { LandingApiError } from '@/lib/landing-api-errors';
import { getLandingSql, isPgErrorCode } from '@/lib/landing-db';

type IndividualInput = {
  first_name: string;
  last_name: string;
  email: string;
  country_id: number;
};

type CompanyInput = IndividualInput & {
  company_name: string;
};

export async function createNonResidentIndividual(
  input: IndividualInput
): Promise<void> {
  await insertNonResident({
    firstName: input.first_name,
    lastName: input.last_name,
    email: input.email,
    countryId: input.country_id,
    companyName: null,
    type: 'individual',
  });
}

export async function createNonResidentCompany(
  input: CompanyInput
): Promise<void> {
  await insertNonResident({
    firstName: input.first_name,
    lastName: input.last_name,
    email: input.email,
    countryId: input.country_id,
    companyName: input.company_name,
    type: 'company',
  });
}

async function insertNonResident(args: {
  firstName: string;
  lastName: string;
  email: string;
  countryId: number;
  companyName: string | null;
  type: 'individual' | 'company';
}): Promise<void> {
  const firstName = args.firstName?.trim();
  const lastName = args.lastName?.trim();
  const email = args.email?.trim().toLowerCase();
  const companyName = args.companyName?.trim() || null;
  const countryId = Number(args.countryId);

  if (!firstName || !lastName || !email) {
    throw new LandingApiError(
      400,
      'Required fields are missing.',
      'Validation'
    );
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new LandingApiError(
      400,
      'Please enter a valid email address.',
      'Validation'
    );
  }
  if (!Number.isInteger(countryId) || countryId < 1) {
    throw new LandingApiError(400, 'invalid country ID', 'Bad Request');
  }
  if (args.type === 'company' && !companyName) {
    throw new LandingApiError(400, 'company_name is required.', 'Validation');
  }

  const sql = getLandingSql();

  try {
    await sql`
      INSERT INTO public.non_resident_waitlists (
        first_name,
        last_name,
        company_name,
        email,
        country_id,
        type
      )
      VALUES (
        ${firstName},
        ${lastName},
        ${companyName},
        ${email},
        ${countryId},
        ${args.type}::non_resident_waitlist_type
      )
    `;
  } catch (error) {
    if (isPgErrorCode(error, '23505')) {
      throw new LandingApiError(409, 'email already exists', 'Conflict');
    }
    if (isPgErrorCode(error, '23503')) {
      throw new LandingApiError(400, 'invalid country ID', 'Bad Request');
    }
    throw error;
  }
}
