-- Alte, nicht mehr genutzte Tabellen und Sequences entfernen
DROP TABLE IF EXISTS vorspeise;
DROP TABLE IF EXISTS hauptspeise;
DROP TABLE IF EXISTS nachspeise;
DROP SEQUENCE IF EXISTS vorspeise_seq;
DROP SEQUENCE IF EXISTS hauptspeise_seq;
DROP SEQUENCE IF EXISTS nachspeise_seq;

-- Sequences für neue Tabellen (Panache-Konvention: Increment 50)
CREATE SEQUENCE IF NOT EXISTS image_seq       START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS starter_seq     START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS main_course_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS dessert_seq     START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS cocktail_seq    START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS beverage_seq    START WITH 1 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS image (
    id  BIGINT PRIMARY KEY DEFAULT nextval('image_seq'),
    url VARCHAR(512) NOT NULL
);

CREATE TABLE IF NOT EXISTS starter (
    id       BIGINT PRIMARY KEY DEFAULT nextval('starter_seq'),
    name     VARCHAR(255) NOT NULL,
    image_id BIGINT REFERENCES image(id),
    zutaten  TEXT,
    preis    NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS main_course (
    id       BIGINT PRIMARY KEY DEFAULT nextval('main_course_seq'),
    name     VARCHAR(255) NOT NULL,
    image_id BIGINT REFERENCES image(id),
    zutaten  TEXT,
    preis    NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS dessert (
    id       BIGINT PRIMARY KEY DEFAULT nextval('dessert_seq'),
    name     VARCHAR(255) NOT NULL,
    image_id BIGINT REFERENCES image(id),
    zutaten  TEXT,
    preis    NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS cocktail (
    id       BIGINT PRIMARY KEY DEFAULT nextval('cocktail_seq'),
    name     VARCHAR(255) NOT NULL,
    image_id BIGINT REFERENCES image(id),
    zutaten  TEXT,
    preis    NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS beverage (
    id       BIGINT PRIMARY KEY DEFAULT nextval('beverage_seq'),
    name     VARCHAR(255) NOT NULL,
    image_id BIGINT REFERENCES image(id),
    preis    NUMERIC(10,2)
);
