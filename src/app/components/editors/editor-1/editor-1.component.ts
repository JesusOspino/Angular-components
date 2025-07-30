import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '@shared/editor/editor.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-editor-1',
  imports: [FormsModule, QuillModule, EditorComponent],
  templateUrl: './editor-1.component.html',
  styleUrl: './editor-1.component.scss',
})
export class Editor1Component {
  value = signal<string>('');
}
