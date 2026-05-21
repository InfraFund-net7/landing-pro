# Production deploy on Vercel (`main`)

Pushes to **`main`** deploy to **Vercel Production** via Git integration (not GitHub Actions Docker).

Pushes to **`develop`** can use:

- **Vercel Preview** (automatic if the Vercel project is linked), and/or
- **Docker** on `infrafund-develop` via `.github/workflows/deploy-dev.yaml` (see [deploy-self-hosted.md](./deploy-self-hosted.md))

## One-time Vercel setup

1. [vercel.com/new](https://vercel.com/new) → Import **InfraFund-net7/landing-pro**.
2. **Settings → Git → Production Branch** = **`main`**.
3. Add environment variables (below) for **Production** and **Preview**.
4. **Settings → Domains** → assign production domain (e.g. `infrafund.net`) to Production.

After linking, every push to **`main`** triggers a production deployment on Vercel.

## Environment variables (Vercel dashboard)

### Production (`main`)

| Variable | Notes |
|----------|--------|
| `DATABASE_URL` | Neon unpooled URL |
| `PAYLOAD_SECRET` | Same as `PROD_PAYLOAD_SECRET` in GitHub |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://infrafund.net` |
| `NEXT_PUBLIC_API_BASE_URL` | Prod API base URL |
| `NEXT_PUBLIC_DASH_LOGIN_URL` | `https://dashboard.infrafund.net/login` (header Login) |
| `SKIP_PAYLOAD_FETCH_AT_BUILD` | `1` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Optional |

### Preview (`develop`, `beta.infrafund.net`, etc.)

Assign **beta.infrafund.net** to a **Preview** deployment in Vercel → **Settings → Domains**.

| Variable | Example / notes |
|----------|------------------|
| `DATABASE_URL` | Neon URL with `?sslmode=verify-full`. **Runtime (Vercel):** pooled host (`-pooler`) is OK. **Bootstrap script (local):** use direct host (no `-pooler`) |
| `PAYLOAD_SECRET` | Same long random string as other environments (≥32 chars) |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://beta.infrafund.net` (no trailing slash) |
| `NEXT_PUBLIC_API_BASE_URL` | Dev/staging API |
| `NEXT_PUBLIC_DASH_LOGIN_URL` | Dev dashboard login URL |
| `SKIP_PAYLOAD_FETCH_AT_BUILD` | `1` |

Copy these under **Environment Variables → Preview** (not only Production). Redeploy after changing secrets.

#### Neon connection string

From the [Neon console](https://console.neon.tech) → your project → **Connect**:

- **Vercel runtime:** Neon **pooled** connection (`ep-xxx-pooler.region.aws.neon.tech`) — faster for serverless, and the app no longer sends `search_path` on connect.
- **Local `npm run db:bootstrap:payload`:** Neon **direct** connection (`ep-xxx.region.aws.neon.tech`, no `-pooler`).
- Prefer `sslmode=verify-full` (avoids a `pg` driver warning; the app upgrades legacy `require` and sets `connect_timeout=60` for Neon).

Example shape (do not commit real credentials):

`postgresql://user:pass@ep-xxxx.region.aws.neon.tech/neondb?sslmode=verify-full`

#### `/admin` returns 500 after Neon migration

Production and Preview set `NODE_ENV=production`, so Payload **does not** auto-create tables (`push: false`). A fresh Neon DB has no `payload` schema until you bootstrap it once.

**1. Bootstrap CMS tables (from your machine)**

```bash
cd landing-pro
DATABASE_URL='postgresql://...@....neon.tech/neondb?sslmode=verify-full' npm run db:bootstrap:payload
```

**2. If admin existed before the `role` field was added**

```bash
DATABASE_URL='...same...' npm run db:migrate:users-role
```

**3. Redeploy** the Vercel Preview that serves `beta.infrafund.net`.

**4. Create the first admin** at `https://beta.infrafund.net/admin` (first user becomes master admin).

Optional one-off on Preview only (instead of step 1): set `PAYLOAD_FORCE_DRIZZLE_PUSH=true` in Vercel Preview env, redeploy, load `/admin` once, then **remove** the variable and redeploy again.

#### SSL warning in Vercel logs

If you see `(node) Warning: SECURITY WARNING: The SSL modes 'prefer', 'require'...`, set `sslmode=verify-full` on `DATABASE_URL` in Vercel (or redeploy after the app change that normalizes `require` → `verify-full`). The warning is not fatal.

If you see `unsupported startup parameter in options: search_path`, your `DATABASE_URL` is a **pooler** string or an old deploy still set `search_path` on connect — use Neon’s **direct** connection string (no `-pooler` in the host) and redeploy.

If you see `timeout exceeded when trying to connect` on `select count(*) from "payload"."users"`, Neon may be waking from **scale-to-zero** — reload `/admin` after 30–60s, use the **pooled** URL on Vercel, or disable scale-to-zero in the Neon console for that branch.

A **500** on `/admin` is usually missing env vars, wrong `DATABASE_URL`, or an unbootstrapped `payload` schema (run `npm run db:bootstrap:payload` with the **direct** URL).

## What GitHub Actions does

| Branch | Workflow | Deploy target |
|--------|----------|----------------|
| `main` | `ci.yml` only | **Vercel** (no `deploy.yaml`) |
| `develop` | `deploy-dev.yaml` | Docker smoke test / optional VM deploy |

There is **no** production Docker workflow; do not re-add `deploy.yaml` unless you intentionally run two prod targets.

## Verify a `main` deploy

1. Merge or push to **`main`**.
2. Vercel dashboard → **Deployments** → latest **Production** deployment.
3. Or check production URL after the build completes.

GitHub Actions **CI** may run in parallel; green CI does not replace checking Vercel.

## Backpro API

Waitlist/contact still use **backpro** via `NEXT_PUBLIC_API_BASE_URL`. Vercel only hosts the Next.js / Payload app.
