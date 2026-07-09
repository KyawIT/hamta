/**
 * Kategorien spiegeln die öffentliche Website (Speise- und Getränkekarte).
 *
 * `backendId` verknüpft jede Frontend-Kategorie mit der numerischen ID der
 * echten Category-Entity im Backend (`GET /api/categories`, Seed 1–16). Die
 * Gruppe `speisen`/`getraenke` entscheidet zugleich, ob ein Eintrag an
 * `/api/dishes` (Speise) oder `/api/drinks` (Getränk) geht.
 *
 * Später könnten die Kategorien komplett aus dem Backend geladen werden; bis
 * dahin ist diese Liste die Brücke zwischen sprechender ID und Backend-ID.
 */
export type CategoryGroup = 'speisen' | 'getraenke';

export interface Category {
  id: string;
  label: string;
  group: CategoryGroup;
  /** ID der zugehörigen Category-Entity im Backend. */
  backendId: number;
}

export type CategoryId = string;

export const CATEGORY_GROUPS: { id: CategoryGroup; label: string }[] = [
  { id: 'speisen', label: 'Speisen' },
  { id: 'getraenke', label: 'Getränke' },
];

export const CATEGORIES: Category[] = [
  // Speisen
  { id: 'vorspeisen', label: 'Vorspeisen', group: 'speisen', backendId: 1 },
  { id: 'steaks', label: 'Steaks', group: 'speisen', backendId: 2 },
  { id: 'hauptspeisen', label: 'Hauptspeisen', group: 'speisen', backendId: 3 },
  { id: 'salate', label: 'Salate', group: 'speisen', backendId: 4 },
  { id: 'pizza', label: 'Pizza', group: 'speisen', backendId: 5 },
  { id: 'suppen', label: 'Suppen', group: 'speisen', backendId: 6 },
  { id: 'beilagen', label: 'Beilagen', group: 'speisen', backendId: 7 },
  { id: 'desserts', label: 'Desserts', group: 'speisen', backendId: 8 },
  // Getränke
  { id: 'aperitifs', label: 'Aperitifs', group: 'getraenke', backendId: 9 },
  { id: 'cocktails', label: 'Cocktails', group: 'getraenke', backendId: 10 },
  { id: 'mocktails', label: 'Mocktails', group: 'getraenke', backendId: 11 },
  { id: 'bier', label: 'Bier', group: 'getraenke', backendId: 12 },
  { id: 'kaffee-tee', label: 'Kaffee & Tee', group: 'getraenke', backendId: 13 },
  { id: 'limonaden', label: 'Limonaden', group: 'getraenke', backendId: 14 },
  { id: 'saefte', label: 'Fruchtsäfte & Schorlen', group: 'getraenke', backendId: 15 },
  { id: 'softdrinks', label: 'Softdrinks & Wasser', group: 'getraenke', backendId: 16 },
];

export interface Dish {
  id: number;
  category: CategoryId;
  name: string;
  zutaten: string;
  /** Preis in Euro; null = noch nicht gesetzt. */
  preis: number | null;
  imageUrl?: string;
  /** ID des verknüpften Bildes im Backend (MinIO), falls vorhanden. */
  imageId?: number | null;
}

/** Felder, die beim Anlegen/Bearbeiten aus dem Formular kommen. */
export type DishInput = Omit<Dish, 'id'>;
