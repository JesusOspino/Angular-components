import { Component, inject } from '@angular/core';
import { ConfigPageService } from 'src/app/common/services/config-page.service';
import { Upload1Component } from './upload-1/upload-1.component';
import { Upload2Component } from './upload-2/upload-2.component';

@Component({
  selector: 'app-uploads',
  imports: [Upload1Component, Upload2Component],
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
