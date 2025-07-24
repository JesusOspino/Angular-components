import { Component, inject } from '@angular/core';
import { Table1Component } from './table-1/table-1.component';
import { ConfigPageService } from 'src/app/common/services/config-page.service';

@Component({
  selector: 'app-tables',
  imports: [Table1Component],
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
      { label: 'Components' },
      { label: 'Tablas' },
    ]);
  }
}
