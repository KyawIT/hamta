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

import { GalleryImage, GalleryService, MAX_GALLERY_IMAGES } from '../../gallery/gallery.service';
import {
  IMAGE_UPLOAD_ACCEPT,
  validateUploadImage,
} from '../../../shared/image-upload-validation';

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
  readonly imageAccept = IMAGE_UPLOAD_ACCEPT;

  readonly uploading = signal(false);
  readonly error = signal('');
  readonly loadError = this.gallery.error;

  // Ausstehender Upload: Bild liegt bereits im Backend und wartet auf einen Namen.
  readonly pendingImage = signal<{ id: number; url: string } | null>(null);
  readonly pendingName = signal('');

  readonly deleting = signal<GalleryImage | null>(null);

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    const validationError = await validateUploadImage(file);
    if (validationError) {
      this.error.set(validationError);
      return;
    }
    if (this.gallery.isFull()) {
      this.error.set(`Maximal ${this.max} Bilder erreicht.`);
      return;
    }

    this.error.set('');
    this.uploading.set(true);
    try {
      const image = await this.gallery.uploadImage(file);
      this.pendingName.set('');
      this.pendingImage.set(image);
    } catch {
      this.error.set('Foto konnte nicht hochgeladen werden.');
    } finally {
      this.uploading.set(false);
    }
  }

  async confirmUpload(): Promise<void> {
    const image = this.pendingImage();
    if (!image) return;
    this.uploading.set(true);
    try {
      await this.gallery.add(image, this.pendingName().trim());
      this.pendingImage.set(null);
      this.pendingName.set('');
    } catch {
      this.error.set('Speichern fehlgeschlagen. Läuft das Backend?');
    } finally {
      this.uploading.set(false);
    }
  }

  cancelUpload(): void {
    this.pendingImage.set(null);
    this.pendingName.set('');
  }

  onName(id: number, event: Event): void {
    this.gallery.updateCaption(id, (event.target as HTMLInputElement).value);
  }

  move(id: number, direction: -1 | 1): void {
    void this.gallery.move(id, direction);
  }

  askDelete(image: GalleryImage): void {
    this.deleting.set(image);
  }

  cancelDelete(): void {
    this.deleting.set(null);
  }

  async confirmDelete(): Promise<void> {
    const image = this.deleting();
    this.deleting.set(null);
    if (image) await this.gallery.remove(image.id);
  }
}
