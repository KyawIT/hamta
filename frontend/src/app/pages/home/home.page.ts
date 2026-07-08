import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService, RESTAURANT_SCHEMA } from '../../core/seo.service';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { MobileNavComponent } from '../../layout/mobile-nav/mobile-nav.component';
import { AboutComponent } from '../../sections/about/about.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { GalleryComponent } from '../../sections/gallery/gallery.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { LocationComponent } from '../../sections/location/location.component';
import { MenuComponent } from '../../sections/menu/menu.component';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, MobileNavComponent, FooterComponent, HeroComponent, AboutComponent, MenuComponent, GalleryComponent, LocationComponent, ContactComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  constructor() {
    inject(SeoService).apply({
      title: 'Hamta Restaurant – Italienische Küche & Pizza in Linz',
      description: 'Italienisches Restaurant und Pizzeria in Linz-Urfahr mit Antipasti, Pasta, Pizza und Dolci. Di–So 11–22 Uhr, Hauptstraße 42.',
      canonical: 'https://hamtarestaurant.at',
      openGraph: true,
      jsonLd: RESTAURANT_SCHEMA,
    });
  }
}
