-- One-time prod/beta fix: user profile fields + post authorUser relationship.
-- Dev auto-syncs via Drizzle push; production does not (see payload.config.js push: !isProd).
--
--   psql "$DATABASE_URL" -f src/scripts/sql/add-user-profile-and-post-author.sql
-- Or: npm run db:migrate:user-profile

CREATE SCHEMA IF NOT EXISTS payload;

ALTER TABLE payload.users
  ADD COLUMN IF NOT EXISTS full_name varchar,
  ADD COLUMN IF NOT EXISTS job_title varchar,
  ADD COLUMN IF NOT EXISTS profile_photo_id integer;

DO $$
BEGIN
  ALTER TABLE payload.users
    ADD CONSTRAINT users_profile_photo_id_media_id_fk
    FOREIGN KEY (profile_photo_id) REFERENCES payload.media(id)
    ON DELETE SET NULL ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE payload.posts
  ADD COLUMN IF NOT EXISTS author_user_id integer;

DO $$
BEGIN
  ALTER TABLE payload.posts
    ADD CONSTRAINT posts_author_user_id_users_id_fk
    FOREIGN KEY (author_user_id) REFERENCES payload.users(id)
    ON DELETE SET NULL ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
