import { Component, inject } from '@angular/core';
import { Table1Component } from './table-1/table-1.component';
import { ConfigPageService } from '@services/config-page.service';
import { ContentComponent } from '@shared/content/content.component';

@Component({
  selector: 'app-tables',
  imports: [ContentComponent, Table1Component],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
})
export class TablesComponent {
  private readonly configPageService = inject(ConfigPageService);

  ngOnInit(): void {
    this.configPage();
  }

  configPage() {
    this.configPageService.setTitle('Tablas');
    this.configPageService.setDescription(
      'Componente table de primeng con estado de ngrx signals y paginación'
    );
    this.configPageService.setBreadcrumbItems([
      { label: 'Configuración', routerLink: '/config' },
      { label: 'Tablas' },
    ]);
  }
}
