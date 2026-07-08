-- image_url für alle Speisekarte-Tabellen
-- IF NOT EXISTS: safe bei bereits vorhandener Spalte (z.B. durch Hibernate update-Mode)

ALTER TABLE vorspeise    ADD COLUMN IF NOT EXISTS image_url VARCHAR(512);
ALTER TABLE hauptspeise  ADD COLUMN IF NOT EXISTS image_url VARCHAR(512);
ALTER TABLE nachspeise   ADD COLUMN IF NOT EXISTS image_url VARCHAR(512);
