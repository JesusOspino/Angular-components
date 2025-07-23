import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dialogs',
    loadComponent: () => import('./components/dialogs/dialogs.component').then(m => m.DialogsComponent),
  },
  {
    path: 'uploads',
    loadComponent: () => import('./components/uploads/uploads.component').then(m => m.UploadsComponent),
  },
  {
    path: '**',
    redirectTo: 'dialogs',
  },
  {
    path: '',
    redirectTo: 'dialogs',
    pathMatch: 'full',
  }
];
