import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { MenuAdminService } from '../../menu/menu-admin.service';
import { CATEGORIES, CategoryId } from '../../menu/menu.model';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './menu.page.html',
  styleUrl: './menu.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage {
  private readonly menu = inject(MenuAdminService);

  readonly categories = CATEGORIES;
  readonly activeId = signal<CategoryId>('starter');

  readonly activeCategory = computed(
    () => this.categories.find((c) => c.id === this.activeId()) ?? this.categories[0],
  );
  readonly dishes = computed(() =>
    this.menu.dishes().filter((d) => d.category === this.activeId()),
  );

  select(id: CategoryId): void {
    this.activeId.set(id);
  }

  countOf(id: CategoryId): number {
    return this.menu.dishes().filter((d) => d.category === id).length;
  }

  formatPrice(preis: number | null): string {
    return preis == null ? '—' : `€ ${preis.toFixed(2).replace('.', ',')}`;
  }
}
