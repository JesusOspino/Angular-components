import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card1Component } from './card-1/card-1.component';
import { Card3Component } from './card-3/card-3.component';
import { Card4Component } from './card-4/card-4.component';
import { ConfigPageService } from '@services/config-page.service';
import { CustomDialogService } from '@services/custom-dialog.service';
import { Temporal } from '@interfaces/temporal.interface';
import { Card2Component } from './card-2/card-2.component';
import { DialogType } from '@enums/dialog-type.enum';
import { ContentComponent } from '@shared/content/content.component';

@Component({
  selector: 'app-cards',
  imports: [
    Card1Component,
    Card3Component,
    Card4Component,
    ContentComponent,
    ButtonModule,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  private readonly configPageService = inject(ConfigPageService);
  private readonly customDialogService = inject(CustomDialogService);

  ngOnInit(): void {
    this.configPage();
  }

  configPage() {
    this.configPageService.setTitle('Tarjetas');
    this.configPageService.setDescription(
      'Muestra las diferentes formas de usar el componente card'
    );
    this.configPageService.setBreadcrumbItems([
      { label: 'Configuración', routerLink: '/config' },
      { label: 'Tarjetas' },
    ]);
  }

  open(): void {
    const ref = this.customDialogService.open<Temporal>(Card2Component, {
      header: 'Modal con tarjeta',
      width: '450px',
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
