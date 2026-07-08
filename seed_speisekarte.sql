-- ============================================
-- STARTER (Vorspeisen)
-- ============================================
INSERT INTO starter (id, name, zutaten, preis) VALUES
(nextval('starter_seq'), 'Beef Tatar (120 g)', 'Zartes Rindfleisch, feines Wachtelei, hausgemachte Trüffel-Mayo, serviert mit knusprigem Toastbrot.', 14.90),
(nextval('starter_seq'), 'Cremige Burrata', 'Auf frischem Rucola mit hausgemachtem Basilikum-Pesto, feinem Tomaten-Carpaccio und bestem Olivenöl. Inklusive Brot.', 12.90),
(nextval('starter_seq'), 'Knoblauchgarnelen', 'In feinem Olivenöl gebraten, mit frischer Chili, Knoblauch und knusprigem Brot.', 14.90),
(nextval('starter_seq'), 'Antipasti-Teller (klein)', 'Auswahl an Käse, Oliven, hausgemachtem eingelegtem Gemüse, pikanter Salami, zartem Prosciutto und Kapern. Inklusive Brot.', 12.90),
(nextval('starter_seq'), 'Antipasti-Teller (groß)', 'Auswahl an Käse, Oliven, hausgemachtem eingelegtem Gemüse, pikanter Salami, zartem Prosciutto und Kapern. Inklusive Brot.', 16.90);

-- ============================================
-- MAIN_COURSE (Hauptspeisen + Steaks + Salate + Pizza + Suppen + Beilagen)
-- ============================================
INSERT INTO main_course (id, name, zutaten, preis) VALUES
-- Premium Steaks
(nextval('main_course_seq'), '220g Rinderfilet', 'Das zarteste Stück vom Rind, perfekt auf den Punkt gegrillt. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', 35.90),
(nextval('main_course_seq'), '300g Ribeye Steak', 'Saftig und unglaublich geschmacksintensiv durch das feine Fettauge. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', 32.90),
(nextval('main_course_seq'), 'Flank Steak', 'Kräftig im Geschmack, schonend mariniert und zart gegrillt. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', 24.90),
-- Hauptspeisen
(nextval('main_course_seq'), 'Saisonales Risotto', 'Cremiges Risotto mit frischem Parmesan, knackigem Rucola und süßen Schmortomaten.', 14.90),
(nextval('main_course_seq'), 'Angus Beef Burger (180 g)', 'Saftiges Angus-Rindfleisch, rauchige BBQ-Sauce, Tomate, Speck, serviert mit Steakfrites und Salat.', 17.90),
(nextval('main_course_seq'), 'Trüffel-Pasta', 'Al dente Linguine in einer cremigen, edlen schwarzen Trüffelsauce, verfeinert mit Parmesan.', 18.90),
(nextval('main_course_seq'), 'Veganes Thai-Curry', 'Aromatisch-cremiges Curry mit duftendem Jasminreis, frischem Marktgemüse und geröstetem Sesam.', 14.90),
-- Knackige Salate
(nextval('main_course_seq'), 'Caesar Salad', 'Knackiger Römersalat, hausgemachtes Caesar-Dressing, knusprige Croutons und gehobelter Parmesan.', 13.90),
(nextval('main_course_seq'), 'Bunter Salatteller', 'Knackige Blattsalate, frische Tomaten, Karotten und Rucola mit unserem fruchtigen Balsamico-Dressing.', 11.90),
-- Neapolitanische Pizza
(nextval('main_course_seq'), 'Margherita', 'Fruchtige Tomatensauce, cremiger Mozzarella, Parmesan und frisches Basilikum.', 11.90),
(nextval('main_course_seq'), 'Diavola', 'Scharfe Salami, Chiliöl, Mozzarella, Parmesan und fruchtige Tomatensauce.', 14.90),
(nextval('main_course_seq'), 'Burrata e Crudo', 'Zarter Prosciutto, frische Tomatensauce, Parmesan, Cherrytomaten, Rucola und cremige Burrata.', 15.90),
(nextval('main_course_seq'), 'Thunfisch-Pizza', 'Zarter Thunfisch, rote Zwiebeln, Kapern, Mozzarella, Parmesan und Tomatensauce.', 14.90),
(nextval('main_course_seq'), 'Gemüse-Pizza', 'Frisches saisonales Gemüse, fruchtige Tomatensauce, Mozzarella, Rucola und Parmesan.', 13.90),
-- Suppen
(nextval('main_course_seq'), 'Hausgemachte Rindsuppe', 'Kräftige Brühe mit hausgemachten Frittaten und Schnittlauch.', 5.90),
(nextval('main_course_seq'), 'Saisonale Cremesuppe', 'Samtig püriert aus feinstem saisonalen Gemüse.', 6.90),
-- Beilagen & Dips
(nextval('main_course_seq'), 'Steakhouse Pommes', NULL, 6.90),
(nextval('main_course_seq'), 'Babykartoffeln in Butter', NULL, 6.90),
(nextval('main_course_seq'), 'Kleiner gemischter Salat', NULL, 7.90),
(nextval('main_course_seq'), 'Hausgemachter Krautsalat', NULL, 5.90);

