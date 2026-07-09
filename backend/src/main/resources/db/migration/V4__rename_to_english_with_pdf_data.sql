-- Drop old German tables and sequences
DROP TABLE IF EXISTS speise;
DROP TABLE IF EXISTS getraenk;
DROP SEQUENCE IF EXISTS speise_seq;
DROP SEQUENCE IF EXISTS getraenk_seq;

-- New sequences (Panache convention: increment 50)
CREATE SEQUENCE IF NOT EXISTS dish_seq  START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS drink_seq START WITH 1 INCREMENT BY 50;

-- dish table: category = starter | main_course | side | dessert
CREATE TABLE IF NOT EXISTS dish (
    id          BIGINT PRIMARY KEY DEFAULT nextval('dish_seq'),
    category    VARCHAR(50)  NOT NULL,
    name        VARCHAR(255) NOT NULL,
    price       NUMERIC(10,2),
    ingredients TEXT
);

-- drink table: category = aperitif | cocktail | mocktail | beer | coffee | soft_drink
CREATE TABLE IF NOT EXISTS drink (
    id          BIGINT PRIMARY KEY DEFAULT nextval('drink_seq'),
    category    VARCHAR(50)  NOT NULL,
    name        VARCHAR(255) NOT NULL,
    price       NUMERIC(10,2),
    description TEXT
);

-- ============================================================
-- DISH SEED DATA (from Hamta_food.pdf)
-- ============================================================

-- STARTERS
INSERT INTO dish (id, category, name, ingredients, price) VALUES
(1,  'starter', 'Beef Tatar (120 g)',       'Zartes Rindfleisch, feines Wachtelei, hausgemachte Trüffel-Mayo, serviert mit knusprigem Toastbrot.', 14.90),
(2,  'starter', 'Cremige Burrata',           'Auf frischem Rucola mit hausgemachtem Basilikum-Pesto, feinem Tomaten-Carpaccio und bestem Olivenöl. Inklusive Brot.', 12.90),
(3,  'starter', 'Knoblauchgarnelen',         'In feinem Olivenöl gebraten, mit frischer Chili, Knoblauch und knusprigem Brot.', 14.90),
(4,  'starter', 'Antipasti-Teller (klein)',  'Auswahl an Käse, Oliven, hausgemachtem eingelegtem Gemüse, pikanter Salami, zartem Prosciutto und Kapern. Inklusive Brot.', 12.90),
(5,  'starter', 'Antipasti-Teller (groß)',   'Auswahl an Käse, Oliven, hausgemachtem eingelegtem Gemüse, pikanter Salami, zartem Prosciutto und Kapern. Inklusive Brot.', 16.90);

-- MAIN COURSES (premium steaks)
INSERT INTO dish (id, category, name, ingredients, price) VALUES
(6,  'main_course', '220g Rinderfilet',      'Das zarteste Stück vom Rind, perfekt auf den Punkt gegrillt. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', 35.90),
(7,  'main_course', '300g Ribeye Steak',     'Saftig und unglaublich geschmacksintensiv durch das feine Fettauge. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', 32.90),
(8,  'main_course', 'Flank Steak',           'Kräftig im Geschmack, schonend mariniert und zart gegrillt. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', 24.90);

-- MAIN COURSES (hauptspeisen)
INSERT INTO dish (id, category, name, ingredients, price) VALUES
(9,  'main_course', 'Saisonales Risotto',    'Cremiges Risotto mit frischem Parmesan, knackigem Rucola und süßen Schmortomaten.', 14.90),
(10, 'main_course', 'Angus Beef Burger (180 g)', 'Saftiges Angus-Rindfleisch, rauchige BBQ-Sauce, Tomate, Speck, serviert mit Steakfrites und Salat.', 17.90),
(11, 'main_course', 'Trüffel-Pasta',         'Al dente Linguine in einer cremigen, edlen schwarzen Trüffelsauce, verfeinert mit Parmesan.', 18.90),
(12, 'main_course', 'Veganes Thai-Curry',    'Aromatisch-cremiges Curry mit duftendem Jasminreis, frischem Marktgemüse und geröstetem Sesam.', 14.90);

-- MAIN COURSES (salads)
INSERT INTO dish (id, category, name, ingredients, price) VALUES
(13, 'main_course', 'Caesar Salad',          'Knackiger Römersalat, hausgemachtes Caesar-Dressing, knusprige Croutons und gehobelter Parmesan.', 13.90),
(14, 'main_course', 'Bunter Salatteller',    'Knackige Blattsalate, frische Tomaten, Karotten und Rucola mit unserem fruchtigen Balsamico-Dressing.', 11.90);

