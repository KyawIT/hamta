-- Remove old text category column and re-insert all data with proper FK to category table

DELETE FROM dish;
DELETE FROM drink;

ALTER TABLE dish  DROP COLUMN IF EXISTS category;
ALTER TABLE drink DROP COLUMN IF EXISTS category;

-- ============================================================
-- CATEGORY TABLE
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS category_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS category (
    id       BIGINT       PRIMARY KEY DEFAULT nextval('category_seq'),
    name     VARCHAR(255) NOT NULL,
    type     VARCHAR(10)  NOT NULL,   -- 'dish' or 'drink'
    image_id BIGINT REFERENCES image(id)
);

ALTER TABLE dish  ADD COLUMN IF NOT EXISTS category_id BIGINT REFERENCES category(id);
ALTER TABLE drink ADD COLUMN IF NOT EXISTS category_id BIGINT REFERENCES category(id);

-- ============================================================
-- CATEGORIES (exact bold headings from the PDFs)
-- ============================================================

-- Speisekarte bold headings → type = 'dish'
INSERT INTO category (id, type, name) VALUES
(1,  'dish',  'Vorspeisen'),
(2,  'dish',  'Premium Steaks'),
(3,  'dish',  'Hauptspeisen'),
(4,  'dish',  'Knackige Salate'),
(5,  'dish',  'Neapolitanische Pizza'),
(6,  'dish',  'Suppen'),
(7,  'dish',  'Beilagen & Dips'),
(8,  'dish',  'Dessert');

-- Drinks Menu bold headings → type = 'drink'
INSERT INTO category (id, type, name) VALUES
(9,  'drink', 'Aperitifs'),
(10, 'drink', 'Cocktails'),
(11, 'drink', 'Mocktails'),
(12, 'drink', 'Bier'),
(13, 'drink', 'Kaffee & Tee'),
(14, 'drink', 'Limonaden'),
(15, 'drink', 'Fruchtsäfte & Schorlen'),
(16, 'drink', 'Softdrinks & Wasser');

ALTER SEQUENCE category_seq RESTART WITH 17;

-- ============================================================
-- DISH DATA (re-inserted with category_id FK)
-- ============================================================

-- Vorspeisen (id=1)
INSERT INTO dish (id, category_id, name, ingredients, price) VALUES
(1,  1, 'Beef Tatar (120 g)',       'Zartes Rindfleisch, feines Wachtelei, hausgemachte Trüffel-Mayo, serviert mit knusprigem Toastbrot.', 14.90),
(2,  1, 'Cremige Burrata',          'Auf frischem Rucola mit hausgemachtem Basilikum-Pesto, feinem Tomaten-Carpaccio und bestem Olivenöl. Inklusive Brot.', 12.90),
(3,  1, 'Knoblauchgarnelen',        'In feinem Olivenöl gebraten, mit frischer Chili, Knoblauch und knusprigem Brot.', 14.90),
(4,  1, 'Antipasti-Teller (klein)', 'Auswahl an Käse, Oliven, hausgemachtem eingelegtem Gemüse, pikanter Salami, zartem Prosciutto und Kapern. Inklusive Brot.', 12.90),
(5,  1, 'Antipasti-Teller (groß)',  'Auswahl an Käse, Oliven, hausgemachtem eingelegtem Gemüse, pikanter Salami, zartem Prosciutto und Kapern. Inklusive Brot.', 16.90);

-- Premium Steaks (id=2)
INSERT INTO dish (id, category_id, name, ingredients, price) VALUES
(6,  2, '220g Rinderfilet',   'Das zarteste Stück vom Rind, perfekt auf den Punkt gegrillt. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', 35.90),
(7,  2, '300g Ribeye Steak',  'Saftig und unglaublich geschmacksintensiv durch das feine Fettauge. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', 32.90),
(8,  2, 'Flank Steak',        'Kräftig im Geschmack, schonend mariniert und zart gegrillt. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', 24.90);

-- Hauptspeisen (id=3)
INSERT INTO dish (id, category_id, name, ingredients, price) VALUES
(9,  3, 'Saisonales Risotto',       'Cremiges Risotto mit frischem Parmesan, knackigem Rucola und süßen Schmortomaten.', 14.90),
(10, 3, 'Angus Beef Burger (180 g)','Saftiges Angus-Rindfleisch, rauchige BBQ-Sauce, Tomate, Speck, serviert mit Steakfrites und Salat.', 17.90),
(11, 3, 'Trüffel-Pasta',            'Al dente Linguine in einer cremigen, edlen schwarzen Trüffelsauce, verfeinert mit Parmesan.', 18.90),
(12, 3, 'Veganes Thai-Curry',       'Aromatisch-cremiges Curry mit duftendem Jasminreis, frischem Marktgemüse und geröstetem Sesam.', 14.90);

