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
    { src: '/assets/Image3.jpeg', alt: 'Frisch gebackene Pizzen am Küchenpass', span: 'row-span-2' },
    { src: '/foods/food-9.jpg', alt: 'Kreativ angerichtete Vorspeise', span: '' },
    { src: '/assets/Image7.jpeg', alt: 'Fein angerichteter Teller mit frischen Beeren', span: '' },
    { src: '/assets/Image5.jpeg', alt: 'Modern präsentierter Gang aus der Küche', span: '' },
    { src: '/assets/Image17.jpeg', alt: 'Sorgfältig angerichteter Teller auf hellem Holz', span: 'row-span-2' },
    { src: '/assets/Image10.jpeg', alt: 'Gedeckter Tisch mit einem frischen Gericht', span: '' },
    { src: '/assets/Image22.jpeg', alt: 'Dessert mit Schokolade und Fruchtsauce', span: '' },
    { src: '/assets/Image23.jpeg', alt: 'Dessert auf handglasierter Keramik', span: '' },
  ];
}