-- MAIN COURSES (neapolitan pizza)
INSERT INTO dish (id, category, name, ingredients, price) VALUES
(15, 'main_course', 'Margherita',            'Fruchtige Tomatensauce, cremiger Mozzarella, Parmesan und frisches Basilikum.', 11.90),
(16, 'main_course', 'Diavola',               'Scharfe Salami, Chiliöl, Mozzarella, Parmesan und fruchtige Tomatensauce.', 14.90),
(17, 'main_course', 'Burrata e Crudo',       'Zarter Prosciutto, frische Tomatensauce, Parmesan, Cherrytomaten, Rucola und cremige Burrata.', 15.90),
(18, 'main_course', 'Thunfisch',             'Zarter Thunfisch, rote Zwiebeln, Kapern, Mozzarella, Parmesan und Tomatensauce.', 14.90),
(19, 'main_course', 'Gemüse-Pizza',          'Frisches saisonales Gemüse, fruchtige Tomatensauce, Mozzarella, Rucola und Parmesan.', 13.90);

-- MAIN COURSES (soups)
INSERT INTO dish (id, category, name, ingredients, price) VALUES
(20, 'main_course', 'Hausgemachte Rindsuppe', 'Kräftige Brühe mit hausgemachten Frittaten und Schnittlauch.', 5.90),
(21, 'main_course', 'Saisonale Cremesuppe',   'Samtig püriert aus feinstem saisonalen Gemüse.', 6.90);

-- SIDES
INSERT INTO dish (id, category, name, ingredients, price) VALUES
(22, 'side', 'Steakhouse Pommes',        NULL, 6.90),
(23, 'side', 'Babykartoffeln in Butter', NULL, 6.90),
(24, 'side', 'Kleiner gemischter Salat', NULL, 7.90),
(25, 'side', 'Hausgemachter Krautsalat', NULL, 5.90);

-- DESSERTS
INSERT INTO dish (id, category, name, ingredients, price) VALUES
(26, 'dessert', 'Beeren Brownie', 'Saftiger Schokoladen-Brownie mit frischen Waldbeeren.', 9.90),
(27, 'dessert', 'Tiramisu',       'Der italienische Klassiker, cremig und hausgemacht.', 8.90);

ALTER SEQUENCE dish_seq RESTART WITH 28;

-- ============================================================
-- DRINK SEED DATA (from Hamta_Drinks.pdf)
-- ============================================================

-- APERITIFS
INSERT INTO drink (id, category, name, description, price) VALUES
(1,  'aperitif', 'Lillet Wild Berry',  'Lillet Blanc, Schweppes Wild Berry, frische Beeren (0,25 l)', 8.50),
(2,  'aperitif', 'Aperol Spritz',      'Aperol, Prosecco, Soda, frische Orange (0,25 l)', 7.90),
(3,  'aperitif', 'Hugo',               'Prosecco, Holundersirup, frische Minze, Limette (0,25 l)', 7.90),
(4,  'aperitif', 'Campari Soda',       'Der klassisch herbe Aperitif aus Italien (0,25 l)', 6.50);

-- COCKTAILS
INSERT INTO drink (id, category, name, description, price) VALUES
(5,  'cocktail', 'Espresso Martini',   'Wodka, Kaffeelikör, frischer Espresso, Zuckersirup (0,20 l)', 11.90),
(6,  'cocktail', 'Negroni',            'Gin, roter Wermut, Campari, Orangenzeste (0,20 l)', 11.90),
(7,  'cocktail', 'Cosmopolitan',       'Wodka, Cointreau, Cranberrysaft, Limette (0,20 l)', 11.50),
(8,  'cocktail', 'Mojito',             'Weißer Rum, Fever-Tree Minze, Limette, Rohrzucker, Soda (0,30 l)', 10.90),
(9,  'cocktail', 'Moscow Mule',        'Wodka, Spicy Ginger Beer, Gurke, Limette (0,30 l)', 10.90),
(10, 'cocktail', 'Gin Tonic',          'Premium Dry Gin, feines Tonic Water, Botanicals (0,25 l)', 10.50);

-- MOCKTAILS
INSERT INTO drink (id, category, name, description, price) VALUES
(11, 'mocktail', 'Mango Refresher',    'Mangonektar, frischer Ingwer, Limette, Tonic Water (0,30 l)', 8.90),
(12, 'mocktail', 'Virgin Mojito',      'Frische Minze, Limette, Rohrzucker, Ginger Ale (0,30 l)', 7.90);

