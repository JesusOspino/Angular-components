import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataType } from '../../../common/interfaces/data-type.interface';
import { Temporal } from '../../../common/interfaces/temporal.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dialog-3',
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './dialog-3.component.html',
  styleUrl: './dialog-3.component.scss',
})
export class Dialog3Component implements OnInit {
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly config: DynamicDialogConfig<DataType> =
    inject(DynamicDialogConfig);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private dataType = signal<DataType>(null);

  dialogType = computed(() => this.dataType().dialogType);
  configData = linkedSignal<Temporal>(() => this.dataType().data);

  form: FormGroup;

  constructor() {
    effect(() => {
      const data = this.configData();
      if (data) this.form.patchValue(data);
    });
  }

  ngOnInit() {
    this.formProperties();
    this.dataType.set(this.config.data);
  }

  formProperties() {
    this.form = this.formBuilder.group({
      name: [null, [RxwebValidators.required({ message: 'Es requerido!' })]],
      description: [
        null,
        [RxwebValidators.required({ message: 'Es requerido!' })],
      ],
    });
  }

  close(data?: any) {
    this.ref.close(data);
  }
}
