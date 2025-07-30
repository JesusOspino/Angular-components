import { Component } from '@angular/core';
import { ContentComponent } from '@shared/content/content.component';

@Component({
  selector: 'app-view-1',
  imports: [ContentComponent],
  templateUrl: './view-1.component.html',
  styleUrl: './view-1.component.scss',
})
export class View1Component {}
