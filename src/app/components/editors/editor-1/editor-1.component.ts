import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { EditorComponent } from 'src/app/shared/editor/editor.component';

@Component({
  selector: 'app-editor-1',
  imports: [FormsModule, QuillModule, EditorComponent],
  templateUrl: './editor-1.component.html',
  styleUrl: './editor-1.component.scss',
})
export class Editor1Component {
  value = signal<string>('');
}
