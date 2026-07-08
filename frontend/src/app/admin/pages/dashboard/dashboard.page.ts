import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <header class="mb-8">
      <p class="section-label mb-2">Übersicht</p>
      <h1 class="font-serif text-2xl font-semibold text-on-surface">Dashboard</h1>
    </header>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      @for (stat of stats; track stat.label) {
        <div
          class="rounded-sm border border-white/5 bg-surface-high p-6 transition-colors hover:border-primary/25"
        >
          <p
            class="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-outline-dim"
          >
            {{ stat.label }}
          </p>
          <p class="font-serif text-3xl font-semibold text-primary">{{ stat.value }}</p>
        </div>
      }
    </div>

    <p class="mt-8 text-sm text-outline-dim">
      Willkommen im Hamta-Adminbereich. Wähle links einen Bereich, um Inhalte zu verwalten.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  readonly stats = [
    { label: 'Gerichte', value: '—' },
    { label: 'Reservierungen heute', value: '—' },
    { label: 'Offene Anfragen', value: '—' },
  ];
}
