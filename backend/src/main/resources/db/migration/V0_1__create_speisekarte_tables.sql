-- Initiale Tabellen und Sequences für die Speisekarte

CREATE SEQUENCE IF NOT EXISTS vorspeise_seq    START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS hauptspeise_seq  START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS nachspeise_seq   START WITH 1 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS vorspeise (
    id        BIGINT PRIMARY KEY DEFAULT nextval('vorspeise_seq'),
    name      VARCHAR(255) NOT NULL,
    image_url VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS hauptspeise (
    id        BIGINT PRIMARY KEY DEFAULT nextval('hauptspeise_seq'),
    name      VARCHAR(255) NOT NULL,
    image_url VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS nachspeise (
    id        BIGINT PRIMARY KEY DEFAULT nextval('nachspeise_seq'),
    name      VARCHAR(255) NOT NULL,
    image_url VARCHAR(512)
);
