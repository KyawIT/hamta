import { Routes } from '@angular/router';

import { AdminShell } from './admin-shell/admin-shell';
import { authGuard } from './auth/auth.guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    title: 'Anmelden | Hamta Admin',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    component: AdminShell,
    canActivate: [authGuard],
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
        path: 'gallery',
        title: 'Galerie | Hamta Admin',
        loadComponent: () => import('./pages/gallery/gallery.page').then((m) => m.GalleryPage),
      },
      {
        path: 'reservations',
        title: 'Reservierungen | Hamta Admin',
        loadComponent: () =>
          import('./pages/reservations/reservations.page').then((m) => m.ReservationsPage),
      },
    ],
  },
];
