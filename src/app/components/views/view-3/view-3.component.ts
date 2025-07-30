import { Component } from '@angular/core';
import { ContentComponent } from '@shared/content/content.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-3',
  imports: [ContentComponent, ButtonModule],
  templateUrl: './view-3.component.html',
  styleUrl: './view-3.component.scss',
})
export class View3Component {
  accept() {}
  cancel() {}
}
