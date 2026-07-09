import { Injectable, computed, signal } from '@angular/core';

export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
}

/** Maximale Anzahl Bilder in der Startseiten-Galerie. */
export const MAX_GALLERY_IMAGES = 10;

/**
 * Verwaltung der Startseiten-Galerie – vorerst rein im Speicher.
 *
 * Die öffentliche API (images / add / updateCaption / remove / move) bleibt
 * stabil; später wird die In-Memory-Logik gegen HTTP/Upload ans Backend getauscht.
 */
@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly items = signal<GalleryImage[]>(SAMPLE_IMAGES);
  private nextId = SAMPLE_IMAGES.length + 1;

  readonly images = this.items.asReadonly();
  readonly count = computed(() => this.items().length);
  readonly isFull = computed(() => this.items().length >= MAX_GALLERY_IMAGES);
  readonly remaining = computed(() => MAX_GALLERY_IMAGES - this.items().length);

  /** Fügt ein Bild hinzu; false, wenn das Limit erreicht ist. */
  add(url: string, caption = ''): boolean {
    if (this.isFull()) return false;
    this.items.update((list) => [...list, { id: this.nextId++, url, caption }]);
    return true;
  }

  updateCaption(id: number, caption: string): void {
    this.items.update((list) => list.map((img) => (img.id === id ? { ...img, caption } : img)));
  }

  remove(id: number): void {
    this.items.update((list) => list.filter((img) => img.id !== id));
  }

  /** Verschiebt ein Bild um eine Position nach vorne (-1) oder hinten (+1). */
  move(id: number, direction: -1 | 1): void {
    this.items.update((list) => {
      const index = list.findIndex((img) => img.id === id);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= list.length) return list;
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }
}

const SAMPLE_IMAGES: GalleryImage[] = [
  { id: 1, url: '/assets/Image3.jpeg', caption: 'Frisch gebackene Pizzen am Küchenpass' },
  { id: 2, url: '/foods/food-9.jpg', caption: 'Kreativ angerichtete Vorspeise' },
  { id: 3, url: '/assets/Image7.jpeg', caption: 'Fein angerichteter Teller mit frischen Beeren' },
  { id: 4, url: '/assets/Image5.jpeg', caption: 'Modern präsentierter Gang aus der Küche' },
  { id: 5, url: '/assets/Image17.jpeg', caption: 'Sorgfältig angerichteter Teller auf hellem Holz' },
  { id: 6, url: '/assets/Image10.jpeg', caption: 'Gedeckter Tisch mit einem frischen Gericht' },
  { id: 7, url: '/assets/Image22.jpeg', caption: 'Dessert mit Schokolade und Fruchtsauce' },
  { id: 8, url: '/assets/Image23.jpeg', caption: 'Dessert auf handglasierter Keramik' },
];
