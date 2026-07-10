import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
}

/** Maximale Anzahl Bilder in der Startseiten-Galerie. */
export const MAX_GALLERY_IMAGES = 10;

interface GalleryImageDto {
  imageId: number;
  url: string;
  position: number;
  caption: string | null;
}

/**
 * Verwaltung der Startseiten-Galerie gegen das echte Backend (`/api/admin/gallery`).
 *
 * Bilddateien gehen zuerst über `/api/images/upload` (verkleinern, WebP, MinIO) und
 * werden erst mit `add()` Teil der Galerie-Reihenfolge. Jede Änderung an Reihenfolge,
 * Namen oder Bestand schreibt die komplette geordnete Liste per PUT zurück.
 */
@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly http = inject(HttpClient);

  private readonly items = signal<GalleryImage[]>([]);
  readonly images = this.items.asReadonly();
  readonly count = computed(() => this.items().length);
  readonly isFull = computed(() => this.items().length >= MAX_GALLERY_IMAGES);
  readonly remaining = computed(() => MAX_GALLERY_IMAGES - this.items().length);

  readonly loading = signal(false);
  readonly error = signal('');

  private captionTimers = new Map<number, ReturnType<typeof setTimeout>>();

  constructor() {
    void this.reload();
  }

  async reload(): Promise<void> {
    this.loading.set(true);
    try {
      const dtos = await firstValueFrom(this.http.get<GalleryImageDto[]>('/api/admin/gallery'));
      this.items.set(dtos.map((d) => ({ id: d.imageId, url: d.url, caption: d.caption ?? '' })));
    } catch {
      this.error.set('Galerie konnte nicht geladen werden.');
    } finally {
      this.loading.set(false);
    }
  }

  /** Lädt ein Foto zum Backend hoch (→ MinIO, verkleinert + WebP), noch nicht Teil der Galerie. */
  async uploadImage(file: File): Promise<{ id: number; url: string }> {
    const form = new FormData();
    form.append('file', file);
    return firstValueFrom(
      this.http.post<{ id: number; url: string }>('/api/images/upload?category=gallery', form),
    );
  }

  /** Fügt ein hochgeladenes Bild an die Galerie an; false, wenn das Limit erreicht ist. */
  async add(image: { id: number; url: string }, caption: string): Promise<boolean> {
    if (this.isFull()) return false;
    const next = [...this.items(), { id: image.id, url: image.url, caption }];
    this.items.set(next);
    await this.persist(next);
    return true;
  }

  /** Aktualisiert den Namen lokal sofort, schreibt nach kurzer Pause zum Backend. */
  updateCaption(id: number, caption: string): void {
    this.items.update((list) => list.map((img) => (img.id === id ? { ...img, caption } : img)));

    const existing = this.captionTimers.get(id);
    if (existing) clearTimeout(existing);
    this.captionTimers.set(
      id,
      setTimeout(() => {
        this.captionTimers.delete(id);
        void this.persist(this.items());
      }, 600),
    );
  }

  async remove(id: number): Promise<void> {
    const next = this.items().filter((img) => img.id !== id);
    this.items.set(next);
    await this.persist(next);
  }

  /** Verschiebt ein Bild um eine Position nach vorne (-1) oder hinten (+1). */
  async move(id: number, direction: -1 | 1): Promise<void> {
    const list = this.items();
    const index = list.findIndex((img) => img.id === id);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= list.length) return;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    this.items.set(next);
    await this.persist(next);
  }

  private async persist(list: GalleryImage[]): Promise<void> {
    this.error.set('');
    try {
      const dtos = await firstValueFrom(
        this.http.put<GalleryImageDto[]>('/api/admin/gallery', {
          images: list.map((img) => ({ imageId: img.id, caption: img.caption })),
        }),
      );
      this.items.set(dtos.map((d) => ({ id: d.imageId, url: d.url, caption: d.caption ?? '' })));
    } catch {
      this.error.set('Speichern fehlgeschlagen. Läuft das Backend?');
      await this.reload();
    }
  }
}
