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

export type FadeDirection = 'up' | 'left' | 'right' | 'none';

@Directive({ selector: '[appFadeIn]' })
export class FadeInDirective implements OnDestroy {
  readonly fadeDelay = input(0);
  readonly fadeDirection = input<FadeDirection>('up');
  readonly fadeThreshold = input(0.15);

  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.element.style.opacity = '0';
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        this.reveal();
        return;
      }
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.reveal();
            this.observer?.disconnect();
          }
        },
        { threshold: this.fadeThreshold() },
      );
      this.observer.observe(this.element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private reveal(): void {
    const animation = {
      up: 'fadeInUp',
      left: 'fadeInLeft',
      right: 'fadeInRight',
      none: 'fadeIn',
    }[this.fadeDirection()];
    this.element.style.animation = `${animation} 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${this.fadeDelay()}ms both`;
  }
}
