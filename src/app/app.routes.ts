import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'config',
    loadComponent: () =>
      import('./shared/layout/layout.component').then((m) => m.LayoutComponent),
    loadChildren: () =>
      import('./features/config/config.routes').then((m) => m.configRoutes),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./shared/layout/layout.component').then((m) => m.LayoutComponent),
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: '**',
    redirectTo: 'dialogs',
  },
  {
    path: '',
    redirectTo: 'config',
    pathMatch: 'full',
  },
];
