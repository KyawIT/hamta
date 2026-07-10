import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryImageDto {
  imageId: number;
  url: string;
  position: number;
  caption: string | null;
}

/** Speist die Startseiten-Galerie live aus /api/gallery – ersetzt die frühere feste Bilderliste. */
@Injectable({ providedIn: 'root' })
export class PublicGalleryService {
  private readonly http = inject(HttpClient);

  private readonly items = signal<GalleryImage[]>([]);
  readonly images = this.items.asReadonly();

  constructor() {
    void this.reload();
  }

  async reload(): Promise<void> {
    const entries = await firstValueFrom(this.http.get<GalleryImageDto[]>('/api/gallery'));
    this.items.set(
      entries.map((entry) => ({
        src: entry.url,
        alt: entry.caption?.trim() || 'Impression aus dem Hamta',
      })),
    );
  }
}
