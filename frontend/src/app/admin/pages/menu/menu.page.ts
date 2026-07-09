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
  DishInput,
} from '../../menu/menu.model';

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
  /** Das gerade bearbeitete Gericht (für korrektes Endpoint-Routing beim Speichern). */
  readonly editingDish = signal<Dish | null>(null);
  readonly formCategoryId = signal<CategoryId>('vorspeisen');
  readonly formName = signal('');
  readonly formZutaten = signal('');
  readonly formPreis = signal('');
  readonly formImageUrl = signal('');
  readonly formImageId = signal<number | null>(null);
  readonly formError = signal('');
  readonly imageLoading = signal(false);
  readonly saving = signal(false);

  /** Ladefehler beim Abruf der Speisekarte (vom Service). */
  readonly loadError = this.menu.error;

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
    this.editingDish.set(null);
    this.formCategoryId.set(this.activeId());
    this.editing.set('new');
  }

  openEdit(dish: Dish): void {
    this.editingDish.set(dish);
    this.formCategoryId.set(dish.category);
    this.formName.set(dish.name);
    this.formZutaten.set(dish.zutaten);
    this.formPreis.set(dish.preis == null ? '' : String(dish.preis).replace('.', ','));
    this.formImageUrl.set(dish.imageUrl ?? '');
    this.formImageId.set(dish.imageId ?? null);
    this.formError.set('');
    this.imageLoading.set(false);
    this.editing.set(dish.id);
  }

  closeForm(): void {
    this.editing.set(null);
  }

  async save(): Promise<void> {
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

    const input: DishInput = {
      category: this.formCategoryId(),
      name,
      zutaten: this.formZutaten().trim(),
      preis,
      imageUrl: this.formImageUrl() || undefined,
      imageId: this.formImageId(),
    };

    this.formError.set('');
    this.saving.set(true);
    try {
      const editing = this.editingDish();
      if (editing) {
        await this.menu.update(editing, input);
      } else {
        await this.menu.add(input);
      }
    } catch {
      this.formError.set('Speichern fehlgeschlagen. Läuft das Backend?');
      this.saving.set(false);
      return;
    }
    this.saving.set(false);

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

    // Direkt zum Backend hochladen (dort: verkleinern, WebP, MinIO). Wir bekommen
    // die gespeicherte Bild-ID + öffentliche URL zurück.
    this.formError.set('');
    this.imageLoading.set(true);
    this.menu
      .uploadImage(file, this.formCategoryId())
      .then(({ id, url }) => {
        this.formImageUrl.set(url);
        this.formImageId.set(id);
        this.imageLoading.set(false);
      })
      .catch(() => {
        this.formError.set('Foto konnte nicht hochgeladen werden.');
        this.imageLoading.set(false);
      });
  }

  removeImage(): void {
    this.formImageUrl.set('');
    this.formImageId.set(null);
  }

  // ─── Löschen ───────────────────────────────────────────────
  askDelete(dish: Dish): void {
    this.deleting.set(dish);
  }

  cancelDelete(): void {
    this.deleting.set(null);
  }

  async confirmDelete(): Promise<void> {
    const dish = this.deleting();
    this.deleting.set(null);
    if (dish) {
      try {
        await this.menu.remove(dish);
      } catch {
        this.menu.error.set('Löschen fehlgeschlagen. Läuft das Backend?');
      }
    }
  }

  private resetForm(): void {
    this.formName.set('');
    this.formZutaten.set('');
    this.formPreis.set('');
    this.formImageUrl.set('');
    this.formImageId.set(null);
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
