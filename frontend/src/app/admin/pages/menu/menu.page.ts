import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  template: `
    <header class="mb-8">
      <p class="section-label mb-2">Verwaltung</p>
      <h1 class="font-serif text-2xl font-semibold text-on-surface">Speisekarte</h1>
    </header>

    <div
      class="rounded-sm border border-dashed border-white/10 bg-surface-high p-10 text-center"
    >
      <p class="text-sm text-outline-dim">
        Hier verwaltest du bald Vor-, Haupt- und Nachspeisen. Anbindung an die API folgt.
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage {}
