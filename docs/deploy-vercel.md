# Deploy on Vercel (`main` and `develop`)

All deploys go through **Vercel Git integration** — no GitHub Actions Docker build for landing.

| Branch | Deploy |
|--------|--------|
| `main` | Vercel **Production** |
| `develop` | Vercel **Preview** (e.g. `beta.infrafund.net`) |

GitHub Actions runs **CI only** (`ci.yml`: lint/format on push/PR).

## One-time Vercel setup

1. [vercel.com/new](https://vercel.com/new) → Import **InfraFund-net7/landing-pro**.
2. **Settings → Git → Production Branch** = **`main`**.
3. Add environment variables (below) for **Production** and **Preview**.
4. **Settings → Domains** → assign domains (e.g. `infrafund.net` → Production, `beta.infrafund.net` → Preview).

Every push to the linked branch triggers a Vercel deployment.

## Performance (marketing pages)

Marketing routes use **ISR** (`revalidate: 60`). Home and blog load from Payload when `DATABASE_URL` is set; site pages stay handcrafted unless opted in:

| Variable | When set to `1` |
|----------|------------------|
| `CMS_REPLACE_EXISTING_PAGES` | Fetch **site-pages** from CMS and allow replacement UI |
| `CMS_FETCH_HOME_PAGE=0` | Disable **home-page** global from Payload (use handcrafted fallbacks) |
| (blog) | Posts load from Payload when `DATABASE_URL` is set; `CMS_USE_MOCK_BLOG=1` forces mock data |

Saving the **Home Page** global revalidates `/` immediately. Other marketing pages may take up to 60s unless you add similar hooks.

`/admin` always uses the database.

## Neon: disable scale-to-zero (beta / faster first hit)

In [Neon console](https://console.neon.tech) → your project → branch used by beta → **Settings**:

- Turn off **Scale to zero** (or set a longer suspend delay).

Otherwise the first request after idle waits for the compute to wake (slow `/admin` and CMS-backed pages).

## Environment variables (Vercel dashboard)

### Vercel + Neon integration (your setup)

Neon adds `POSTGRES_URL`, `DATABASE_URL_UNPOOLED`, `PGHOST`, etc. **landing-pro only needs two database-related names at runtime:**

| You must have | Value |
|---------------|--------|
| `DATABASE_URL` **or** `POSTGRES_URL` | Same as Neon **pooled** URL (`POSTGRES_URL` in the integration — hostname contains `-pooler`) |
| `PAYLOAD_SECRET` | ≥32 characters; **same** value you use when running `npm run db:create-payload-admin` locally |

The app reads `DATABASE_URL` first; if it is missing, it uses `POSTGRES_URL` automatically. You do **not** need to copy `DATABASE_URL_UNPOOLED`, `PGHOST`, or `POSTGRES_PRISMA_URL` for Payload — those are for other tools.

Also set manually (not from Neon): `PAYLOAD_PUBLIC_SERVER_URL`, `INFRA_CONTACT_FORM_SMTP_*`, `NEXT_PUBLIC_*` (see tables below).

**Preview vs Production:** In Vercel, confirm Neon linked **Preview** and **Production** to the branch you bootstrapped. If Preview uses a different branch than where you created the admin user, login will fail even with the right password.

### Production (`main`)

| Variable | Notes |
|----------|--------|
| `DATABASE_URL` or `POSTGRES_URL` | Neon **pooled** URL (`-pooler` host), `?sslmode=verify-full` |
| `PAYLOAD_SECRET` | ≥32 chars |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://infrafund.net` (www and non-www are both allowed for CSRF after deploy) |
| `INFRA_CONTACT_FORM_SMTP_HOST` | Same as backpro (e.g. Office365 / SendGrid SMTP host) |
| `INFRA_CONTACT_FORM_SMTP_PORT` | Usually `587` or `465` |
| `INFRA_CONTACT_FORM_SMTP_SENDER` | From address (must be allowed by your SMTP provider) |
| `INFRA_CONTACT_FORM_SMTP_PASSWORD` | SMTP password (Vercel **Secret**) |
| `INFRA_CONTACT_FORM_SMTP_USERNAME` | Optional; defaults to `SENDER` |
| `INFRA_CONTACT_FORM_SMTP_REQUIRE_TLS` | `true` for port 587 (TLS) |
| `RECAPTCHA_SECRET` or `INFRA_REST_RECAPTCHA_GOOGLE_SECRET` | Same **secret** as backpro (`GOOGLE_RECAPTCHA_SECRET` / `INFRA_REST_RECAPTCHA_GOOGLE_SECRET`) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | **Required** — matching **site** key from the same reCAPTCHA v3 app (baked in at build; redeploy after change) |
| `INFRA_CONTACT_FORM_RECEIVER` | Team inbox for waitlist/contact notifications |
| `NEXT_PUBLIC_DASH_LOGIN_URL` | `https://dashboard.infrafund.net/login` |
| `SKIP_PAYLOAD_FETCH_AT_BUILD` | `1` (optional; build skips CMS without it too) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (CMS media uploads) |

### Preview (`develop`, `beta.infrafund.net`)

| Variable | Notes |
|----------|--------|
| `DATABASE_URL` or `POSTGRES_URL` | Neon **pooled** URL for runtime; **direct** URL only for local `npm run db:bootstrap:payload` |
| `PAYLOAD_SECRET` | Same as other envs |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://beta.infrafund.net` |
| `INFRA_CONTACT_FORM_SMTP_*` | Same as Production (forgot-password on `/admin/forgot`) |
| `RECAPTCHA_SECRET` or `INFRA_REST_RECAPTCHA_GOOGLE_SECRET` | Same secret as Production / backpro |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Same site key as Production (redeploy Preview after change) |
| `INFRA_CONTACT_FORM_RECEIVER` | Same as Production |
| `NEXT_PUBLIC_DASH_LOGIN_URL` | Dev dashboard login |
| `SKIP_PAYLOAD_FETCH_AT_BUILD` | `1` (optional) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (CMS media uploads) |

Optional CMS: `CMS_REPLACE_EXISTING_PAGES`. Home page uses Payload when `DATABASE_URL` is set.

### Seed CMS content (once per Neon branch)

From your machine (Neon **direct** or pooled URL in `.env.local`):

```bash
npm run db:bootstrap:payload
npm run seed:all
```

This loads home page global, site pages, and blog posts (with images from `public/image/`). Re-run with `npm run seed:all -- --force` to update existing slugs.

**Media must use Vercel Blob when the DB is Neon:** copy `BLOB_READ_WRITE_TOKEN` from Vercel → Storage → your Blob store into `.env.local` (or export it in the shell) **before** `npm run seed:all`. Without it, seed only writes media **rows** to Neon and saves files under `media/` on your machine — `/admin` on Vercel shows empty thumbnails. After adding the token, run `npm run seed:all -- --force` to re-upload binaries to Blob (or delete broken media in `/admin` first).

### Vercel Blob (CMS images)

1. Vercel project → **Storage** → Create **Blob** store → link to `landing-pro`.
2. For marketing/CMS images, create the store with **Public** access (Payload defaults to public uploads). Access mode cannot be changed after creation.
3. If the store is **Private**, set `BLOB_STORAGE_ACCESS=private` on Vercel and locally when seeding. Set `PAYLOAD_PUBLIC_SERVER_URL` to your site origin (e.g. `https://beta.infrafund.net`) so admin thumbnails use `/cms/api/media/file/…`. The app serves private blobs via the Vercel SDK `get()` API (public `fetch()` to `*.private.blob` URLs does not work).
4. If the store is **Public** (recommended for marketing images), **do not** set `BLOB_STORAGE_ACCESS=private`. Blog and CMS pages use direct `https://<store>.public.blob.vercel-storage.com/…` URLs so images work even when Preview is behind Vercel Deployment Protection.
5. `BLOB_READ_WRITE_TOKEN` is added automatically — enable for **Production** and **Preview**.
6. After switching from private → public Blob (or changing token), delete old **Media** rows in `/admin` and run `npm run seed:all -- --force` with the new token in `.env.local`, then redeploy.
7. Redeploy. Without Blob, post **text** saves to Neon but **uploads** do not persist on serverless.

`npm run build` regenerates the Payload admin import map first so the UI includes `VercelBlobClientUploadHandler`. If `/admin` logs `PayloadComponent not found` for that key, commit an updated `src/app/(payload)/admin/importMap.js` and redeploy.

### Preview URL returns 401 (Deployment Protection)

If `https://beta.infrafund.net/blog` or `/cms/api/media/file/…` returns **401** with a Vercel SSO page, the preview deployment is behind **Vercel Deployment Protection**, not a CMS bug.

**Blog images** on a protected Preview: use a **public** Blob store (no `BLOB_STORAGE_ACCESS=private`) and re-seed so thumbnails are `*.public.blob.vercel-storage.com` URLs. The app no longer routes public-blob files through `/cms/api/media/file/…` (that path still 401s for anonymous visitors and for `next/image` optimization).

Other fixes (pick one):

1. Vercel → **Project** → **Settings** → **Deployment Protection** → relax protection for **Preview**.
2. Test on **Production** (`https://infrafund.net`) if production is not protected.
3. For private Blob only: stay logged into the Vercel SSO gate on `beta` in the same browser session (images use `unoptimized` for `/cms/api/media/file/…` so the browser sends your SSO cookie).

## Bootstrap Payload on Neon (once)

```bash
DATABASE_URL='postgresql://...@ep-xxx.region.aws.neon.tech/neondb?sslmode=verify-full' npm run db:bootstrap:payload
```

Create the first admin **from your machine** (Vercel cannot run Payload’s `registerFirstUser` transaction reliably):

```bash
# Neon direct (unpooled) URL + same PAYLOAD_SECRET as Vercel Preview
DATABASE_URL='postgresql://...@ep-xxx.eu-west-2.aws.neon.tech/neondb?sslmode=verify-full' \
PAYLOAD_SECRET='...' \
npm run db:create-payload-admin -- admin@yourdomain.com 'YourSecurePassword'
```

Additional master admins (same env vars, Neon **direct** URL):

```bash
npm run db:create-payload-master-admin -- other@yourdomain.com 'TheirSecurePassword'
```

Then sign in at `https://beta.infrafund.net/admin/login` (do not use “create first user” on Vercel).

### Forgot password email

1. Set all `INFRA_CONTACT_FORM_SMTP_*` vars on Vercel (copy from backpro GitHub vars/secrets if you already send contact-form mail).
2. Set `PAYLOAD_PUBLIC_SERVER_URL` to the **exact** public origin (`https://beta.infrafund.net` on Preview).
3. Redeploy; open Vercel function logs on first `/admin` hit — you should see `[payload] email: platform-smtp (host:port)`, not “email disabled”.
4. Use **`https://beta.infrafund.net/admin/forgot`** (or “Forgot password?” on the login page).
5. Test locally:

```bash
INFRA_CONTACT_FORM_SMTP_HOST=... INFRA_CONTACT_FORM_SMTP_PORT=587 \
INFRA_CONTACT_FORM_SMTP_SENDER=hello@infrafund.net \
INFRA_CONTACT_FORM_SMTP_PASSWORD=... \
DATABASE_URL='postgresql://...@....neon.tech/neondb?sslmode=verify-full' \
PAYLOAD_SECRET='...' \
npm run db:test-payload-email -- your@email.com
```

Verify the user is on the **same** Neon DB Vercel uses:

```bash
DATABASE_URL='postgresql://...@ep-xxx-pooler....neon.tech/neondb?sslmode=verify-full' \
node src/scripts/verify-payload-users.mjs
```

Test login with the **same pooled** URL and password you use in the browser:

```bash
DATABASE_URL='postgresql://...@ep-xxx-pooler....neon.tech/neondb?sslmode=verify-full' \
PAYLOAD_SECRET='...' \
npm run db:verify-payload-login -- your@email.com 'YourPassword'
```

If this shows your email but beta still opens create-first-user, redeploy latest `develop` (Neon HTTP user probe + pooled `DATABASE_URL`). If users exist but login says wrong password, redeploy after fixing pooled runtime URL (Payload must not use `DATABASE_URL_UNPOOLED` for queries). If it persists, Vercel `DATABASE_URL` or `PAYLOAD_SECRET` does not match what you used locally.

## Troubleshooting

- **`504` / `FUNCTION_INVOCATION_TIMEOUT`:** See [Vercel docs](https://vercel.com/docs/errors/function_invocation_timeout). Function hit `maxDuration` (60s) while waiting on DB. Redeploy after env changes; remove `PAYLOAD_FORCE_DRIZZLE_PUSH`; use pooled Neon URL; disable scale-to-zero.
- **Logs show `neon warmup: SELECT 1 ok` then `pg-tcp` timeout:** HTTPS to Neon works; **TCP from Vercel to Neon pooler does not**. Runtime must use `driver=neon-fetch` (`poolQueryViaFetch`). Redeploy latest `develop`.
- **`POST 500` on `/cms/api/users/first-register`:** Do not create the first user on Vercel. Run `npm run db:create-payload-admin` locally (direct Neon URL), then use `/admin/login`.
- **`/admin/login` redirects to create-first-user`:** No row in `payload.users` on the DB Preview uses — run `db:create-payload-master-admin` with pooled `POSTGRES_URL`. Check **`payload`** schema, not `public.users`.
- **`/admin` ↔ `/admin/login` infinite loop after successful login:** Caused by `/admin` always redirecting to login when users exist (fixed — `/admin` only redirects to create-first-user when the DB has no users). Redeploy and clear cookies for the site.
- **`/admin` shows Next.js `404` after login on Vercel:** Payload `RootPage` calls `notFound()` for logged-in users when the dashboard view does not resolve (common with Neon on Vercel). Latest `develop` bypasses `RootPage` at `/admin` and renders the dashboard directly when `hasUser=true`; unauthenticated users go to `/admin/login`.
- **`POST /cms/api/users/login` 401, message “email or password incorrect”, stack at `checkLoginPermission` (~line 23):** Usually **no row returned for that email** (not always a wrong password). Confirm the user exists on the **Preview** Neon branch (`npm run db:verify-payload-users` with pooled `POSTGRES_URL`). Redeploy latest `develop` (Neon HTTP user lookup patch for login). If it still fails, reset password with `db:create-payload-master-admin` against Neon **direct** URL, then test login with **pooled** URL.
- **`cannot begin transaction: timeout exceeded when trying to connect` on login:** Password check passed; Payload then opened a **WebSocket** DB transaction (fails from Vercel). Redeploy latest `develop` (skips `beginTransaction` on Vercel + `useSessions: false` for admin users). JWT login still works without per-device session rows in Postgres.
- **`/admin` 500 / DB timeout:** Pooled `DATABASE_URL` on Vercel; bootstrap schema with **direct** URL if tables missing.
- **`search_path` startup error:** use pooled URL; app does not set `search_path` on Neon.
- **`b.mask is not a function`:** redeploy latest code; `ws`/`@neondatabase/serverless` must stay external in `next.config.ts`.
- **Slow first load:** scale-to-zero + ISR cold cache; disable scale-to-zero for beta.

## Landing forms (waitlist, contact, locations, non-resident)

These run as **Next.js API routes** on the same Vercel project, using the Neon `DATABASE_URL` / `POSTGRES_URL` (public schema: `waitlist`, `contact_forms`, `non_resident_waitlists`, `countries`). Bootstrap once with `npm run db:migrate:backpro-neon` if tables are missing. Set `RECAPTCHA_SECRET` (or `INFRA_REST_RECAPTCHA_GOOGLE_SECRET`) and `INFRA_CONTACT_FORM_*` for captcha + notification email.

**reCAPTCHA on beta:** In [Google reCAPTCHA admin](https://www.google.com/recaptcha/admin), open the same v3 key pair backpro uses. Under **Domains**, add `beta.infrafund.net` and `infrafund.net` (and `localhost` for local dev). On Vercel **Preview**, set both `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (site key) and `INFRA_REST_RECAPTCHA_GOOGLE_SECRET` (secret key), then **redeploy** — the site key is embedded at build time. If the UI says “reCAPTCHA failed” with no `POST /api/waitlists` in Network, the browser could not obtain a token (domain/key mismatch). If `POST /api/waitlists` returns 401, the secret on Vercel does not match the site key.
