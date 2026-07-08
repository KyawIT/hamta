import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuBoardComponent, MenuCategory } from '../../shared/menu-board/menu-board.component';

export const DRINK_CATEGORIES: MenuCategory[] = [
  { id: 'aperitifs', label: 'Aperitifs', items: [
    { name: 'Lillet Wild Berry', description: 'Lillet Blanc, Schweppes Wild Berry, frische Beeren (0,25 l).', price: '€ 8,50', highlight: true },
    { name: 'Aperol Spritz', description: 'Aperol, Prosecco, Soda, frische Orange (0,25 l).', price: '€ 7,90' },
    { name: 'Hugo', description: 'Prosecco, Holundersirup, frische Minze, Limette (0,25 l).', price: '€ 7,90' },
    { name: 'Campari Soda', description: 'Der klassisch herbe Aperitif aus Italien (0,25 l).', price: '€ 6,50' },
  ] },
  { id: 'cocktails', label: 'Cocktails', items: [
    { name: 'Espresso Martini', description: 'Wodka, Kaffeelikör, frischer Espresso, Zuckersirup (0,20 l).', price: '€ 11,90', highlight: true },
    { name: 'Negroni', description: 'Gin, roter Wermut, Campari, Orangenzeste (0,20 l).', price: '€ 11,90' },
    { name: 'Cosmopolitan', description: 'Wodka, Cointreau, Cranberrysaft, Limette (0,20 l).', price: '€ 11,50' },
    { name: 'Mojito', description: 'Weißer Rum, Fever-Tree Minze, Limette, Rohrzucker, Soda (0,30 l).', price: '€ 10,90' },
    { name: 'Moscow Mule', description: 'Wodka, Spicy Ginger Beer, Gurke, Limette (0,30 l).', price: '€ 10,90' },
    { name: 'Gin Tonic', description: 'Premium Dry Gin, feines Tonic Water, Botanicals (0,25 l).', price: '€ 10,50' },
  ] },
  { id: 'mocktails', label: 'Mocktails', items: [
    { name: 'Mango Refresher', description: 'Mangonektar, frischer Ingwer, Limette, Tonic Water (0,30 l).', price: '€ 8,90' },
    { name: 'Virgin Mojito', description: 'Frische Minze, Limette, Rohrzucker, Ginger Ale (0,30 l).', price: '€ 7,90' },
  ] },
  { id: 'bier', label: 'Bier', items: [
    { name: 'Freistädter Ratsherrn Prem. Gross', description: 'Fassbier, feinhopfig und edel (0,50 l).', price: '€ 5,50', highlight: true },
    { name: 'Freistädter Ratsherrn Prem. Klein', description: 'Fassbier, feinhopfig und edel (0,33 l).', price: '€ 4,50' },
    { name: 'Freistädter Bio Zwickl', description: 'Flaschenbier, naturtrüb (0,33 l).', price: '€ 4,50' },
    { name: 'Freistädter Hell Alkoholfrei', description: 'Voller Geschmack ohne Alkohol (0,50 l).', price: '€ 4,90' },
    { name: 'Freistädter Grapefruit Radler', description: 'Alkoholfrei, fruchtig-herb (0,50 l).', price: '€ 4,90' },
  ] },
  { id: 'kaffee-tee', label: 'Kaffee & Tee', items: [
    { name: 'Café Latte / Latte Macchiato', description: 'Schichten aus heißer Milch, Espresso und Milchschaum.', price: '€ 5,20' },
    { name: 'Heisse Schokolade', description: 'Cremige Vollmilchschokolade, auf Wunsch mit Schlagobers.', price: '€ 5,20' },
    { name: 'Schwarztee / Grüner Tee / Früchtetee', description: 'Serviert im Kännchen. Verschiedene Sorten auf Anfrage.', price: '€ 4,90' },
    { name: 'Cappuccino', description: 'Espresso mit viel heißer Milch und fester Schaumkrone.', price: '€ 4,80' },
    { name: 'Doppelter Espresso', description: 'Die doppelte Dosis für einen intensiven Genuss.', price: '€ 4,80' },
    { name: 'Verlängerter', description: 'Ein klassischer Espresso, mit heißem Wasser gestreckt.', price: '€ 4,00' },
    { name: 'Espresso / Espresso Macchiato', description: 'Kräftiger Röstkaffee, pur oder mit einem Schuss Milchschaum.', price: '€ 3,80' },
  ] },
  { id: 'limonaden', label: 'Mü4tla Limonaden', items: [
    { name: 'Orangenlimonade', description: 'Fruchtig-erfrischende Orangenlimonade.', price: '€ 4,20' },
    { name: 'Maracujalimonade', description: 'Tropisch-erfrischende Maracujalimonade.', price: '€ 4,20' },
    { name: 'Kräuterlimonade', description: 'Süße Alpenkräuterlimonade.', price: '€ 4,20' },
    { name: 'Coca-Cola', description: 'Der klassische Cola-Geschmack.', price: '€ 4,20' },
    { name: 'Coca-Cola Zero', description: 'Cola-Genuss ohne Zucker.', price: '€ 4,20' },
  ] },
  { id: 'saefte', label: 'Fruchtsäfte & Schorlen', items: [
    { name: 'Saftauswahl – Pur', description: 'Apfel naturtrüb, Orange, Johannisbeere, Multivitamin, Maracuja, Mango oder Erdbeere (0,25 l).', price: '€ 3,80', highlight: true },
    { name: 'Saftschorle mit Soda', description: 'Gespritzt mit Soda (0,50 l).', price: '€ 4,90' },
    { name: 'Saftschorle mit Leitungswasser', description: 'Gespritzt mit Leitungswasser (0,50 l).', price: '€ 4,50' },
  ] },
  { id: 'softdrinks', label: 'Softdrinks & Wasser', items: [
    { name: 'Vöslauer Still / Prickelnd Gross', description: 'Mineralwasser (0,75 l).', price: '€ 5,50' },
    { name: 'Red Bull', description: 'Energydrink (0,25 l).', price: '€ 4,50' },
    { name: 'Soda Zitrone Gross', description: 'Soda mit Zitrone (0,50 l).', price: '€ 4,50' },
    { name: 'Almdudler', description: 'Alpenkräuterlimonade (0,35 l).', price: '€ 4,20' },
    { name: 'Coca-Cola / Coca-Cola Zero', description: 'Cola, wahlweise ohne Zucker (0,33 l).', price: '€ 4,20' },
    { name: 'Vöslauer Still / Prickelnd', description: 'Mineralwasser (0,33 l).', price: '€ 3,50' },
    { name: 'Soda Zitrone Klein', description: 'Soda mit Zitrone (0,25 l).', price: '€ 3,50' },
    { name: 'Leitungswasser mit/ohne Zitrone', description: 'Frisches Leitungswasser (0,50 l).', price: '€ 2,10' },
  ] },
];

@Component({
  selector: 'app-drinks-section',
  imports: [MenuBoardComponent],
  template: `
    <app-menu-board
      sectionId="getraenke"
      bgImage="/assets/Image14.jpeg"
      surface="#141013"
      eyebrow="Unsere Getränkekarte"
      headingBefore="Zum"
      headingEmphasis="Anstoßen"
      intro="Aperitifs, Cocktails und Klassiker aus der Bar, dazu Kaffee, hausgemachte Limonaden und erfrischende Softdrinks. Die Auswahl kann saisonal variieren."
      [categories]="categories" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrinksComponent {
  readonly categories = DRINK_CATEGORIES;
}
