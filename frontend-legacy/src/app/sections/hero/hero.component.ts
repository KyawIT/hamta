import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { LucideChevronDown, LucidePhone, LucideUtensilsCrossed } from '@lucide/angular';

@Component({
  selector: 'app-hero',
  imports: [LucideChevronDown, LucidePhone, LucideUtensilsCrossed],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  scrollTo(id: string): void {
    if (this.isBrowser) this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
