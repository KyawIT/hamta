-- Add image_id FK to dish and drink tables
ALTER TABLE dish  ADD COLUMN IF NOT EXISTS image_id BIGINT REFERENCES image(id);
ALTER TABLE drink ADD COLUMN IF NOT EXISTS image_id BIGINT REFERENCES image(id);
