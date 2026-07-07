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
    { src: '/foods/food-2.jpg', alt: 'Gegrilltes Lammfleisch', span: 'row-span-2' },
    { src: '/foods/food-3.jpg', alt: 'Persischer Kebap', span: '' },
    { src: '/foods/food-4.jpg', alt: 'Frische Zutaten', span: '' },
    { src: '/foods/food-6.jpg', alt: 'Mantu – Gefüllte Teigtaschen', span: '' },
    { src: '/foods/food-7.jpg', alt: 'Gemischter Grillteller', span: 'row-span-2' },
    { src: '/foods/food-9.jpg', alt: 'Joojeh Kebap', span: '' },
    { src: '/foods/food-10.jpg', alt: 'Lammkotelett vom Grill', span: '' },
    { src: '/foods/food-11.jpg', alt: 'Orientalische Spezialitäten', span: '' },
    { src: '/foods/food-12.jpg', alt: 'Persischer Safranreis', span: '' },
    { src: '/foods/food-13.jpg', alt: 'Chelo Kebap', span: 'row-span-2' },
    { src: '/foods/food-14.jpg', alt: 'Fladenbrot', span: '' },
    { src: '/foods/food-15.jpg', alt: 'Hamta Restaurant', span: '' },
  ];
}
