import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomDialogService } from './common/services/custom-dialog.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { translation } from './common/helpers/translation.helper';
import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';

const modulesImports = [CustomDialogService];

const primengImports = [
  ConfirmationService,
  DialogService,
  DynamicDialogConfig,
  MessageService,
  DynamicDialogRef,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.p-dark',
        },
      },
      translation: translation,
    }),
    ...modulesImports,
    ...primengImports,
  ],
};
