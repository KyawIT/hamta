import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

@Component({
  selector: 'app-about',
  imports: [FadeInDirective, SectionLabelComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly stats = [
    { value: '2024', label: 'Eröffnung' },
    { value: '30+', label: 'Gerichte' },
    { value: 'Täglich', label: 'Frisch zubereitet' },
  ];
}
