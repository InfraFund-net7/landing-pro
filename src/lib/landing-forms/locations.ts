import { getLandingSql } from '@/lib/landing-db';

type CountryRow = {
  ID: number;
  Name: string;
  Iso: string;
  Iso3: string;
  Code: number;
  PhoneCode: number;
};

export async function listCountries(options: {
  query?: string;
  offset?: number;
  limit?: number;
}): Promise<{ items: CountryRow[] }> {
  const query = options.query?.trim() ?? '';
  const offset = Math.max(0, options.offset ?? 0);
  const limit = Math.min(500, Math.max(1, options.limit ?? 300));

  const sql = getLandingSql();

  const rows = query
    ? await sql`
        SELECT id, name, iso, iso3, code, phone_code
        FROM public.countries
        WHERE name ILIKE ${'%' + query + '%'}
        ORDER BY name
        LIMIT ${limit} OFFSET ${offset}
      `
    : await sql`
        SELECT id, name, iso, iso3, code, phone_code
        FROM public.countries
        ORDER BY name
        LIMIT ${limit} OFFSET ${offset}
      `;

  const items: CountryRow[] = rows.map((row) => ({
    ID: Number(row.id),
    Name: String(row.name),
    Iso: String(row.iso),
    Iso3: row.iso3 == null ? '' : String(row.iso3),
    Code: row.code == null ? 0 : Number(row.code),
    PhoneCode: Number(row.phone_code),
  }));

  return { items };
}
