import { Component, inject } from '@angular/core';
import { View1Component } from './view-1/view-1.component';
import { View2Component } from './view-2/view-2.component';
import { View3Component } from './view-3/view-3.component';
import { View4Component } from './view-4/view-4.component';
import { ConfigPageService } from '@services/config-page.service';
import { ContentComponent } from '@shared/content/content.component';

@Component({
  selector: 'app-views',
  imports: [
    ContentComponent,
    View1Component,
    View2Component,
    View3Component,
    View4Component,
  ],
  templateUrl: './views.component.html',
  styleUrl: './views.component.scss',
})
export class ViewsComponent {
  private readonly configPageService = inject(ConfigPageService);

  ngOnInit(): void {
    this.configPage();
  }

  configPage() {
    this.configPageService.setTitle('Vistas');
    this.configPageService.setDescription(
      'Muestra las diferentes formas de adecuar una vista'
    );
    this.configPageService.setBreadcrumbItems([
      { label: 'Configuración', routerLink: '/config' },
      { label: 'Vistas', routerLink: '/views' },
    ]);
  }
}
