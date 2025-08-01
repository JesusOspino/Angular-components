import { NgClass } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { DeviceService } from '@services/device.service';
import { ImageComponent } from '@shared/image/image.component';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-upload-1',
  imports: [FileUploadModule, ButtonModule, ImageComponent, NgClass],
  templateUrl: './upload-1.component.html',
  styleUrl: './upload-1.component.scss',
})
export class Upload1Component {
  mode = input<'square' | 'large'>('large');

  readonly deviceService = inject(DeviceService);

  selectedFiles = signal<File[]>([]);

  /**
   * Selecciona la imagen del bordado
   * @param event
   */
  public async onFileSelect(event: { currentFiles: File[] }) {
    const files = event.currentFiles;
    if (files && files.length > 0) {
      // Actualizamos la señal con el archivo seleccionado
      this.selectedFiles.set(files);
    }
  }
}
