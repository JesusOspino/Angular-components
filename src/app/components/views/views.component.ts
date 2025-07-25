import { Component, inject } from '@angular/core';
import { View1Component } from './view-1/view-1.component';
import { ConfigPageService } from 'src/app/common/services/config-page.service';

@Component({
  selector: 'app-views',
  imports: [View1Component],
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
      { label: 'Components' },
      { label: 'Vistas' },
    ]);
  }
}
