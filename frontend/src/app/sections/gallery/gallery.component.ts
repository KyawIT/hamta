import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

@Component({
  selector: 'app-gallery',
  imports: [FadeInDirective, SectionLabelComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  readonly images = [
    { src: '/assets/Image3.jpeg', alt: 'Frisch gebackene Pizzen am Küchenpass' },
    { src: '/foods/food-9.jpg', alt: 'Kreativ angerichtete Vorspeise' },
    { src: '/assets/Image7.jpeg', alt: 'Fein angerichteter Teller mit frischen Beeren' },
    { src: '/assets/Image5.jpeg', alt: 'Modern präsentierter Gang aus der Küche' },
    { src: '/assets/Image17.jpeg', alt: 'Sorgfältig angerichteter Teller auf hellem Holz' },
    { src: '/assets/Image10.jpeg', alt: 'Gedeckter Tisch mit einem frischen Gericht' },
    { src: '/assets/Image22.jpeg', alt: 'Dessert mit Schokolade und Fruchtsauce' },
    { src: '/assets/Image23.jpeg', alt: 'Dessert auf handglasierter Keramik' },
  ];

  // Masonry column classes scale with the number of uploaded images (1–10)
  // so few images fill the row instead of leaving empty space.
  get columnClass(): string {
    const count = this.images.length;
    if (count <= 1) return 'columns-1 max-w-xl mx-auto';
    if (count === 2) return 'columns-2 max-w-4xl mx-auto';
    if (count <= 4) return 'columns-2';
    if (count <= 6) return 'columns-2 lg:columns-3';
    return 'columns-2 lg:columns-3 xl:columns-4';
  }
}
