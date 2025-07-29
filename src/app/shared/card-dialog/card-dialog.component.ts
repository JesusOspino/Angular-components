import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card-dialog',
  imports: [ButtonModule, NgClass, NgTemplateOutlet],
  templateUrl: './card-dialog.component.html',
  styleUrl: './card-dialog.component.scss',
})
export class CardDialogComponent {
  // Inputs con signals
  showButtonConfirm = input<boolean>(false);
  showButtonCancel = input<boolean>(false);
  labelConfirm = input<string>('Aceptar');
  labelCancel = input<string>('Cancelar');

  styleClass = input<string>('');
  styleHeader = input<string>('');
  styleBody = input<string>('');
  styleFooter = input<string>('');

  // Outputs con signals
  onCancel = output<Event>();
  onConfirm = output<Event>();

  // Templates con contentChild (nuevo enfoque con signals)
  headerTemplate = contentChild<TemplateRef<any>>('header');
  bodyTemplate = contentChild<TemplateRef<any>>('body');
  footerTemplate = contentChild<TemplateRef<any>>('footer');

  confirm(event: Event) {
    this.onConfirm.emit(event);
  }

  cancel(event: Event) {
    this.onCancel.emit(event);
  }
}
