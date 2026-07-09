import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
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

  // Ausstehender Upload: Bild ist verkleinert und wartet auf einen Namen.
  readonly pendingImage = signal<string | null>(null);
  readonly pendingName = signal('');

  readonly deleting = signal<GalleryImage | null>(null);

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.error.set('Bitte eine Bilddatei auswählen.');
      return;
    }
    if (this.gallery.isFull()) {
      this.error.set(`Maximal ${this.max} Bilder erreicht.`);
      return;
    }

    this.error.set('');
    this.uploading.set(true);
    try {
      const url = await downscaleImage(file);
      this.pendingName.set('');
      this.pendingImage.set(url);
    } catch {
      this.error.set('Foto konnte nicht geladen werden.');
    } finally {
      this.uploading.set(false);
    }
  }

  confirmUpload(): void {
    const url = this.pendingImage();
    if (!url) return;
    this.gallery.add(url, this.pendingName().trim());
    this.pendingImage.set(null);
    this.pendingName.set('');
  }

  cancelUpload(): void {
    this.pendingImage.set(null);
    this.pendingName.set('');
  }

  onName(id: number, event: Event): void {
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
