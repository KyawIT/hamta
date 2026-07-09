/**
 * Kategorien spiegeln die öffentliche Website (Speise- und Getränkekarte).
 *
 * Hinweis fürs Backend: dort gibt es aktuell nur 5 grobe Tabellen. Sauber
 * wäre eine echte Category-Entity, damit diese Feingliederung 1:1 abbildbar
 * ist. Bis dahin ist diese Liste die Quelle der Wahrheit im Frontend.
 */
export type CategoryGroup = 'speisen' | 'getraenke';

export interface Category {
  id: string;
  label: string;
  group: CategoryGroup;
}

export type CategoryId = string;

export const CATEGORY_GROUPS: { id: CategoryGroup; label: string }[] = [
  { id: 'speisen', label: 'Speisen' },
  { id: 'getraenke', label: 'Getränke' },
];

export const CATEGORIES: Category[] = [
  // Speisen
  { id: 'vorspeisen', label: 'Vorspeisen', group: 'speisen' },
  { id: 'steaks', label: 'Steaks', group: 'speisen' },
  { id: 'hauptspeisen', label: 'Hauptspeisen', group: 'speisen' },
  { id: 'salate', label: 'Salate', group: 'speisen' },
  { id: 'pizza', label: 'Pizza', group: 'speisen' },
  { id: 'suppen', label: 'Suppen', group: 'speisen' },
  { id: 'beilagen', label: 'Beilagen', group: 'speisen' },
  { id: 'desserts', label: 'Desserts', group: 'speisen' },
  // Getränke
  { id: 'aperitifs', label: 'Aperitifs', group: 'getraenke' },
  { id: 'cocktails', label: 'Cocktails', group: 'getraenke' },
  { id: 'mocktails', label: 'Mocktails', group: 'getraenke' },
  { id: 'bier', label: 'Bier', group: 'getraenke' },
  { id: 'kaffee-tee', label: 'Kaffee & Tee', group: 'getraenke' },
  { id: 'limonaden', label: 'Mü4tla Limonaden', group: 'getraenke' },
  { id: 'saefte', label: 'Fruchtsäfte & Schorlen', group: 'getraenke' },
  { id: 'softdrinks', label: 'Softdrinks & Wasser', group: 'getraenke' },
];

export interface Dish {
  id: number;
  category: CategoryId;
  name: string;
  zutaten: string;
  /** Preis in Euro; null = noch nicht gesetzt. */
  preis: number | null;
  imageUrl?: string;
}

/** Felder, die beim Anlegen/Bearbeiten aus dem Formular kommen. */
export type DishInput = Omit<Dish, 'id'>;
