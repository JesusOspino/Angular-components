import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog1Component } from './dialog-1/dialog-1.component';
import { Dialog2Component } from './dialog-2/dialog-2.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomDialogService } from '../../common/services/custom-dialog.service';
import { Dialog3Component } from './dialog-3/dialog-3.component';
import { Temporal } from '../../common/interfaces/temporal.interface';

@Component({
  selector: 'app-dialogs',
  imports: [ButtonModule, Dialog1Component],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.scss',
})
export class DialogsComponent {
  private readonly dialogService = inject(DialogService);
  private readonly customDialogService = inject(CustomDialogService);

  modal1Visible = signal<boolean>(false);

  openModal1(): void {
    this.modal1Visible.set(true);
  }

  openModal2(): void {
    this.dialogService.open(Dialog2Component, {
      header: 'Modal 1',
      width: '50%',
      closable: true,
      maximizable: true,
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        letter: 'Hola jesus',
        number: 2,
      },
    });
  }

  openModal3(): void {
    const ref = this.customDialogService.open<Temporal>(Dialog3Component, {
      header: 'Modal 3',
      width: '50%',
      maximizable: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        dialogType: 'create',
        data: {
          name: 'Jesus',
          description: 'Estás en el modal personalizado #3',
        },
      },
    });

    ref.onClose.subscribe((data) => {
      if (data) console.log(data);
    });
  }
}
