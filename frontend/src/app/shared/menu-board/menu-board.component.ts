import { afterNextRender, ChangeDetectionStrategy, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import { LucideChevronsLeft, LucideChevronsRight } from '@lucide/angular';
import { FadeInDirective } from '../fade-in.directive';
import { ParallaxDirective } from '../parallax.directive';
import { SectionLabelComponent } from '../section-label/section-label.component';

export interface MenuItem { name: string; description: string; price: string; highlight?: boolean; }
export interface MenuCategory { id: string; label: string; items: MenuItem[]; }

@Component({
  selector: 'app-menu-board',
  imports: [FadeInDirective, ParallaxDirective, SectionLabelComponent, LucideChevronsLeft, LucideChevronsRight],
  templateUrl: './menu-board.component.html',
  styleUrl: './menu-board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBoardComponent {
  readonly sectionId = input.required<string>();
  readonly bgImage = input.required<string>();
  readonly surface = input('#0e0e0e');
  readonly eyebrow = input.required<string>();
  readonly headingBefore = input.required<string>();
  readonly headingEmphasis = input.required<string>();
  readonly headingAfter = input('');
  readonly intro = input.required<string>();
  readonly categories = input.required<MenuCategory[]>();

  private readonly track = viewChild<ElementRef<HTMLElement>>('track');
  private readonly activeId = signal<string | null>(null);
  private readonly atStart = signal(true);
  private readonly atEnd = signal(false);

  // Drag-to-scroll state (desktop mouse users).
  private dragging = false;
  private dragMoved = false;
  private dragStartX = 0;
  private dragStartScroll = 0;

  readonly active = computed(() => {
    const cats = this.categories();
    return cats.find((c) => c.id === this.activeId()) ?? cats[0];
  });
  /** More than four categories → enable horizontal scroll and the "more" affordances. */
  readonly scrollable = computed(() => this.categories().length > 4);
  readonly showNext = computed(() => this.scrollable() && !this.atEnd());
  readonly showPrev = computed(() => this.scrollable() && !this.atStart());

  constructor() {
    // Resolve real overflow once laid out so the affordances hide when all pills already fit.
    afterNextRender(() => this.onScroll());
  }

  select(id: string): void {
    // Suppress click that concludes a drag gesture.
    if (this.dragMoved) return;
    this.activeId.set(id);
  }
  isActive(id: string): boolean { return this.active()?.id === id; }

  onScroll(): void {
    const el = this.track()?.nativeElement;
    if (!el) return;
    this.atStart.set(el.scrollLeft <= 4);
    this.atEnd.set(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  /** Chevron click: page ~80% of the visible width in the given direction. */
  page(direction: 1 | -1): void {
    const el = this.track()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  }

  /** Vertical mouse wheel over the pills scrolls them horizontally. */
  onWheel(event: WheelEvent): void {
    const el = this.track()?.nativeElement;
    if (!el || !this.scrollable()) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    // Only hijack the wheel while there is somewhere to go in that direction.
    const canScroll = delta > 0 ? el.scrollLeft + el.clientWidth < el.scrollWidth - 1 : el.scrollLeft > 0;
    if (!canScroll) return;
    event.preventDefault();
    el.scrollBy({ left: delta });
  }

  onPointerDown(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || !this.scrollable()) return;
    const el = this.track()?.nativeElement;
    if (!el) return;
    this.dragging = true;
    this.dragMoved = false;
    this.dragStartX = event.clientX;
    this.dragStartScroll = el.scrollLeft;
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) return;
    const el = this.track()?.nativeElement;
    if (!el) return;
    const dx = event.clientX - this.dragStartX;
    if (Math.abs(dx) > 5) {
      this.dragMoved = true;
      el.setPointerCapture(event.pointerId);
      el.classList.add('is-dragging');
    }
    el.scrollLeft = this.dragStartScroll - dx;
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) return;
    this.dragging = false;
    const el = this.track()?.nativeElement;
    if (el) {
      el.classList.remove('is-dragging');
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    }
    // Let the trailing click fire (suppressed in select()), then reset.
    setTimeout(() => { this.dragMoved = false; });
  }
}
