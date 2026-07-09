/** Kategorien entsprechen den Backend-Entities (Starter, MainCourse, …). */
export type CategoryId = 'starter' | 'main_course' | 'dessert' | 'cocktail' | 'beverage';

export interface Category {
  id: CategoryId;
  label: string;
  /** Getränke (Beverage) haben keine Zutaten-Angabe. */
  hasZutaten: boolean;
}

export const CATEGORIES: Category[] = [
  { id: 'starter', label: 'Vorspeisen', hasZutaten: true },
  { id: 'main_course', label: 'Hauptspeisen', hasZutaten: true },
  { id: 'dessert', label: 'Desserts', hasZutaten: true },
  { id: 'cocktail', label: 'Cocktails', hasZutaten: true },
  { id: 'beverage', label: 'Getränke', hasZutaten: false },
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
