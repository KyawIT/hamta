-- Alte Tabellen und Sequences entfernen
DROP TABLE IF EXISTS starter;
DROP TABLE IF EXISTS main_course;
DROP TABLE IF EXISTS dessert;
DROP TABLE IF EXISTS cocktail;
DROP TABLE IF EXISTS beverage;

DROP SEQUENCE IF EXISTS starter_seq;
DROP SEQUENCE IF EXISTS main_course_seq;
DROP SEQUENCE IF EXISTS dessert_seq;
DROP SEQUENCE IF EXISTS cocktail_seq;
DROP SEQUENCE IF EXISTS beverage_seq;

-- Neue Sequences (Panache-Konvention: Increment 50)
CREATE SEQUENCE IF NOT EXISTS speise_seq   START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS getraenk_seq START WITH 1 INCREMENT BY 50;

-- Speise-Tabelle (Vorspeise, Hauptspeise, Nachspeise, Beilage)
CREATE TABLE IF NOT EXISTS speise (
    id       BIGINT PRIMARY KEY DEFAULT nextval('speise_seq'),
    category VARCHAR(50)  NOT NULL,
    name     VARCHAR(255) NOT NULL,
    preis    NUMERIC(10,2),
    zutaten  TEXT,
    image_id BIGINT REFERENCES image(id)
);

-- Getraenk-Tabelle (Cocktail, Getraenk)
CREATE TABLE IF NOT EXISTS getraenk (
    id       BIGINT PRIMARY KEY DEFAULT nextval('getraenk_seq'),
    category VARCHAR(50)  NOT NULL,
    name     VARCHAR(255) NOT NULL,
    preis    NUMERIC(10,2),
    zutaten  TEXT,
    image_id BIGINT REFERENCES image(id)
);