-- BEER
INSERT INTO drink (id, category, name, description, price) VALUES
(13, 'beer', 'Freistädter Ratsherrn Prem. Groß (0,50 l)',  'Fassbier, feinhopfig und edel', 5.50),
(14, 'beer', 'Freistädter Ratsherrn Prem. Klein (0,33 l)', 'Fassbier, feinhopfig und edel', 4.50),
(15, 'beer', 'Freistädter Bio Zwickl (0,33 l)',            'Flaschenbier, naturtrüb', 4.50),
(16, 'beer', 'Freistädter Hell Alkoholfrei (0,50 l)',      'Voller Geschmack ohne Alkohol', 4.90),
(17, 'beer', 'Freistädter Grapefruit Radler (0,50 l)',     'Alkoholfrei, fruchtig-herb', 4.90);

-- COFFEE & TEA
INSERT INTO drink (id, category, name, description, price) VALUES
(18, 'coffee', 'Café Latte / Latte Macchiato',          'Schichten aus heißer Milch, Espresso und Milchschaum', 5.20),
(19, 'coffee', 'Heisse Schokolade',                     'Cremige Vollmilchschokolade, auf Wunsch mit Schlagobers', 5.20),
(20, 'coffee', 'Schwarztee / Grüner Tee / Früchtetee', 'Serviert im Kännchen. Verschiedene Sorten auf Anfrage.', 4.90),
(21, 'coffee', 'Cappuccino',                            'Espresso mit viel heißer Milch und fester Schaumkrone', 4.80),
(22, 'coffee', 'Doppelter Espresso',                   'Die doppelte Dosis für einen intensiven Genuss', 4.80),
(23, 'coffee', 'Verlängerter',                         'Ein klassischer Espresso, mit heißem Wasser gestreckt', 4.00),
(24, 'coffee', 'Espresso / Espresso Macchiato',        'Kräftiger Röstkaffee, pur oder mit einem Schuss Milchschaum', 3.80);

-- SOFT DRINKS (limonaden, säfte, softdrinks & wasser)
INSERT INTO drink (id, category, name, description, price) VALUES
(25, 'soft_drink', 'Orangenlimonade',                           'Fruchtig-erfrischende Orangenlimonade', 4.20),
(26, 'soft_drink', 'Maracujalimonade',                          'Tropisch-erfrischende Maracujalimonade', 4.20),
(27, 'soft_drink', 'Kräuterlimonade',                           'Süße Alpenkräuterlimonade', 4.20),
(28, 'soft_drink', 'Coca-Cola',                                 'Der klassische Cola-Geschmack', 4.20),
(29, 'soft_drink', 'Coca-Cola Zero',                            'Cola-Genuss ohne Zucker', 4.20),
(30, 'soft_drink', 'Saft pur (0,25 l)',                         'Apfel naturtrüb, Orange, Johannisbeere, Multivitamin, Maracuja, Mango, Erdbeere', 3.80),
(31, 'soft_drink', 'Saftschorle mit Soda (0,50 l)',             'Apfel naturtrüb, Orange, Johannisbeere, Multivitamin, Maracuja, Mango, Erdbeere', 4.90),
(32, 'soft_drink', 'Saftschorle mit Leitungswasser (0,50 l)',   'Apfel naturtrüb, Orange, Johannisbeere, Multivitamin, Maracuja, Mango, Erdbeere', 4.50),
(33, 'soft_drink', 'Vöslauer Still / Prickelnd Groß (0,75 l)', NULL, 5.50),
(34, 'soft_drink', 'Red Bull (0,25 l)',                         NULL, 4.50),
(35, 'soft_drink', 'Soda Zitrone Groß (0,50 l)',               NULL, 4.50),
(36, 'soft_drink', 'Almdudler (0,35 l)',                       NULL, 4.20),
(37, 'soft_drink', 'Coca-Cola / Coca-Cola Zero (0,33 l)',      NULL, 4.20),
(38, 'soft_drink', 'Vöslauer Still / Prickelnd (0,33 l)',      NULL, 3.50),
(39, 'soft_drink', 'Soda Zitrone Klein (0,25 l)',              NULL, 3.50),
(40, 'soft_drink', 'Leitungswasser mit/ohne Zitrone (0,50 l)', NULL, 2.10);

ALTER SEQUENCE drink_seq RESTART WITH 41;
