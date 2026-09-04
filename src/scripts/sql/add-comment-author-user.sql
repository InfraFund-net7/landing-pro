-- Link editorial / team comments to CMS user profiles (name, title, photo).
-- Or: npm run db:migrate:comment-author

CREATE SCHEMA IF NOT EXISTS payload;

ALTER TABLE payload.comments
  ADD COLUMN IF NOT EXISTS author_user_id integer;

DO $$
BEGIN
  ALTER TABLE payload.comments
    ADD CONSTRAINT comments_author_user_id_users_id_fk
    FOREIGN KEY (author_user_id) REFERENCES payload.users(id)
    ON DELETE SET NULL ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
