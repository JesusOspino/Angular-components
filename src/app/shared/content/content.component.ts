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
  selector: 'app-content',
  imports: [ButtonModule, NgClass, NgTemplateOutlet],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  // Inputs con signals
  header = input<string>('');
  styleClass = input<string>('');
  closable = input<boolean>(false);

  // Ouputs con signals
  onClose = output<Event>();

  // Templates con contentChild (nuevo enfoque con signals)
  headerTemplate = contentChild<TemplateRef<any>>('header');
  bodyTemplate = contentChild<TemplateRef<any>>('body');
  footerTemplate = contentChild<TemplateRef<any>>('footer');

  close(event: Event) {
    this.onClose.emit(event);
  }
}
