import { Component, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dialog-1',
  imports: [DialogModule, ButtonModule],
  templateUrl: './dialog-1.component.html',
  styleUrl: './dialog-1.component.scss',
})
export class Dialog1Component {
  visible = model<boolean>(false);

  close() {
    this.visible.set(false);
  }
}
