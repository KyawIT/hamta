import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CATEGORIES, Dish, DishInput } from './menu.model';

/**
 * Verwaltung der Speisekarte gegen das echte Backend.
 *
 * Das Backend trennt Speisen (`/api/dishes`, Feld `ingredients`) von Getränken
 * (`/api/drinks`, Feld `description`) und nutzt numerische Kategorie-IDs. Dieser
 * Service bündelt beides zu einer einheitlichen `Dish`-Liste fürs Frontend und
 * übersetzt in beide Richtungen. Anhand der Kategorie-Gruppe (speisen/getraenke)
 * wird entschieden, an welchen Endpoint eine Änderung geht.
 */
@Injectable({ providedIn: 'root' })
export class MenuAdminService {
  private readonly http = inject(HttpClient);

  private readonly items = signal<Dish[]>([]);
  readonly dishes = this.items.asReadonly();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.reload();
  }

  /** Lädt Speisen + Getränke vom Backend und vereint sie zur Frontend-Liste. */
  async reload(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [dishes, drinks] = await Promise.all([
        firstValueFrom(this.http.get<DishDto[]>('/api/dishes')),
        firstValueFrom(this.http.get<DrinkDto[]>('/api/drinks')),
      ]);
      const mapped: Dish[] = [
        ...dishes.map((d) => this.fromBackend(d, d.ingredients)),
        ...drinks.map((d) => this.fromBackend(d, d.description)),
      ];
      this.items.set(mapped);
    } catch {
      this.error.set('Speisekarte konnte nicht geladen werden.');
    } finally {
      this.loading.set(false);
    }
  }

  /** Legt ein Gericht an (Speise oder Getränk je nach Kategorie). */
  async add(input: DishInput): Promise<void> {
    await firstValueFrom(this.http.post(this.endpoint(input.category), this.toBackend(input)));
    await this.reload();
  }

  /**
   * Aktualisiert ein Gericht. Wechselt die Kategorie die Gruppe
   * (Speise ↔ Getränk), wird der Eintrag verschoben (neu anlegen + altes löschen),
   * da er in eine andere Tabelle gehört.
   */
  async update(original: Dish, input: DishInput): Promise<void> {
    if (this.isDrink(original.category) === this.isDrink(input.category)) {
      const url = `${this.endpoint(input.category)}/${original.id}`;
      await firstValueFrom(this.http.put(url, this.toBackend(input)));
    } else {
      await firstValueFrom(this.http.post(this.endpoint(input.category), this.toBackend(input)));
      await firstValueFrom(this.http.delete(`${this.endpoint(original.category)}/${original.id}`));
    }
    await this.reload();
  }

  /** Löscht ein Gericht am passenden Endpoint. */
  async remove(dish: Dish): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.endpoint(dish.category)}/${dish.id}`));
    await this.reload();
  }

  /**
   * Lädt ein Foto zum Backend (→ MinIO, verkleinert + WebP) und gibt die
   * gespeicherte Bild-ID + öffentliche URL zurück.
   */
  async uploadImage(file: File, categorySlug: string): Promise<{ id: number; url: string }> {
    const form = new FormData();
    form.append('file', file);
    return firstValueFrom(
      this.http.post<{ id: number; url: string }>(
        `/api/images/upload?category=${encodeURIComponent(categorySlug)}`,
        form,
      ),
    );
  }

  // ─── Übersetzung Frontend ↔ Backend ────────────────────────

  private isDrink(slug: string): boolean {
    return CATEGORIES.find((c) => c.id === slug)?.group === 'getraenke';
  }

  private endpoint(slug: string): string {
    return this.isDrink(slug) ? '/api/drinks' : '/api/dishes';
  }

  private backendId(slug: string): number | null {
    return CATEGORIES.find((c) => c.id === slug)?.backendId ?? null;
  }

  private slugForBackendId(id: number | null): string {
    return CATEGORIES.find((c) => c.backendId === id)?.id ?? CATEGORIES[0].id;
  }

  private fromBackend(dto: DishDto | DrinkDto, text: string | null): Dish {
    return {
      id: dto.id,
      category: this.slugForBackendId(dto.categoryId),
      name: dto.name,
      zutaten: text ?? '',
      preis: dto.price ?? null,
      imageUrl: dto.image?.url ?? undefined,
      imageId: dto.imageId ?? null,
    };
  }

  private toBackend(input: DishInput): Record<string, unknown> {
    const textField = this.isDrink(input.category) ? 'description' : 'ingredients';
    return {
      name: input.name,
      price: input.preis,
      [textField]: input.zutaten,
      categoryId: this.backendId(input.category),
      imageId: input.imageId ?? null,
    };
  }
}

// ─── Backend-Antworten (nur die genutzten Felder) ────────────

interface ImageDto {
  id: number;
  url: string;
}

interface DishDto {
  id: number;
  categoryId: number | null;
  name: string;
  price: number | null;
  ingredients: string | null;
  imageId: number | null;
  image: ImageDto | null;
}

interface DrinkDto {
  id: number;
  categoryId: number | null;
  name: string;
  price: number | null;
  description: string | null;
  imageId: number | null;
  image: ImageDto | null;
}
