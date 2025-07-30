import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { DeviceService } from '@services/device.service';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-image',
  imports: [ButtonModule, ImageModule, NgClass],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  imageMode = input<'square' | 'large'>('large');
  width = input<string>('200');
  height = input<string>('');
  src = input<string>();
  alt = input<string>();
  preview = input<boolean>(false);
  showRemove = input<boolean>(false);
  border = input<boolean>(false);
  name = input<string>('');
  size = input<string>('');
  onRemove = output<Event>();

  readonly deviceService = inject(DeviceService);

  //public isMobile = computed(() => this.deviceService.isMobile())

  public remove(event: Event) {
    this.onRemove.emit(event);
  }
}
