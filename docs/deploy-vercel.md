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
| `NEXT_PUBLIC_API_BASE_URL` | Dev/staging API |
| `NEXT_PUBLIC_DASH_LOGIN_URL` | Dev dashboard login |
| `SKIP_PAYLOAD_FETCH_AT_BUILD` | `1` (optional) |

Optional CMS (off by default): `CMS_REPLACE_EXISTING_PAGES`, `CMS_FETCH_HOME_PAGE`, `CMS_FETCH_BLOG`.

## Bootstrap Payload on Neon (once)

```bash
DATABASE_URL='postgresql://...@ep-xxx.region.aws.neon.tech/neondb?sslmode=verify-full' npm run db:bootstrap:payload
```

Then create the first user at `https://beta.infrafund.net/admin`.

## Troubleshooting

- **`504` / `FUNCTION_INVOCATION_TIMEOUT`:** See [Vercel docs](https://vercel.com/docs/errors/function_invocation_timeout). Function hit `maxDuration` (60s) while waiting on DB. Redeploy after env changes; remove `PAYLOAD_FORCE_DRIZZLE_PUSH`; use pooled Neon URL; disable scale-to-zero.
- **Logs show `neon warmup: SELECT 1 ok` then 504:** HTTP to Neon works; Payload was hanging on **WebSocket** (`neon-serverless` Pool). Runtime uses **node-pg TCP** after warmup (`driver=pg-tcp`). Ensure latest deploy + redeploy.
- **`/admin` 500 / DB timeout:** Pooled URL; `channel_binding` stripped. Bootstrap with **direct** URL if tables missing.
- **`search_path` startup error:** use pooled URL; app does not set `search_path` on Neon.
- **`b.mask is not a function`:** redeploy latest code; `ws`/`@neondatabase/serverless` must stay external in `next.config.ts`.
- **Slow first load:** scale-to-zero + ISR cold cache; disable scale-to-zero for beta.

## Backpro API

Waitlist/contact use **backpro** via `NEXT_PUBLIC_API_BASE_URL`.
