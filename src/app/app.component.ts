import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeToggleButtonComponent } from '@shared/theme-toggle-button/theme-toggle-button.component';
import { ThemeConfiguratorButtonComponent } from '@shared/theme-configurator-button/theme-configurator-button.component';

@Component({
  selector: 'app-root',
  imports: [
    TabsModule,
    RouterOutlet,
    RouterLink,
    ThemeToggleButtonComponent,
    ThemeConfiguratorButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  tabs = signal<any[]>([]);
  currentRoute = signal<string>('');

  ngOnInit(): void {
    this.tabs.set([
      {
        label: 'Dialogos',
        route: '/dialogs',
      },
      {
        label: 'Editores',
        route: '/editors',
      },
      {
        label: 'Tablas',
        route: '/tables',
      },
      {
        label: 'Tarjetas',
        route: '/cards',
      },
      {
        label: 'Uploads',
        route: '/uploads',
      },
      {
        label: 'Vistas',
        route: '/views',
      },
    ]);

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute.set(event.urlAfterRedirects);
        }
      },
    });
  }
}
