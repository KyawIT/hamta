import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideImageUp,
  LucideLoaderCircle,
  LucidePencil,
  LucidePlus,
  LucideTrash2,
  LucideX,
} from '@lucide/angular';

import { MenuAdminService } from '../../menu/menu-admin.service';
import { CATEGORIES, CategoryId, Dish } from '../../menu/menu.model';

/** Maximale Kantenlänge, auf die hochgeladene Fotos verkleinert werden. */
const MAX_IMAGE_SIZE = 900;

@Component({
  selector: 'app-admin-menu',
  imports: [
    FormsModule,
    LucideImageUp,
    LucideLoaderCircle,
    LucidePencil,
    LucidePlus,
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
  readonly activeId = signal<CategoryId>('starter');

  readonly activeCategory = computed(
    () => this.categories.find((c) => c.id === this.activeId()) ?? this.categories[0],
  );
  readonly dishes = computed(() =>
    this.menu.dishes().filter((d) => d.category === this.activeId()),
  );

  // ─── Formular-Zustand ──────────────────────────────────────
  /** null = geschlossen, sonst die zu bearbeitende ID bzw. 'new'. */
  readonly editing = signal<number | 'new' | null>(null);
  readonly formName = signal('');
  readonly formZutaten = signal('');
  readonly formPreis = signal('');
  readonly formImageUrl = signal('');
  readonly formError = signal('');
  readonly imageLoading = signal(false);

  readonly formCategory = computed(() => this.activeCategory());
  readonly isEditing = computed(() => typeof this.editing() === 'number');

  // ─── Löschen ───────────────────────────────────────────────
  readonly deleting = signal<Dish | null>(null);

  select(id: CategoryId): void {
    this.activeId.set(id);
  }

  countOf(id: CategoryId): number {
    return this.menu.dishes().filter((d) => d.category === id).length;
  }

  formatPrice(preis: number | null): string {
    return preis == null ? '—' : `€ ${preis.toFixed(2).replace('.', ',')}`;
  }

  // ─── Formular öffnen/schließen ─────────────────────────────
  openNew(): void {
    this.resetForm();
    this.editing.set('new');
  }

  openEdit(dish: Dish): void {
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
      category: this.activeId(),
      name,
      zutaten: this.formCategory().hasZutaten ? this.formZutaten().trim() : '',
      preis,
      imageUrl: this.formImageUrl() || undefined,
    };

    const current = this.editing();
    if (typeof current === 'number') {
      this.menu.update(current, input);
    } else {
      this.menu.add(input);
    }
    this.closeForm();
  }

  // ─── Foto-Upload ───────────────────────────────────────────
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = ''; // erlaubt erneutes Auswählen derselben Datei
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

  /** Liest das Foto, verkleinert es auf MAX_IMAGE_SIZE und gibt eine Data-URL zurück. */
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
}
