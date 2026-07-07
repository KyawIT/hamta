import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Hamta Restaurant – Persisches Kebap & Grill in Linz',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'impressum',
    title: 'Impressum | Hamta Restaurant Linz',
    loadComponent: () => import('./pages/impressum/impressum.page').then((m) => m.ImpressumPage),
  },
  {
    path: 'datenschutz',
    title: 'Datenschutzerklärung | Hamta Restaurant Linz',
    loadComponent: () => import('./pages/datenschutz/datenschutz.page').then((m) => m.DatenschutzPage),
  },
  { path: '**', redirectTo: '' },
];
