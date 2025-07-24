import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageComponent } from 'src/app/shared/image/image.component';

@Component({
  selector: 'app-upload-1',
  imports: [FileUploadModule, ButtonModule, ImageComponent],
  templateUrl: './upload-1.component.html',
  styleUrl: './upload-1.component.scss',
})
export class Upload1Component {
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
