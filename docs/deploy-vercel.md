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

Marketing routes use **ISR** (`revalidate: 60`) and **do not** query Neon unless you opt in:

| Variable | When set to `1` |
|----------|------------------|
| `CMS_REPLACE_EXISTING_PAGES` | Fetch **site-pages** from CMS and allow replacement UI |
| `CMS_FETCH_HOME_PAGE` | Fetch **home-page** global from CMS (otherwise handcrafted fallbacks) |
| `CMS_FETCH_BLOG` | Fetch **posts** from CMS (otherwise mock blog data) |

Leave all unset on Preview/Production for fastest loads. Enable after you seed content in Payload.

`/admin` always uses the database.

## Neon: disable scale-to-zero (beta / faster first hit)

In [Neon console](https://console.neon.tech) → your project → branch used by beta → **Settings**:

- Turn off **Scale to zero** (or set a longer suspend delay).

Otherwise the first request after idle waits for the compute to wake (slow `/admin` and CMS-backed pages).

## Environment variables (Vercel dashboard)

### Production (`main`)

| Variable | Notes |
|----------|--------|
| `DATABASE_URL` | Neon **pooled** URL (`-pooler` host), `?sslmode=verify-full` |
| `PAYLOAD_SECRET` | ≥32 chars |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://infrafund.net` |
| `INFRA_CONTACT_FORM_SMTP_HOST` | Same as backpro (e.g. Office365 / SendGrid SMTP host) |
| `INFRA_CONTACT_FORM_SMTP_PORT` | Usually `587` or `465` |
| `INFRA_CONTACT_FORM_SMTP_SENDER` | From address (must be allowed by your SMTP provider) |
| `INFRA_CONTACT_FORM_SMTP_PASSWORD` | SMTP password (Vercel **Secret**) |
| `INFRA_CONTACT_FORM_SMTP_USERNAME` | Optional; defaults to `SENDER` |
| `INFRA_CONTACT_FORM_SMTP_REQUIRE_TLS` | `true` for port 587 (TLS) |
| `NEXT_PUBLIC_API_BASE_URL` | Prod API |
| `NEXT_PUBLIC_DASH_LOGIN_URL` | `https://dashboard.infrafund.net/login` |
| `SKIP_PAYLOAD_FETCH_AT_BUILD` | `1` (optional; build skips CMS without it too) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Optional |

### Preview (`develop`, `beta.infrafund.net`)

| Variable | Notes |
|----------|--------|
| `DATABASE_URL` | Neon **pooled** URL for runtime; **direct** URL only for local `npm run db:bootstrap:payload` |
| `PAYLOAD_SECRET` | Same as other envs |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://beta.infrafund.net` |
| `INFRA_CONTACT_FORM_SMTP_*` | Same as Production (forgot-password on `/admin/forgot`) |
| `NEXT_PUBLIC_API_BASE_URL` | Dev/staging API |
| `NEXT_PUBLIC_DASH_LOGIN_URL` | Dev dashboard login |
| `SKIP_PAYLOAD_FETCH_AT_BUILD` | `1` (optional) |

Optional CMS (off by default): `CMS_REPLACE_EXISTING_PAGES`, `CMS_FETCH_HOME_PAGE`, `CMS_FETCH_BLOG`.

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

If this shows your email but beta still opens create-first-user, redeploy latest `develop` (Neon HTTP user probe + pooled `DATABASE_URL`). If it persists, Vercel `DATABASE_URL` or `PAYLOAD_SECRET` does not match what you used locally.

## Troubleshooting

- **`504` / `FUNCTION_INVOCATION_TIMEOUT`:** See [Vercel docs](https://vercel.com/docs/errors/function_invocation_timeout). Function hit `maxDuration` (60s) while waiting on DB. Redeploy after env changes; remove `PAYLOAD_FORCE_DRIZZLE_PUSH`; use pooled Neon URL; disable scale-to-zero.
- **Logs show `neon warmup: SELECT 1 ok` then `pg-tcp` timeout:** HTTPS to Neon works; **TCP from Vercel to Neon pooler does not**. Runtime must use `driver=neon-fetch` (`poolQueryViaFetch`). Redeploy latest `develop`.
- **`POST 500` on `/cms/api/users/first-register`:** Do not create the first user on Vercel. Run `npm run db:create-payload-admin` locally (direct Neon URL), then use `/admin/login`.
- **`/admin/login` redirects to create-first-user` or loops `/admin` ↔ `/login` ↔ `/create-first-user`:** User exists in Neon (`hasUser=true` in logs) but bundled `RootPage` still redirects. Use dedicated routes (`/admin/login` bypasses `RootPage`); redeploy latest `develop`. Check logs for `admin login page (bypass RootPage)`.
- **`/admin` 500 / DB timeout:** Pooled `DATABASE_URL` on Vercel; bootstrap schema with **direct** URL if tables missing.
- **`search_path` startup error:** use pooled URL; app does not set `search_path` on Neon.
- **`b.mask is not a function`:** redeploy latest code; `ws`/`@neondatabase/serverless` must stay external in `next.config.ts`.
- **Slow first load:** scale-to-zero + ISR cold cache; disable scale-to-zero for beta.

## Backpro API

Waitlist/contact use **backpro** via `NEXT_PUBLIC_API_BASE_URL`.
