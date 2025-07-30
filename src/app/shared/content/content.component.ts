import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  contentChild,
  inject,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { ConfigPageService } from '@services/config-page.service';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-content',
  imports: [
    ButtonModule,
    NgClass,
    NgTemplateOutlet,
    ToolbarModule,
    BreadcrumbModule,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  // Inputs con signals
  header = input<string>('');
  styleClass = input<string>('');
  closable = input<boolean>(false);
  showBreadcrumb = input<boolean>(false);
  cardMode = input<boolean>(false);

  // Ouputs con signals
  onClose = output<Event>();

  // Templates con contentChild (nuevo enfoque con signals)
  headerTemplate = contentChild<TemplateRef<any>>('header');
  bodyTemplate = contentChild<TemplateRef<any>>('body');
  footerTemplate = contentChild<TemplateRef<any>>('footer');

  private readonly configPageService = inject(ConfigPageService);

  breadcrumbItems = computed(() => this.configPageService.breadcrumbItems());
  home = signal<MenuItem>({ icon: 'pi pi-home', routerLink: '/' });

  close(event: Event) {
    this.onClose.emit(event);
  }
}
