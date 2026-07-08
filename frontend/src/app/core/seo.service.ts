import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  openGraph?: boolean;
  jsonLd?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  apply(config: SeoConfig): void {
    this.title.setTitle(config.title);
    this.set('name', 'description', config.description);
    this.set('name', 'robots', config.robots ?? 'index, follow');
    this.setCanonical(config.canonical);

    if (config.openGraph) {
      this.set('property', 'og:type', 'website');
      this.set('property', 'og:locale', 'de_AT');
      this.set('property', 'og:url', config.canonical);
      this.set('property', 'og:site_name', 'Hamta Restaurant');
      this.set('property', 'og:title', config.title);
      this.set('property', 'og:description', config.description);
      this.set('property', 'og:image', 'https://hamtarestaurant.at/assets/Image3.jpeg');
      this.set('property', 'og:image:width', '1080');
      this.set('property', 'og:image:height', '607');
      this.set('property', 'og:image:alt', 'Frisch gebackene Pizzen im Hamta Restaurant in Linz');
      this.set('name', 'twitter:card', 'summary_large_image');
      this.set('name', 'twitter:title', config.title);
      this.set('name', 'twitter:description', config.description);
      this.set('name', 'twitter:image', 'https://hamtarestaurant.at/assets/Image3.jpeg');
    } else {
      this.removeSocialMetadata();
    }

    this.setJsonLd(config.jsonLd);
  }

  private set(attribute: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attribute]: key, content }, `${attribute}='${key}'`);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private setJsonLd(data?: Record<string, unknown>): void {
    this.document.getElementById('restaurant-schema')?.remove();
    if (!data) return;
    const script = this.document.createElement('script');
    script.id = 'restaurant-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data).replace(/</g, '\\u003c');
    this.document.head.appendChild(script);
  }

  private removeSocialMetadata(): void {
    for (const selector of [
      "meta[property^='og:']",
      "meta[name^='twitter:']",
    ]) {
      this.document.head.querySelectorAll(selector).forEach((node) => node.remove());
    }
  }
}

export const RESTAURANT_SCHEMA: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Hamta Restaurant',
  alternateName: 'Hamta',
  description:
    'Italienisches Restaurant und Pizzeria in Linz-Urfahr mit Antipasti, Pasta, Pizza und Dolci.',
  url: 'https://hamtarestaurant.at',
  logo: 'https://hamtarestaurant.at/logo.png',
  image: 'https://hamtarestaurant.at/assets/Image3.jpeg',
  telephone: '+43 732 000000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hauptstraße 42',
    addressLocality: 'Linz',
    addressRegion: 'Oberösterreich',
    postalCode: '4040',
    addressCountry: 'AT',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 48.3175, longitude: 14.2947 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '11:00',
      closes: '22:00',
    },
  ],
  servesCuisine: ['Italienisch', 'Pizza', 'Pasta', 'Mediterran'],
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card',
  menu: 'https://hamtarestaurant.at/#menu',
  hasMap: 'https://maps.google.com/?q=Hauptstraße+42,+4040+Linz',
  sameAs: [
    'https://www.instagram.com/hamtarestaurant1/',
    'https://www.tiktok.com/@hamta.restaurant',
  ],
};
