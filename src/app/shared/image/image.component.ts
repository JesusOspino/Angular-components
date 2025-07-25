import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-image',
  imports: [ImageModule, NgClass],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  width = input<string>('200');
  height = input<string>('');
  src = input<string>();
  alt = input<string>();
  preview = input<boolean>(false);
  showRemove = input<boolean>(false);
  border = input<boolean>(false);

  onRemove = output<Event>();

  remove(event: Event) {
    this.onRemove.emit(event);
  }
}
