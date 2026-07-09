import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideMapPin, LucidePhone } from '@lucide/angular';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LucideMapPin, LucidePhone],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly navLinks = [
    { label: 'Start', href: '#start' }, { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Team', href: '#team' },
    { label: 'Speisekarte', href: '#menu' }, { label: 'Getränke', href: '#getraenke' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Kontakt', href: '#kontakt' },
  ];
}
