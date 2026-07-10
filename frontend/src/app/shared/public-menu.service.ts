import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CATEGORIES, CategoryGroup } from '../admin/menu/menu.model';
import { MenuCategory, MenuItem } from './menu-board/menu-board.component';

interface ImageDto {
  id: number;
  url: string;
}

interface DishDto {
  id: number;
  categoryId: number | null;
  name: string;
  price: number | null;
  ingredients: string | null;
  imageId: number | null;
  image: ImageDto | null;
}

interface DrinkDto {
  id: number;
  categoryId: number | null;
  name: string;
  price: number | null;
  description: string | null;
  imageId: number | null;
  image: ImageDto | null;
}

function formatPrice(price: number | null): string {
  return price == null ? '' : `€ ${price.toFixed(2).replace('.', ',')}`;
}

/**
 * Speist die öffentliche Speise- und Getränkekarte (sections/menu, sections/drinks)
 * live aus /api/dishes und /api/drinks – ersetzt die frühere statische Beispielkarte.
 */
@Injectable({ providedIn: 'root' })
export class PublicMenuService {
  private readonly http = inject(HttpClient);

  private readonly dishes = signal<DishDto[]>([]);
  private readonly drinks = signal<DrinkDto[]>([]);

  readonly dishCategories = computed(() =>
    this.buildCategories('speisen', this.dishes(), (d: DishDto) => d.ingredients),
  );
  readonly drinkCategories = computed(() =>
    this.buildCategories('getraenke', this.drinks(), (d: DrinkDto) => d.description),
  );

  constructor() {
    void this.reload();
  }

  async reload(): Promise<void> {
    const [dishes, drinks] = await Promise.all([
      firstValueFrom(this.http.get<DishDto[]>('/api/dishes')),
      firstValueFrom(this.http.get<DrinkDto[]>('/api/drinks')),
    ]);
    this.dishes.set(dishes);
    this.drinks.set(drinks);
  }

  private buildCategories<T extends DishDto | DrinkDto>(
    group: CategoryGroup,
    items: T[],
    textOf: (item: T) => string | null,
  ): MenuCategory[] {
    return CATEGORIES.filter((cat) => cat.group === group)
      .map((cat): MenuCategory => ({
        id: cat.id,
        label: cat.label,
        items: items
          .filter((item) => item.categoryId === cat.backendId)
          .map((item): MenuItem => ({
            name: item.name,
            description: textOf(item) ?? '',
            price: formatPrice(item.price),
          })),
      }))
      .filter((cat) => cat.items.length > 0);
  }
}
