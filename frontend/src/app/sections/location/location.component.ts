import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideClock, LucideExternalLink, LucideMapPin, LucidePhone } from '@lucide/angular';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

@Component({
  selector: 'app-location',
  imports: [FadeInDirective, SectionLabelComponent, LucideClock, LucideExternalLink, LucideMapPin, LucidePhone],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent {
  readonly today = new Date().toLocaleDateString('de-AT', { weekday: 'long' });
  readonly hours = [
    { day: 'Montag', time: '10:00 – 23:00', closed: false },
    { day: 'Dienstag', time: 'Ruhetag', closed: true },
    { day: 'Mittwoch', time: '10:00 – 23:00', closed: false },
    { day: 'Donnerstag', time: '10:00 – 23:00', closed: false },
    { day: 'Freitag', time: '10:00 – 23:00', closed: false },
    { day: 'Samstag', time: '10:00 – 23:00', closed: false },
    { day: 'Sonntag', time: '10:00 – 23:00', closed: false },
  ];
}
