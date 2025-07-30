import {
  Component,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { FileService } from 'src/app/common/services/http-services/file.service';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditorComponent),
  multi: true,
};

@Component({
  selector: 'app-editor',
  imports: [FormsModule, QuillModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  providers: [VALUE_ACCESSOR],
})
export class EditorComponent implements ControlValueAccessor {
  placeholder = input<string>('');
  heigth = input<string>('300px');
  onChangeText = output<string>();

  private readonly editor =
    viewChild.required<QuillEditorComponent>('quillEditor'); // Referencia al editor

  private readonly fileService = inject(FileService);

  disabled = signal<boolean>(false);
  textValue = signal<string>('');

  constructor() {
    effect(() => {
      const value = this.textValue();
      this.onChangeText.emit(value);
      this.onChange(value);
    });
  }

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

  onBlur() {
    this.onTouched();
  }

  // ***************** Control Value Accessor

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.textValue.set(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
