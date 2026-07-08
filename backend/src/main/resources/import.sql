-- ============================================================
-- IMAGES
-- ============================================================
INSERT INTO image (id, url) VALUES (1,  'assets/antipasti-board.jpeg');
INSERT INTO image (id, url) VALUES (2,  'assets/tuna-tataki.jpeg');
INSERT INTO image (id, url) VALUES (3,  'assets/neapolitan-pizza-margherita.jpeg');
INSERT INTO image (id, url) VALUES (4,  'assets/teriyaki-glazed-fish-on-seaweed.jpeg');
INSERT INTO image (id, url) VALUES (5,  'assets/grilled-shrimp-on-avocado-cream.jpeg');
INSERT INTO image (id, url) VALUES (6,  'assets/grilled-octopus-with-scallops.jpeg');
INSERT INTO image (id, url) VALUES (7,  'assets/grilled-goat-cheese-with-honeycomb.jpeg');
INSERT INTO image (id, url) VALUES (8,  'assets/beef-steak-with-broccolini.jpeg');
INSERT INTO image (id, url) VALUES (9,  'assets/fish-tartare-tower.jpeg');
INSERT INTO image (id, url) VALUES (10, 'assets/salmon-ravioli-in-cream-sauce.jpeg');
INSERT INTO image (id, url) VALUES (11, 'assets/crepes-with-chocolate-and-fruits.jpeg');
INSERT INTO image (id, url) VALUES (12, 'assets/sushi-trio.jpeg');
INSERT INTO image (id, url) VALUES (13, 'assets/beef-open-sandwich.jpeg');
INSERT INTO image (id, url) VALUES (14, 'assets/beef-fillet-with-stuffed-pepper.jpeg');
INSERT INTO image (id, url) VALUES (15, 'assets/beef-tartare.jpeg');
INSERT INTO image (id, url) VALUES (16, 'assets/fig-and-berry-dessert.jpeg');
INSERT INTO image (id, url) VALUES (17, 'assets/mango-sorbet-with-berry-coulis.jpeg');
INSERT INTO image (id, url) VALUES (18, 'assets/teriyaki-glazed-tofu-and-vegetables.jpeg');
INSERT INTO image (id, url) VALUES (19, 'assets/pastry-ball-with-caramelized-fruits.jpeg');
INSERT INTO image (id, url) VALUES (20, 'assets/chocolate-fondant-lava-cake.jpeg');
INSERT INTO image (id, url) VALUES (21, 'assets/vegetable-terrine-with-beet-sauce.jpeg');
ALTER SEQUENCE image_seq RESTART WITH 22;

-- ============================================================
-- STARTERS
-- ============================================================
INSERT INTO starter (id, name, zutaten, preis, image_id) VALUES
(1, 'Antipasti Board',
 'Burrata, Prosciutto, Nduja, Olives, Cherry Tomatoes, Arugula, Parmesan, Capers, Herb Oil',
 18.90, 1);

INSERT INTO starter (id, name, zutaten, preis, image_id) VALUES
(2, 'Tuna Tataki',
 'Fresh Tuna, Avocado Mousse, Mango, Sesame Seeds, Soy Glaze, Microgreens, Truffle',
 16.50, 2);

INSERT INTO starter (id, name, zutaten, preis, image_id) VALUES
(3, 'Teriyaki Glazed Fish on Seaweed',
 'Fish Fillet, Seaweed, Teriyaki Glaze, Black Sesame, Crispy Glass Noodles, Fresh Herbs',
 14.90, 4);

INSERT INTO starter (id, name, zutaten, preis, image_id) VALUES
(4, 'Grilled Shrimp on Avocado Cream',
 'Tiger Shrimp, Avocado Cream, Herb Oil, Orange Oil, Beet Crisp, Microgreens, Black Salt',
 15.90, 5);

INSERT INTO starter (id, name, zutaten, preis, image_id) VALUES
(5, 'Grilled Goat Cheese with Honeycomb',
 'Goat Cheese, Honeycomb, Blueberries, Pomegranate Seeds, Arugula, Walnut, Pear, Honey',
 13.90, 7);

INSERT INTO starter (id, name, zutaten, preis, image_id) VALUES
(6, 'Fish Tartare Tower',
 'Fresh Fish Tartare, Avocado, Radish, Black Sesame, Microgreens, Herb Cream, Squid Ink',
 14.50, 9);

INSERT INTO starter (id, name, zutaten, preis, image_id) VALUES
(7, 'Sushi Trio',
 'Salmon Nigiri, Maki Roll, Cucumber Salad, Soy Sauce, Wasabi, Sesame, Edible Flowers',
 16.90, 12);

