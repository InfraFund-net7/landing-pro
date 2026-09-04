-- Self-hosted Postgres (no pg_uuidv7 extension available): implement uuidv7() in
-- pure SQL instead of the Neon-only extension used by backpro-neon-prelude.sql.
-- gen_random_uuid() is built into Postgres core since v13 (pgcrypto not required).
CREATE OR REPLACE FUNCTION public.uuidv7() RETURNS uuid
  LANGUAGE sql
  VOLATILE
AS $$
  SELECT encode(
    set_bit(
      set_bit(
        overlay(
          uuid_send(gen_random_uuid()) placing
            substring(int8send(floor(extract(epoch FROM clock_timestamp()) * 1000)::bigint) FROM 3)
            FROM 1 FOR 6
        ),
        52, 1
      ),
      53, 1
    ),
    'hex'
  )::uuid;
$$;
