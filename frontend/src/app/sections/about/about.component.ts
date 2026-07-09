import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { ParallaxDirective } from '../../shared/parallax.directive';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

@Component({
  selector: 'app-about',
  imports: [FadeInDirective, ParallaxDirective, SectionLabelComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly stats = [
    { value: '2026', label: 'Eröffnung' },
    { value: '20+', label: 'Italienische Klassiker' },
    { value: 'Neu', label: 'Frisch eröffnet in Urfahr' },
    { value: 'Zentral', label: 'Bushaltestelle direkt vor der Tür' },
  ];
}
