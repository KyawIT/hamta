import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { LegalPageHeaderComponent } from '../../layout/legal-page-header/legal-page-header.component';

@Component({
  selector: 'app-impressum-page',
  imports: [RouterLink, LegalPageHeaderComponent],
  templateUrl: './impressum.page.html',
  styleUrl: './impressum.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpressumPage {
  constructor() {
    inject(SeoService).apply({
      title: 'Impressum | Hamta Restaurant Linz',
      description: 'Impressum des Hamta Restaurants gemäß § 5 ECG und § 25 MedienG – Angaben zum Medieninhaber und Verantwortlichen.',
      robots: 'noindex, nofollow',
      canonical: 'https://hamtarestaurant.at/impressum',
    });
  }
}
