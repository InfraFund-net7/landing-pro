-- One-time prod/beta fix: editor LinkedIn and X profile URLs on payload.users.
-- Dev auto-syncs via Drizzle push; Vercel runtime does not (see payload.config.js).
--
--   psql "$DATABASE_URL" -f src/scripts/sql/add-user-social-urls.sql
-- Or: npm run db:migrate:user-social-urls

CREATE SCHEMA IF NOT EXISTS payload;

ALTER TABLE payload.users
  ADD COLUMN IF NOT EXISTS linkedin_url varchar,
  ADD COLUMN IF NOT EXISTS x_url varchar;
