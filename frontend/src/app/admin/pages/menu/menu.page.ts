import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideImageOff,
  LucideImageUp,
  LucideLoaderCircle,
  LucidePencil,
  LucidePlus,
  LucideSearch,
  LucideTrash2,
  LucideX,
} from '@lucide/angular';

import { MenuAdminService } from '../../menu/menu-admin.service';
import {
  CATEGORIES,
  CATEGORY_GROUPS,
  Category,
  CategoryGroup,
  CategoryId,
  Dish,
} from '../../menu/menu.model';

/** Maximale Kantenlänge, auf die hochgeladene Fotos verkleinert werden. */
const MAX_IMAGE_SIZE = 900;

@Component({
  selector: 'app-admin-menu',
  imports: [
    FormsModule,
    LucideImageOff,
    LucideImageUp,
    LucideLoaderCircle,
    LucidePencil,
    LucidePlus,
    LucideSearch,
    LucideTrash2,
    LucideX,
  ],
  templateUrl: './menu.page.html',
  styleUrl: './menu.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage {
  private readonly menu = inject(MenuAdminService);

  readonly categories = CATEGORIES;
  readonly groups = CATEGORY_GROUPS;

  readonly group = signal<CategoryGroup>('speisen');
  readonly activeId = signal<CategoryId>('vorspeisen');
  readonly search = signal('');

  readonly groupCategories = computed(() =>
    this.categories.filter((c) => c.group === this.group()),
  );
  readonly activeCategory = computed(
    () => this.categories.find((c) => c.id === this.activeId()) ?? this.categories[0],
  );

  readonly isSearching = computed(() => this.search().trim().length > 0);

  /** Angezeigte Gerichte: bei Suche kategorieübergreifend, sonst nach aktiver Kategorie. */
  readonly results = computed<Dish[]>(() => {
    const term = this.search().trim().toLowerCase();
    if (term) {
      return this.menu
        .dishes()
        .filter(
          (d) => d.name.toLowerCase().includes(term) || d.zutaten.toLowerCase().includes(term),
        );
    }
    return this.menu.dishes().filter((d) => d.category === this.activeId());
  });

  readonly totalCount = computed(() => this.menu.dishes().length);

  // ─── Formular-Zustand ──────────────────────────────────────
  readonly editing = signal<number | 'new' | null>(null);
  readonly formCategoryId = signal<CategoryId>('vorspeisen');
  readonly formName = signal('');
  readonly formZutaten = signal('');
  readonly formPreis = signal('');
  readonly formImageUrl = signal('');
  readonly formError = signal('');
  readonly imageLoading = signal(false);

  readonly isEditing = computed(() => typeof this.editing() === 'number');

  /** Live-Vorschau des Gerichts, während man tippt. */
  readonly preview = computed<Dish>(() => ({
    id: 0,
    category: this.formCategoryId(),
    name: this.formName().trim() || 'Name des Gerichts',
    zutaten: this.formZutaten().trim(),
    preis: this.parsePreisSafe(this.formPreis()),
    imageUrl: this.formImageUrl() || undefined,
  }));

  // ─── Löschen ───────────────────────────────────────────────
  readonly deleting = signal<Dish | null>(null);

  selectGroup(group: CategoryGroup): void {
    if (this.group() === group) return;
    this.group.set(group);
    this.activeId.set(this.categories.find((c) => c.group === group)!.id);
  }

  select(id: CategoryId): void {
    this.activeId.set(id);
  }

  countOf(id: CategoryId): number {
    return this.menu.dishes().filter((d) => d.category === id).length;
  }

  categoryLabel(id: CategoryId): string {
    return this.categories.find((c) => c.id === id)?.label ?? id;
  }

  categoriesOf(group: CategoryGroup): Category[] {
    return this.categories.filter((c) => c.group === group);
  }

  formatPrice(preis: number | null): string {
    return preis == null ? '—' : `€ ${preis.toFixed(2).replace('.', ',')}`;
  }

  clearSearch(): void {
    this.search.set('');
  }

  // ─── Formular öffnen/schließen ─────────────────────────────
  openNew(): void {
    this.resetForm();
    this.formCategoryId.set(this.isSearching() ? this.activeId() : this.activeId());
    this.editing.set('new');
  }

  openEdit(dish: Dish): void {
    this.formCategoryId.set(dish.category);
    this.formName.set(dish.name);
    this.formZutaten.set(dish.zutaten);
    this.formPreis.set(dish.preis == null ? '' : String(dish.preis).replace('.', ','));
    this.formImageUrl.set(dish.imageUrl ?? '');
    this.formError.set('');
    this.imageLoading.set(false);
    this.editing.set(dish.id);
  }

  closeForm(): void {
    this.editing.set(null);
  }

  save(): void {
    const name = this.formName().trim();
    if (!name) {
      this.formError.set('Bitte einen Namen eingeben.');
      return;
    }

    const preis = this.parsePreis(this.formPreis());
    if (preis === 'invalid') {
      this.formError.set('Preis ist keine gültige Zahl (z.B. 12,90).');
      return;
    }

    const input = {
      category: this.formCategoryId(),
      name,
      zutaten: this.formZutaten().trim(),
      preis,
      imageUrl: this.formImageUrl() || undefined,
    };

    const current = this.editing();
    if (typeof current === 'number') {
      this.menu.update(current, input);
    } else {
      this.menu.add(input);
    }

    // Zur Kategorie des gespeicherten Gerichts wechseln, damit es sichtbar ist.
    const cat = this.categories.find((c) => c.id === input.category);
    if (cat) {
      this.group.set(cat.group);
      this.activeId.set(cat.id);
    }
    this.search.set('');
    this.closeForm();
  }

  // ─── Foto-Upload ───────────────────────────────────────────
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.formError.set('Bitte eine Bilddatei auswählen.');
      return;
    }

    this.formError.set('');
    this.imageLoading.set(true);
    this.downscale(file)
      .then((url) => {
        this.formImageUrl.set(url);
        this.imageLoading.set(false);
      })
      .catch(() => {
        this.formError.set('Foto konnte nicht geladen werden.');
        this.imageLoading.set(false);
      });
  }

  removeImage(): void {
    this.formImageUrl.set('');
  }

  private downscale(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject();
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject();
        img.onload = () => {
          const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject();
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  // ─── Löschen ───────────────────────────────────────────────
  askDelete(dish: Dish): void {
    this.deleting.set(dish);
  }

  cancelDelete(): void {
    this.deleting.set(null);
  }

  confirmDelete(): void {
    const dish = this.deleting();
    if (dish) this.menu.remove(dish.id);
    this.deleting.set(null);
  }

  private resetForm(): void {
    this.formName.set('');
    this.formZutaten.set('');
    this.formPreis.set('');
    this.formImageUrl.set('');
    this.formError.set('');
    this.imageLoading.set(false);
  }

  private parsePreis(raw: string): number | null | 'invalid' {
    const value = raw.trim().replace(',', '.');
    if (!value) return null;
    const num = Number(value);
    return Number.isFinite(num) && num >= 0 ? num : 'invalid';
  }

  private parsePreisSafe(raw: string): number | null {
    const result = this.parsePreis(raw);
    return result === 'invalid' ? null : result;
  }
}
