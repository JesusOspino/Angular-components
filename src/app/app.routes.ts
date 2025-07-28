import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cards',
    loadComponent: () =>
      import('./components/cards/cards.component').then(
        (m) => m.CardsComponent
      ),
  },
  {
    path: 'dialogs',
    loadComponent: () =>
      import('./components/dialogs/dialogs.component').then(
        (m) => m.DialogsComponent
      ),
  },
  {
    path: 'editors',
    loadComponent: () =>
      import('./components/editors/editors.component').then(
        (m) => m.EditorsComponent
      ),
  },
  {
    path: 'tables',
    loadComponent: () =>
      import('./components/tables/tables.component').then(
        (m) => m.TablesComponent
      ),
  },
  {
    path: 'uploads',
    loadComponent: () =>
      import('./components/uploads/uploads.component').then(
        (m) => m.UploadsComponent
      ),
  },
  {
    path: 'views',
    loadComponent: () =>
      import('./components/views/views.component').then(
        (m) => m.ViewsComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'dialogs',
  },
  {
    path: '',
    redirectTo: 'dialogs',
    pathMatch: 'full',
  },
];
