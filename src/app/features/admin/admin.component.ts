import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfigPageService } from '@services/config-page.service';
import { ContentComponent } from '@shared/content/content.component';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin',
  imports: [CardModule, ContentComponent, RouterLink],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private readonly configPageService = inject(ConfigPageService);

  options = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.configPage();

    this.options.set([
      {
        label: 'Simpsons',
        routerLink: '/admin/simpsons',
      },
    ]);
  }

  configPage() {
    this.configPageService.setTitle('Config');
    this.configPageService.setDescription('Vista principal de administración');
    this.configPageService.setBreadcrumbItems([{ label: 'Administración' }]);
  }
}
