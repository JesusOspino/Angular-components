import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from 'src/app/shared/card/card.component';

@Component({
  selector: 'app-card-4',
  imports: [CardComponent, ButtonModule],
  templateUrl: './card-4.component.html',
  styleUrl: './card-4.component.scss',
})
export class Card4Component {}
