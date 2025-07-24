import { Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { FileService } from 'src/app/common/services/http-services/file.service';

@Component({
  selector: 'app-editor-1',
  imports: [FormsModule, QuillModule],
  templateUrl: './editor-1.component.html',
  styleUrl: './editor-1.component.scss',
})
export class Editor1Component {
  private readonly fileService = inject(FileService);
  private readonly editor = viewChild.required<QuillEditorComponent>('editor'); // Referencia al editor

  text = signal<string>('');

  configToolbar = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // Negrita, cursiva, etc.
        ['blockquote', 'code-block'], // Bloques de código
        [{ header: 1 }, { header: 2 }], // Títulos (h1, h2)
        [{ list: 'ordered' }, { list: 'bullet' }], // Listas
        [{ script: 'sub' }, { script: 'super' }], // Subíndice/Superíndice
        [{ indent: '-1' }, { indent: '+1' }], // Sangría
        [{ direction: 'rtl' }], // Dirección del texto
        [{ size: ['small', false, 'large', 'huge'] }], // Tamaño de fuente
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // Encabezados
        [{ color: [] }, { background: [] }], // Colores
        [{ font: [] }], // Fuentes
        [{ align: [] }], // Alineación
        ['clean'], // Limpiar formato
        ['link', 'image'], // Enlaces e imágenes
      ],
      handlers: {
        image: this.imageHandler.bind(this),
      },
    },
  };

  imageHandler() {
    // Crear un input de tipo file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        // Subir la imagen usando FileService
        const response = await this.fileService.uploadFile(file).toPromise();
        const imageUrl = response?.url ?? ''; // Asegúrate de que tu backend devuelve { url: '...' }

        // Obtener el editor Quill y la posición del cursor
        const quillEditor = this.editor().quillEditor;
        const range = quillEditor.getSelection(true);

        // Insertar la imagen en el editor
        quillEditor.insertEmbed(range.index, 'image', imageUrl);
        quillEditor.setSelection(range.index + 1); // Mover el cursor después de la imagen
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    };

    input.click();
  }
}
