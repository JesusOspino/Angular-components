import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CustomMessageService {
  private readonly messageService: MessageService = inject(MessageService);

  info(message: string, title: string = 'Información') {
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: message,
      life: 3000,
    });
  }

  success(message: string, title: string = 'Éxito') {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: message,
      life: 3000,
    });
  }

  warn(message: string, title: string = 'Advertencia') {
    this.messageService.add({
      severity: 'warn',
      summary: title,
      detail: message,
      life: 3000,
    });
  }

  error(message: string, title: string = 'Error') {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: message,
      life: 3000,
    });
  }

  contrast(message: string, title: string = 'Ten en cuenta') {
    this.messageService.add({
      severity: 'contrast',
      summary: title,
      detail: message,
      life: 3000,
    });
  }

  secondary(message: string, title: string = 'Secundario') {
    this.messageService.add({
      severity: 'secondary',
      summary: title,
      detail: message,
      life: 3000,
    });
  }
}
