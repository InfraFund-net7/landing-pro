-- One-time prod/beta fix: Users collection gained a `role` field after the DB was created.
-- Dev auto-syncs via Drizzle push; production does not (see payload.config.js push: !isProd).
--
-- Run against the same DATABASE_URL the landing app uses (Neon on Vercel, GitHub
-- PROD_PAYLOAD_DATABASE_URL, or local Docker Postgres):
--   psql "$DATABASE_URL" -f src/scripts/sql/add-users-role-column.sql
--
-- Existing admin users default to master-admin (matches src/access/roles.js fallback).
-- If this fails with "schema payload does not exist", bootstrap first:
--   DATABASE_URL='...' node src/scripts/bootstrap-payload-schema.mjs

CREATE SCHEMA IF NOT EXISTS payload;

DO $$
BEGIN
  CREATE TYPE payload.enum_users_role AS ENUM ('master-admin', 'content-editor');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE payload.users
  ADD COLUMN IF NOT EXISTS role payload.enum_users_role NOT NULL DEFAULT 'master-admin';