-- Knackige Salate (id=4)
INSERT INTO dish (id, category_id, name, ingredients, price) VALUES
(13, 4, 'Caesar Salad',       'Knackiger Römersalat, hausgemachtes Caesar-Dressing, knusprige Croutons und gehobelter Parmesan.', 13.90),
(14, 4, 'Bunter Salatteller', 'Knackige Blattsalate, frische Tomaten, Karotten und Rucola mit unserem fruchtigen Balsamico-Dressing.', 11.90);

-- Neapolitanische Pizza (id=5)
INSERT INTO dish (id, category_id, name, ingredients, price) VALUES
(15, 5, 'Margherita',      'Fruchtige Tomatensauce, cremiger Mozzarella, Parmesan und frisches Basilikum.', 11.90),
(16, 5, 'Diavola',         'Scharfe Salami, Chiliöl, Mozzarella, Parmesan und fruchtige Tomatensauce.', 14.90),
(17, 5, 'Burrata e Crudo', 'Zarter Prosciutto, frische Tomatensauce, Parmesan, Cherrytomaten, Rucola und cremige Burrata.', 15.90),
(18, 5, 'Thunfisch',       'Zarter Thunfisch, rote Zwiebeln, Kapern, Mozzarella, Parmesan und Tomatensauce.', 14.90),
(19, 5, 'Gemüse-Pizza',    'Frisches saisonales Gemüse, fruchtige Tomatensauce, Mozzarella, Rucola und Parmesan.', 13.90);

-- Suppen (id=6)
INSERT INTO dish (id, category_id, name, ingredients, price) VALUES
(20, 6, 'Hausgemachte Rindsuppe', 'Kräftige Brühe mit hausgemachten Frittaten und Schnittlauch.', 5.90),
(21, 6, 'Saisonale Cremesuppe',   'Samtig püriert aus feinstem saisonalen Gemüse.', 6.90);

-- Beilagen & Dips (id=7)
INSERT INTO dish (id, category_id, name, ingredients, price) VALUES
(22, 7, 'Steakhouse Pommes',        NULL, 6.90),
(23, 7, 'Babykartoffeln in Butter', NULL, 6.90),
(24, 7, 'Kleiner gemischter Salat', NULL, 7.90),
(25, 7, 'Hausgemachter Krautsalat', NULL, 5.90);

-- Dessert (id=8)
INSERT INTO dish (id, category_id, name, ingredients, price) VALUES
(26, 8, 'Beeren Brownie', 'Saftiger Schokoladen-Brownie mit frischen Waldbeeren.', 9.90),
(27, 8, 'Tiramisu',       'Der italienische Klassiker, cremig und hausgemacht.', 8.90);

ALTER SEQUENCE dish_seq RESTART WITH 28;

-- ============================================================
-- DRINK DATA (re-inserted with category_id FK)
-- ============================================================

-- Aperitifs (id=9)
INSERT INTO drink (id, category_id, name, description, price) VALUES
(1,  9,  'Lillet Wild Berry', 'Lillet Blanc, Schweppes Wild Berry, frische Beeren (0,25 l)', 8.50),
(2,  9,  'Aperol Spritz',     'Aperol, Prosecco, Soda, frische Orange (0,25 l)', 7.90),
(3,  9,  'Hugo',              'Prosecco, Holundersirup, frische Minze, Limette (0,25 l)', 7.90),
(4,  9,  'Campari Soda',      'Der klassisch herbe Aperitif aus Italien (0,25 l)', 6.50);

-- Cocktails (id=10)
INSERT INTO drink (id, category_id, name, description, price) VALUES
(5,  10, 'Espresso Martini', 'Wodka, Kaffeelikör, frischer Espresso, Zuckersirup (0,20 l)', 11.90),
(6,  10, 'Negroni',          'Gin, roter Wermut, Campari, Orangenzeste (0,20 l)', 11.90),
(7,  10, 'Cosmopolitan',     'Wodka, Cointreau, Cranberrysaft, Limette (0,20 l)', 11.50),
(8,  10, 'Mojito',           'Weißer Rum, Fever-Tree Minze, Limette, Rohrzucker, Soda (0,30 l)', 10.90),
(9,  10, 'Moscow Mule',      'Wodka, Spicy Ginger Beer, Gurke, Limette (0,30 l)', 10.90),
(10, 10, 'Gin Tonic',        'Premium Dry Gin, feines Tonic Water, Botanicals (0,25 l)', 10.50);

