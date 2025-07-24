import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-2',
  imports: [ButtonModule],
  templateUrl: './dialog-2.component.html',
  styleUrl: './dialog-2.component.scss',
})
export class Dialog2Component implements OnInit {
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);

  data = signal<any>(null);

  ngOnInit() {
    this.data.set(this.config.data);
  }

  close() {
    this.ref.close();
  }
}
