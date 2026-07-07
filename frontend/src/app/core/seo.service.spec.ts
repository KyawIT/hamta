import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  it('sets canonical, robots, social metadata, and JSON-LD', () => {
    const service = TestBed.inject(SeoService);
    service.apply({
      title: 'Test title',
      description: 'Test description',
      canonical: 'https://hamtarestaurant.at/test',
      robots: 'noindex, nofollow',
      openGraph: true,
      jsonLd: { '@type': 'Restaurant' },
    });

    expect(document.title).toBe('Test title');
    expect(document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content).toBe('noindex, nofollow');
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://hamtarestaurant.at/test');
    expect(document.head.querySelector('meta[property="og:title"]')).toBeTruthy();
    expect(document.getElementById('restaurant-schema')?.textContent).toContain('Restaurant');
  });
});
