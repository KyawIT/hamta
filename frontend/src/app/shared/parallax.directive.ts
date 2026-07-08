import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';

/**
 * GPU-cheap scroll parallax. Translates the host on the Y axis while it is in
 * view, driven by an IntersectionObserver + a rAF-throttled scroll handler.
 * No-ops on narrow viewports (< 768px) and when the user prefers reduced
 * motion, leaving the element static in those cases.
 *
 * The host should be slightly over-sized (e.g. scale-110 / -inset) so the
 * translate never reveals an edge behind a cover image.
 */
@Directive({ selector: '[appParallax]' })
export class ParallaxDirective implements OnDestroy {
  /** Fraction of scroll distance the element shifts. 0.15 = subtle. */
  readonly parallaxSpeed = input(0.15);

  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private inView = false;
  private ticking = false;
  private readonly onScroll = () => this.requestUpdate();
  private readonly onResize = () => this.requestUpdate();

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;
    afterNextRender(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      if (reduced || isMobile || !('IntersectionObserver' in window)) return;

      this.element.style.willChange = 'transform';
      this.observer = new IntersectionObserver(
        ([entry]) => {
          this.inView = entry.isIntersecting;
          if (this.inView) this.requestUpdate();
        },
        { threshold: 0 },
      );
      this.observer.observe(this.element);
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onResize, { passive: true });
      this.update();
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
    }
  }

  private requestUpdate(): void {
    if (!this.inView || this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  }

  private update(): void {
    // Read the containing frame, not the transformed host, so our own
    // translate does not feed back into the next calculation.
    const rect = this.element.parentElement?.getBoundingClientRect() ?? this.element.getBoundingClientRect();
    const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
    const offset = Math.max(-90, Math.min(90, -fromCenter * this.parallaxSpeed()));
    this.element.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  }
}