-- Mocktails (id=11)
INSERT INTO drink (id, category_id, name, description, price) VALUES
(11, 11, 'Mango Refresher', 'Mangonektar, frischer Ingwer, Limette, Tonic Water (0,30 l)', 8.90),
(12, 11, 'Virgin Mojito',   'Frische Minze, Limette, Rohrzucker, Ginger Ale (0,30 l)', 7.90);

-- Bier (id=12)
INSERT INTO drink (id, category_id, name, description, price) VALUES
(13, 12, 'Freistädter Ratsherrn Prem. Groß (0,50 l)',  'Fassbier, feinhopfig und edel', 5.50),
(14, 12, 'Freistädter Ratsherrn Prem. Klein (0,33 l)', 'Fassbier, feinhopfig und edel', 4.50),
(15, 12, 'Freistädter Bio Zwickl (0,33 l)',            'Flaschenbier, naturtrüb', 4.50),
(16, 12, 'Freistädter Hell Alkoholfrei (0,50 l)',      'Voller Geschmack ohne Alkohol', 4.90),
(17, 12, 'Freistädter Grapefruit Radler (0,50 l)',     'Alkoholfrei, fruchtig-herb', 4.90);

-- Kaffee & Tee (id=13)
INSERT INTO drink (id, category_id, name, description, price) VALUES
(18, 13, 'Café Latte / Latte Macchiato',         'Schichten aus heißer Milch, Espresso und Milchschaum', 5.20),
(19, 13, 'Heisse Schokolade',                    'Cremige Vollmilchschokolade, auf Wunsch mit Schlagobers', 5.20),
(20, 13, 'Schwarztee / Grüner Tee / Früchtetee', 'Serviert im Kännchen. Verschiedene Sorten auf Anfrage.', 4.90),
(21, 13, 'Cappuccino',                           'Espresso mit viel heißer Milch und fester Schaumkrone', 4.80),
(22, 13, 'Doppelter Espresso',                   'Die doppelte Dosis für einen intensiven Genuss', 4.80),
(23, 13, 'Verlängerter',                         'Ein klassischer Espresso, mit heißem Wasser gestreckt', 4.00),
(24, 13, 'Espresso / Espresso Macchiato',        'Kräftiger Röstkaffee, pur oder mit einem Schuss Milchschaum', 3.80);

-- Limonaden (id=14)
INSERT INTO drink (id, category_id, name, description, price) VALUES
(25, 14, 'Orangenlimonade',  'Fruchtig-erfrischende Orangenlimonade', 4.20),
(26, 14, 'Maracujalimonade', 'Tropisch-erfrischende Maracujalimonade', 4.20),
(27, 14, 'Kräuterlimonade',  'Süße Alpenkräuterlimonade', 4.20),
(28, 14, 'Coca-Cola',        'Der klassische Cola-Geschmack', 4.20),
(29, 14, 'Coca-Cola Zero',   'Cola-Genuss ohne Zucker', 4.20);

-- Fruchtsäfte & Schorlen (id=15)
INSERT INTO drink (id, category_id, name, description, price) VALUES
(30, 15, 'Saft pur (0,25 l)',                       'Apfel naturtrüb, Orange, Johannisbeere, Multivitamin, Maracuja, Mango, Erdbeere', 3.80),
(31, 15, 'Saftschorle mit Soda (0,50 l)',            'Apfel naturtrüb, Orange, Johannisbeere, Multivitamin, Maracuja, Mango, Erdbeere', 4.90),
(32, 15, 'Saftschorle mit Leitungswasser (0,50 l)', 'Apfel naturtrüb, Orange, Johannisbeere, Multivitamin, Maracuja, Mango, Erdbeere', 4.50);

-- Softdrinks & Wasser (id=16)
INSERT INTO drink (id, category_id, name, description, price) VALUES
(33, 16, 'Vöslauer Still / Prickelnd Groß (0,75 l)', NULL, 5.50),
(34, 16, 'Red Bull (0,25 l)',                         NULL, 4.50),
(35, 16, 'Soda Zitrone Groß (0,50 l)',               NULL, 4.50),
(36, 16, 'Almdudler (0,35 l)',                       NULL, 4.20),
(37, 16, 'Coca-Cola / Coca-Cola Zero (0,33 l)',      NULL, 4.20),
(38, 16, 'Vöslauer Still / Prickelnd (0,33 l)',      NULL, 3.50),
(39, 16, 'Soda Zitrone Klein (0,25 l)',              NULL, 3.50),
(40, 16, 'Leitungswasser mit/ohne Zitrone (0,50 l)', NULL, 2.10);

ALTER SEQUENCE drink_seq RESTART WITH 41;
