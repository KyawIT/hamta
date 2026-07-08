import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { LucideHome, LucideMapPin, LucidePhone, LucideUtensilsCrossed } from '@lucide/angular';

@Component({
  selector: 'app-mobile-nav',
  imports: [LucideHome, LucideMapPin, LucidePhone, LucideUtensilsCrossed],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent implements OnDestroy {
  readonly active = signal('#start');
  private observer?: IntersectionObserver;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && this.active.set(`#${entry.target.id}`)),
        { threshold: 0.3 },
      );
      ['start', 'ueber-uns', 'menu', 'galerie', 'kontakt'].forEach((id) => {
        const element = document.getElementById(id);
        if (element) this.observer?.observe(element);
      });
    });
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}
