import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ContentComponent } from 'src/app/shared/content/content.component';

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
