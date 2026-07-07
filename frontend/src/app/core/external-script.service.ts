import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExternalScriptService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  load(id: string, src: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return Promise.resolve();
    const existing = this.document.getElementById(id) as HTMLScriptElement | null;
    if (existing?.dataset['loaded'] === 'true') return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = existing ?? this.document.createElement('script');
      script.id = id;
      script.async = true;
      script.src = src;
      script.addEventListener('load', () => {
        script.dataset['loaded'] = 'true';
        resolve();
      }, { once: true });
      script.addEventListener('error', () => reject(new Error(`Unable to load ${src}`)), {
        once: true,
      });
      if (!existing) this.document.body.appendChild(script);
    });
  }
}
