import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog1Component } from './dialog-1/dialog-1.component';
import { Dialog2Component } from './dialog-2/dialog-2.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomDialogService } from '../../common/services/custom-dialog.service';
import { Dialog3Component } from './dialog-3/dialog-3.component';
import { Temporal } from '../../common/interfaces/temporal.interface';
import { ConfigPageService } from 'src/app/common/services/config-page.service';
import { DialogType } from 'src/app/common/enums/dialog-type.enum';

@Component({
  selector: 'app-dialogs',
  imports: [ButtonModule, Dialog1Component],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.scss',
})
export class DialogsComponent implements OnInit {
  private readonly dialogService = inject(DialogService);
  private readonly customDialogService = inject(CustomDialogService);
  private readonly configPageService = inject(ConfigPageService);

  modal1Visible = signal<boolean>(false);

  ngOnInit(): void {
    this.configPage();
  }

  configPage() {
    this.configPageService.setTitle('Dialogos');
    this.configPageService.setDescription(
      'Muestra las diferentes maneras de usar una ventana de dialogo con primeng'
    );
    this.configPageService.setBreadcrumbItems([
      { label: 'Components' },
      { label: 'Dialogos' },
    ]);
  }

  openModal1(): void {
    this.modal1Visible.set(true);
  }

  openModal2(): void {
    this.dialogService.open(Dialog2Component, {
      header: 'Modal 2',
      width: '50%',
      closable: true,
      maximizable: true,
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        name: 'Hola jesus',
        description: 'Bienvenido, estas en el modal #2',
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
        dialogType: DialogType.UPDATE,
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