-- ============================================
-- DESSERT
-- ============================================
INSERT INTO dessert (id, name, zutaten, preis) VALUES
(nextval('dessert_seq'), 'Beeren Brownie', 'Saftiger Schokoladen-Brownie mit frischen Waldbeeren.', 9.90),
(nextval('dessert_seq'), 'Tiramisu', 'Der italienische Klassiker, cremig und hausgemacht.', 8.90);

-- ============================================
-- COCKTAIL
-- ============================================
INSERT INTO cocktail (id, name, zutaten, preis) VALUES
(nextval('cocktail_seq'), 'Espresso Martini', 'Wodka, Kaffeelikör, frischer Espresso, Zuckersirup (0,20 l)', 11.90),
(nextval('cocktail_seq'), 'Negroni', 'Gin, roter Wermut, Campari, Orangenzeste (0,20 l)', 11.90),
(nextval('cocktail_seq'), 'Cosmopolitan', 'Wodka, Cointreau, Cranberrysaft, Limette (0,20 l)', 11.50),
(nextval('cocktail_seq'), 'Mojito', 'Weißer Rum, Fever-Tree Minze, Limette, Rohrzucker, Soda (0,30 l)', 10.90),
(nextval('cocktail_seq'), 'Moscow Mule', 'Wodka, Spicy Ginger Beer, Gurke, Limette (0,30 l)', 10.90),
(nextval('cocktail_seq'), 'Gin Tonic', 'Premium Dry Gin, feines Tonic Water, Botanicals (0,25 l)', 10.50);

-- ============================================
-- BEVERAGE (Aperitifs, Mocktails, Bier, Kaffee & Tee, Limonaden, Fruchtsäfte, Softdrinks)
-- ============================================
INSERT INTO beverage (id, name, preis) VALUES
-- Aperitifs
(nextval('beverage_seq'), 'Lillet Wild Berry (0,25 l)', 8.50),
(nextval('beverage_seq'), 'Aperol Spritz (0,25 l)', 7.90),
(nextval('beverage_seq'), 'Hugo (0,25 l)', 7.90),
(nextval('beverage_seq'), 'Campari Soda (0,25 l)', 6.50),
-- Mocktails
(nextval('beverage_seq'), 'Mango Refresher (0,30 l)', 8.90),
(nextval('beverage_seq'), 'Virgin Mojito (0,30 l)', 7.90),
-- Bier
(nextval('beverage_seq'), 'Freistädter Ratsherrn Prem. Groß (0,50 l)', 5.50),
(nextval('beverage_seq'), 'Freistädter Ratsherrn Prem. Klein (0,33 l)', 4.50),
(nextval('beverage_seq'), 'Freistädter Bio Zwickl (0,33 l)', 4.50),
(nextval('beverage_seq'), 'Freistädter Hell Alkoholfrei (0,50 l)', 4.90),
(nextval('beverage_seq'), 'Freistädter Grapefruit Radler (0,50 l)', 4.90),
-- Kaffee & Tee
(nextval('beverage_seq'), 'Café Latte / Latte Macchiato', 5.20),
(nextval('beverage_seq'), 'Heisse Schokolade', 5.20),
(nextval('beverage_seq'), 'Schwarztee / Grüner Tee / Früchtetee', 4.90),
(nextval('beverage_seq'), 'Cappuccino', 4.80),
(nextval('beverage_seq'), 'Doppelter Espresso', 4.80),
(nextval('beverage_seq'), 'Verlängerter', 4.00),
(nextval('beverage_seq'), 'Espresso / Espresso Macchiato', 3.80),
-- Limonaden
(nextval('beverage_seq'), 'Orangenlimonade', 4.20),
(nextval('beverage_seq'), 'Maracujalimonade', 4.20),
(nextval('beverage_seq'), 'Kräuterlimonade', 4.20),
(nextval('beverage_seq'), 'Coca-Cola', 4.20),
(nextval('beverage_seq'), 'Coca-Cola Zero', 4.20),
-- Fruchtsäfte & Schorlen (Sortenauswahl: Apfel naturtrüb, Orange, Johannisbeere, Multivitamin, Maracuja, Mango, Erdbeere)
(nextval('beverage_seq'), 'Saft pur (0,25 l)', 3.80),
(nextval('beverage_seq'), 'Saftschorle mit Soda (0,50 l)', 4.90),
(nextval('beverage_seq'), 'Saftschorle mit Leitungswasser (0,50 l)', 4.50),
-- Softdrinks & Wasser
(nextval('beverage_seq'), 'Vöslauer Still / Prickelnd Groß (0,75 l)', 5.50),
(nextval('beverage_seq'), 'Red Bull (0,25 l)', 4.50),
(nextval('beverage_seq'), 'Soda Zitrone Groß (0,50 l)', 4.50),
(nextval('beverage_seq'), 'Almdudler (0,35 l)', 4.20),
(nextval('beverage_seq'), 'Coca-Cola / Coca-Cola Zero Dose (0,33 l)', 4.20),
(nextval('beverage_seq'), 'Vöslauer Still / Prickelnd (0,33 l)', 3.50),
(nextval('beverage_seq'), 'Soda Zitrone Klein (0,25 l)', 3.50),
(nextval('beverage_seq'), 'Leitungswasser mit/ohne Zitrone (0,50 l)', 2.10);
