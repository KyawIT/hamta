import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideImagePlus,
  LucideLoaderCircle,
  LucideStar,
  LucideTrash2,
  LucideUpload,
} from '@lucide/angular';

import { downscaleImage } from '../../../shared/downscale-image';
import { GalleryImage, GalleryService, MAX_GALLERY_IMAGES } from '../../gallery/gallery.service';

@Component({
  selector: 'app-admin-gallery',
  imports: [
    LucideChevronLeft,
    LucideChevronRight,
    LucideImagePlus,
    LucideLoaderCircle,
    LucideStar,
    LucideTrash2,
    LucideUpload,
  ],
  templateUrl: './gallery.page.html',
  styleUrl: './gallery.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPage {
  private readonly gallery = inject(GalleryService);

  readonly max = MAX_GALLERY_IMAGES;
  readonly images = this.gallery.images;
  readonly count = this.gallery.count;
  readonly isFull = this.gallery.isFull;

  readonly uploading = signal(false);
  readonly error = signal('');

  readonly deleting = signal<GalleryImage | null>(null);

  async onFilesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    if (!files.length) return;

    const imageFiles = files.filter((f) => f.type.startsWith('image/'));
    if (!imageFiles.length) {
      this.error.set('Bitte Bilddateien auswählen.');
      return;
    }

    this.error.set('');
    this.uploading.set(true);

    let skipped = 0;
    for (const file of imageFiles) {
      if (this.gallery.isFull()) {
        skipped++;
        continue;
      }
      try {
        const url = await downscaleImage(file);
        this.gallery.add(url);
      } catch {
        skipped++;
      }
    }

    this.uploading.set(false);
    if (skipped > 0) {
      this.error.set(`Maximal ${this.max} Bilder – ${skipped} wurde(n) nicht hinzugefügt.`);
    }
  }

  onCaption(id: number, event: Event): void {
    this.gallery.updateCaption(id, (event.target as HTMLInputElement).value);
  }

  move(id: number, direction: -1 | 1): void {
    this.gallery.move(id, direction);
  }

  askDelete(image: GalleryImage): void {
    this.deleting.set(image);
  }

  cancelDelete(): void {
    this.deleting.set(null);
  }

  confirmDelete(): void {
    const image = this.deleting();
    if (image) this.gallery.remove(image.id);
    this.deleting.set(null);
  }
}
