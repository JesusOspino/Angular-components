import { Component, inject } from '@angular/core';
import { Upload1Component } from './upload-1/upload-1.component';
import { ConfigPageService } from '@services/config-page.service';

@Component({
  selector: 'app-uploads',
  imports: [Upload1Component],
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
      { label: 'Components' },
      { label: 'Uploads' },
    ]);
  }
}
