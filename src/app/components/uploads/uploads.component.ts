import { Component, inject } from '@angular/core';
import { Upload1Component } from './upload-1/upload-1.component';
import { ConfigPageService } from '@services/config-page.service';
import { ContentComponent } from '@shared/content/content.component';

@Component({
  selector: 'app-uploads',
  imports: [ContentComponent, Upload1Component],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.scss',
})
export class UploadsComponent {
  private readonly configPageService = inject(ConfigPageService);

  ngOnInit(): void {
    this.configPage();
  }

  configPage() {
    this.configPageService.setTitle('Uploads');
    this.configPageService.setDescription(
      'Componentes para subida de imagenes o archivos'
    );
    this.configPageService.setBreadcrumbItems([
      { label: 'Configuración', routerLink: '/config' },
      { label: 'Uploads' },
    ]);
  }
}
