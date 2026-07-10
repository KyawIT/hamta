import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { PublicGalleryService } from '../../shared/public-gallery.service';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

@Component({
  selector: 'app-gallery',
  imports: [FadeInDirective, SectionLabelComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  private readonly gallery = inject(PublicGalleryService);

  readonly images = this.gallery.images;

  // Masonry column classes scale with the number of uploaded images (1–10)
  // so few images fill the row instead of leaving empty space.
  readonly columnClass = computed(() => {
    const count = this.images().length;
    if (count <= 1) return 'columns-1 max-w-xl mx-auto';
    if (count === 2) return 'columns-2 max-w-4xl mx-auto';
    if (count <= 4) return 'columns-2';
    if (count <= 6) return 'columns-2 lg:columns-3';
    return 'columns-2 lg:columns-3 xl:columns-4';
  });
}
