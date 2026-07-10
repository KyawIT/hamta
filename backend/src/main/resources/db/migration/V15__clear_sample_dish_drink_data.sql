-- Entfernt die Beispiel-Speisen und -Getränke aus V6; Kategorien bleiben erhalten.

DELETE FROM dish;
DELETE FROM drink;

ALTER SEQUENCE dish_seq RESTART WITH 1;
ALTER SEQUENCE drink_seq RESTART WITH 1;
