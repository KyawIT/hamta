import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuBoardComponent, MenuCategory } from '../../shared/menu-board/menu-board.component';

export type { MenuItem, MenuCategory } from '../../shared/menu-board/menu-board.component';

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'vorspeisen', label: 'Vorspeisen', items: [
    { name: 'Beef Tatar (120 g)', description: 'Zartes Rindfleisch, feines Wachtelei, hausgemachte Trüffel-Mayo, serviert mit knusprigem Toastbrot.', price: '€ 14,90' },
    { name: 'Cremige Burrata', description: 'Auf frischem Rucola mit hausgemachtem Basilikum-Pesto, feinem Tomaten-Carpaccio und bestem Olivenöl. Inklusive Brot.', price: '€ 12,90', highlight: true },
    { name: 'Knoblauchgarnelen', description: 'In feinem Olivenöl gebraten, mit frischer Chili, Knoblauch und knusprigem Brot.', price: '€ 14,90' },
    { name: 'Antipasti-Teller', description: 'Auswahl an Käse, Oliven, hausgemachtem eingelegtem Gemüse, pikanter Salami, zartem Prosciutto und Kapern. Inklusive Brot.', price: '€ 12,90 (kl) / € 16,90 (gr)' },
  ] },
  { id: 'steaks', label: 'Steaks', items: [
    { name: '220g Rinderfilet', description: 'Das zarteste Stück vom Rind, perfekt auf den Punkt für Sie gegrillt. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', price: '€ 35,90', highlight: true },
    { name: '300g Ribeye Steak', description: 'Saftig und unglaublich geschmacksintensiv durch das feine Fettauge. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', price: '€ 32,90' },
    { name: 'Flank Steak', description: 'Kräftig im Geschmack, schonend mariniert und zart gegrillt. Mit marktfrischem Gemüse und hausgemachter Kräuterbutter.', price: '€ 24,90' },
  ] },
  { id: 'hauptspeisen', label: 'Hauptspeisen', items: [
    { name: 'Saisonales Risotto', description: 'Cremiges Risotto mit frischem Parmesan, knackigem Rucola und süßen Schmortomaten.', price: '€ 14,90' },
    { name: 'Angus Beef Burger (180 g)', description: 'Saftiges Angus-Rindfleisch, rauchige BBQ-Sauce, Tomate, Speck, serviert mit Steakfrites und Salat.', price: '€ 17,90', highlight: true },
    { name: 'Trüffel-Pasta', description: 'Al dente Linguine in einer cremigen, edlen schwarzen Trüffelsauce, verfeinert mit Parmesan.', price: '€ 18,90' },
    { name: 'Veganes Thai-Curry', description: 'Aromatisch-cremiges Curry mit duftendem Jasminreis, frischem Marktgemüse und geröstetem Sesam.', price: '€ 14,90' },
  ] },
  { id: 'salate', label: 'Salate', items: [
    { name: 'Caesar Salad', description: 'Knackiger Römersalat, hausgemachtes Caesar-Dressing, knusprige Croutons und gehobelter Parmesan.', price: '€ 13,90', highlight: true },
    { name: 'Bunter Salatteller', description: 'Knackige Blattsalate, frische Tomaten, Karotten und Rucola mit unserem fruchtigen Balsamico-Dressing.', price: '€ 11,90' },
    { name: 'Salat-Toppings', description: 'Veredeln Sie Ihren Salat: Hühnerfilet +5,50 € · Rinderfiletspitzen +7,90 € · Garnelen +7,90 € · Lachsforellenfilet +8,90 €.', price: 'ab € 5,50' },
  ] },
  { id: 'pizza', label: 'Pizza', items: [
    { name: 'Margherita', description: 'Fruchtige Tomatensauce, cremiger Mozzarella, Parmesan und frisches Basilikum.', price: '€ 11,90', highlight: true },
    { name: 'Diavola', description: 'Scharfe Salami, Chiliöl, Mozzarella, Parmesan und fruchtige Tomatensauce.', price: '€ 14,90' },
    { name: 'Burrata e Crudo', description: 'Zarter Prosciutto, frische Tomatensauce, Parmesan, Cherrytomaten, Rucola und cremige Burrata.', price: '€ 15,90' },
    { name: 'Thunfisch', description: 'Zarter Thunfisch, rote Zwiebeln, Kapern, Mozzarella, Parmesan und Tomatensauce.', price: '€ 14,90' },
    { name: 'Gemüse-Pizza', description: 'Frisches saisonales Gemüse, fruchtige Tomatensauce, Mozzarella, Rucola und Parmesan.', price: '€ 13,90' },
  ] },
  { id: 'suppen', label: 'Suppen', items: [
    { name: 'Hausgemachte Rindsuppe', description: 'Kräftige Brühe mit hausgemachten Frittaten und Schnittlauch.', price: '€ 5,90' },
    { name: 'Saisonale Cremesuppe', description: 'Samtig püriert aus feinstem saisonalen Gemüse.', price: '€ 6,90' },
  ] },
  { id: 'beilagen', label: 'Beilagen', items: [
    { name: 'Steakhouse Pommes', description: 'Knusprige Steakhouse-Pommes.', price: '€ 6,90' },
    { name: 'Babykartoffeln in Butter', description: 'Zarte Babykartoffeln in Butter geschwenkt.', price: '€ 6,90' },
    { name: 'Kleiner gemischter Salat', description: 'Frischer gemischter Blattsalat.', price: '€ 7,90' },
    { name: 'Hausgemachter Krautsalat', description: 'Traditioneller hausgemachter Krautsalat.', price: '€ 5,90' },
    { name: 'Dips', description: 'Ketchup, Mayonnaise, Cocktail-Sauce, hausgemachte Trüffel-Mayo oder Sauerrahm.', price: 'je € 1,90' },
  ] },
  { id: 'desserts', label: 'Desserts', items: [
    { name: 'Beeren Brownie', description: 'Saftiger Schokoladen-Brownie mit frischen Waldbeeren.', price: '€ 9,90', highlight: true },
    { name: 'Tiramisu', description: 'Der italienische Klassiker, cremig und hausgemacht.', price: '€ 8,90' },
  ] },
];

@Component({
  selector: 'app-menu-section',
  imports: [MenuBoardComponent],
  template: `
    <app-menu-board
      sectionId="menu"
      bgImage="/assets/Image10.jpeg"
      surface="#0e0e0e"
      eyebrow="Unsere Speisekarte"
      headingBefore="Klassiker, die"
      headingEmphasis="bleiben"
      intro="Von Vorspeisen und Steaks über Hauptspeisen und Pizza bis zu Suppen, Beilagen und Desserts. Die folgende Auswahl dient als Beispielkarte und kann saisonal variieren."
      [categories]="categories" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  readonly categories = MENU_CATEGORIES;
}
