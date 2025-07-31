import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin.component').then((c) => c.AdminComponent),
      },
      {
        path: 'simpsons',
        loadComponent: () =>
          import('./simpsons/simpsons.component').then(
            (c) => c.SimpsonsComponent
          ),
      },
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
    ],
  },
];
