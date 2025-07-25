import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-content',
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  // Inputs con signals
  header = input<string>('');
  styleClass = input<string>('');

  // Templates con contentChild (nuevo enfoque con signals)
  headerTemplate = contentChild<TemplateRef<any>>('header');
  bodyTemplate = contentChild<TemplateRef<any>>('body');
  footerTemplate = contentChild<TemplateRef<any>>('footer');
}
