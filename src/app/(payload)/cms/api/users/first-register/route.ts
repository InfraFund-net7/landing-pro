import config from '@payload-config';
import { REST_POST } from '@payloadcms/next/routes';
import { NextResponse } from 'next/server';

const payloadPost = REST_POST(config);

/**
 * Payload first-register uses a DB transaction (Neon WebSocket). Unreliable on Vercel.
 * Block on Vercel with instructions; delegate to Payload locally.
 */
export async function POST(
  request: Request,
  _context: { params: Promise<{ slug?: string[] }> }
) {
  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        errors: [
          {
            message:
              'Create the first admin from your machine (Neon direct DATABASE_URL), then sign in at /admin/login. Run: npm run db:create-payload-admin — see docs/deploy-vercel.md',
          },
        ],
      },
      { status: 503 }
    );
  }

  return payloadPost(request, {
    params: Promise.resolve({ slug: ['users', 'first-register'] }),
  });
}
