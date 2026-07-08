import { Routes } from '@angular/router';

import { AdminShell } from './admin-shell/admin-shell';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminShell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Dashboard | Hamta Admin',
        loadComponent: () => import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'menu',
        title: 'Speisekarte | Hamta Admin',
        loadComponent: () => import('./pages/menu/menu.page').then((m) => m.MenuPage),
      },
      {
        path: 'reservations',
        title: 'Reservierungen | Hamta Admin',
        loadComponent: () =>
          import('./pages/reservations/reservations.page').then((m) => m.ReservationsPage),
      },
      {
        path: 'settings',
        title: 'Einstellungen | Hamta Admin',
        loadComponent: () => import('./pages/settings/settings.page').then((m) => m.SettingsPage),
      },
    ],
  },
];