INSERT INTO starter (id, name, zutaten, preis, image_id) VALUES
(8, 'Beef Tartare',
 'Beef Tenderloin, Capers, Pickled Vegetables, Parmesan Chips, Aioli, Edible Flowers, Beetroot',
 17.50, 15);

INSERT INTO starter (id, name, zutaten, preis, image_id) VALUES
(9, 'Vegetable Terrine with Beet Sauce',
 'Mixed Vegetables, Beetroot Sauce, Roasted Vegetables, Microgreens, Dried Orange Chips',
 12.90, 21);

ALTER SEQUENCE starter_seq RESTART WITH 10;

-- ============================================================
-- MAIN COURSES
-- ============================================================
INSERT INTO main_course (id, name, zutaten, preis, image_id) VALUES
(1, 'Neapolitan Pizza Margherita',
 'Pizza Dough, San Marzano Tomatoes, Mozzarella Fior di Latte, Fresh Basil, Olive Oil',
 14.90, 3);

INSERT INTO main_course (id, name, zutaten, preis, image_id) VALUES
(2, 'Grilled Octopus with Scallops',
 'Octopus, Scallops, Romanesco, Purple Cauliflower, Green Cream Sauce, Dill, Chili',
 28.90, 6);

INSERT INTO main_course (id, name, zutaten, preis, image_id) VALUES
(3, 'Beef Steak with Broccolini',
 'Ribeye Steak, Tenderstem Broccolini, Potato Rösti, Red Wine Jus, Microgreens',
 32.90, 8);

INSERT INTO main_course (id, name, zutaten, preis, image_id) VALUES
(4, 'Salmon Ravioli in Cream Sauce',
 'Ravioli, Smoked Salmon, Cream Sauce, Peas, Radish, Dill, Herb Oil, Edible Flowers',
 22.90, 10);

INSERT INTO main_course (id, name, zutaten, preis, image_id) VALUES
(5, 'Beef Open Sandwich',
 'Sliced Beef, Flatbread, Arugula, Cherry Tomatoes, Alfalfa Sprouts, Roasted Potatoes, Aioli',
 19.90, 13);

INSERT INTO main_course (id, name, zutaten, preis, image_id) VALUES
(6, 'Beef Fillet with Stuffed Pepper',
 'Beef Medallion, Herb Butter, Stuffed Bell Pepper, Broccoli, Seasonal Vegetables, Edible Flowers',
 34.90, 14);

INSERT INTO main_course (id, name, zutaten, preis, image_id) VALUES
(7, 'Teriyaki Glazed Tofu & Vegetables',
 'Tofu, Eggplant, Zucchini, Teriyaki Sauce, Sesame Seeds, Cherry Tomatoes, Mustard Cream',
 18.90, 18);

ALTER SEQUENCE main_course_seq RESTART WITH 8;

-- ============================================================
-- DESSERTS
-- ============================================================
INSERT INTO dessert (id, name, zutaten, preis, image_id) VALUES
(1, 'Crêpes with Chocolate & Fruits',
 'Crêpes, Dark Chocolate Sauce, Kiwi, Raspberry, Strawberry, Red Currants, Physalis, Powdered Sugar, Mint',
 10.90, 11);

INSERT INTO dessert (id, name, zutaten, preis, image_id) VALUES
(2, 'Fig & Berry Dessert',
 'Fresh Figs, Blueberries, Red Berry Coulis, Cream, Hops, Physalis, Caramel Pearls',
 11.90, 16);

INSERT INTO dessert (id, name, zutaten, preis, image_id) VALUES
(3, 'Mango Sorbet with Berry Coulis',
 'Mango Sorbet, Red Currants, Raspberry, Fresh Mint, Physalis, Caramelized Orange Peel, Berry Coulis',
 9.90, 17);

INSERT INTO dessert (id, name, zutaten, preis, image_id) VALUES
(4, 'Pastry Ball with Caramelized Fruits',
 'Fried Pastry, Caramelized Apricots, Strawberry, Mint, Physalis, Powdered Sugar, Caramel Sauce',
 10.50, 19);

INSERT INTO dessert (id, name, zutaten, preis, image_id) VALUES
(5, 'Chocolate Fondant Lava Cake',
 'Dark Chocolate, Butter, Eggs, Berry Coulis, Strawberry, Blueberries, Mint, Powdered Sugar, Physalis',
 11.50, 20);

ALTER SEQUENCE dessert_seq RESTART WITH 6;
