import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-1',
  imports: [CardModule, ButtonModule],
  templateUrl: './card-1.component.html',
  styleUrl: './card-1.component.scss',
})
export class Card1Component {}
