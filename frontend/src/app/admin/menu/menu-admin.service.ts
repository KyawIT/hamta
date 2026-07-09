import { Injectable, computed, signal } from '@angular/core';

import { CategoryId, Dish, DishInput } from './menu.model';

/**
 * Verwaltung der Speisekarte – vorerst rein im Speicher (Beispieldaten).
 *
 * Die öffentliche API (dishes / add / update / remove) bleibt stabil:
 * später wird die In-Memory-Logik gegen HTTP-Aufrufe an das Backend
 * (/api/starters usw.) getauscht, ohne dass die Komponenten sich ändern.
 */
@Injectable({ providedIn: 'root' })
export class MenuAdminService {
  private readonly items = signal<Dish[]>(SAMPLE_DISHES);
  private nextId = SAMPLE_DISHES.length + 1;

  readonly dishes = this.items.asReadonly();

  /** Gerichte einer Kategorie. */
  byCategory(category: CategoryId) {
    return computed(() => this.items().filter((d) => d.category === category));
  }

  add(input: DishInput): void {
    const dish: Dish = { ...input, id: this.nextId++ };
    this.items.update((list) => [...list, dish]);
  }

  update(id: number, input: DishInput): void {
    this.items.update((list) =>
      list.map((d) => (d.id === id ? { ...input, id } : d)),
    );
  }

  remove(id: number): void {
    this.items.update((list) => list.filter((d) => d.id !== id));
  }
}

const SAMPLE_DISHES: Dish[] = [
  {
    id: 1,
    category: 'vorspeisen',
    name: 'Beef Tatar (120 g)',
    zutaten: 'Zartes Rindfleisch, feines Wachtelei, hausgemachte Trüffel-Mayo, knuspriges Toastbrot.',
    preis: 14.9,
  },
  {
    id: 2,
    category: 'vorspeisen',
    name: 'Cremige Burrata',
    zutaten: 'Auf frischem Rucola mit Basilikum-Pesto, Tomaten-Carpaccio und bestem Olivenöl.',
    preis: 12.9,
  },
  {
    id: 3,
    category: 'steaks',
    name: '220g Rinderfilet',
    zutaten: 'Das zarteste Stück vom Rind, mit marktfrischem Gemüse und Kräuterbutter.',
    preis: 35.9,
  },
  {
    id: 4,
    category: 'hauptspeisen',
    name: 'Trüffel-Pasta',
    zutaten: 'Al dente Linguine in cremiger, edler schwarzer Trüffelsauce, mit Parmesan.',
    preis: 18.9,
  },
  {
    id: 5,
    category: 'pizza',
    name: 'Margherita',
    zutaten: 'Fruchtige Tomatensauce, cremiger Mozzarella, Parmesan und frisches Basilikum.',
    preis: 11.9,
  },
  {
    id: 6,
    category: 'desserts',
    name: 'Tiramisu',
    zutaten: 'Der italienische Klassiker, cremig und hausgemacht.',
    preis: 8.9,
  },
  {
    id: 7,
    category: 'aperitifs',
    name: 'Aperol Spritz',
    zutaten: 'Aperol, Prosecco, Soda, frische Orange (0,25 l).',
    preis: 7.9,
  },
  {
    id: 8,
    category: 'cocktails',
    name: 'Espresso Martini',
    zutaten: 'Wodka, Kaffeelikör, frischer Espresso, Zuckersirup (0,20 l).',
    preis: 11.9,
  },
];
