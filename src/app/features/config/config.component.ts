import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfigPageService } from '@services/config-page.service';
import { ContentComponent } from '@shared/content/content.component';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-config',
  imports: [CardModule, ContentComponent, RouterLink],
  templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit {
  private readonly configPageService = inject(ConfigPageService);

  options = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.configPage();

    this.options.set([
      {
        label: 'Dialogos',
        routerLink: '/config/dialogs',
      },
      {
        label: 'Editores',
        routerLink: '/config/editors',
      },
      {
        label: 'Tablas',
        routerLink: '/config/tables',
      },
      {
        label: 'Tarjetas',
        routerLink: '/config/cards',
      },
      {
        label: 'Uploads',
        routerLink: '/config/uploads',
      },
      {
        label: 'Vistas',
        routerLink: '/config/views',
      },
    ]);
  }

  configPage() {
    this.configPageService.setTitle('Config');
    this.configPageService.setDescription('Vista principal de configuración');
    this.configPageService.setBreadcrumbItems([{ label: 'Configuración' }]);
  }
}
