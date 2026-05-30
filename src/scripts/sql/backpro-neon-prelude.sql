-- Neon / Postgres 17: backpro migrations use uuidv7(); map to pg_uuidv7 extension.
CREATE EXTENSION IF NOT EXISTS pg_uuidv7;

CREATE OR REPLACE FUNCTION public.uuidv7() RETURNS uuid
  LANGUAGE sql
  VOLATILE
AS $$ SELECT public.uuid_generate_v7(); $$;
