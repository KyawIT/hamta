import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { LucideMenu, LucidePhone, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-header',
  imports: [LucideMenu, LucidePhone, LucideX],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  readonly scrolled = signal(false);
  readonly mobileOpen = signal(false);
  readonly navLinks = [
    { label: 'Start', href: '#start' },
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Speisekarte', href: '#menu' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isBrowser) this.scrolled.set(window.scrollY > 60);
  }

  toggleMobile(): void {
    this.setMobileOpen(!this.mobileOpen());
  }

  closeMobile(): void {
    this.setMobileOpen(false);
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }

  private setMobileOpen(open: boolean): void {
    this.mobileOpen.set(open);
    this.document.body.style.overflow = open ? 'hidden' : '';
  }
}
