import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataType } from '../../../common/interfaces/data-type.interface';
import { Temporal } from '../../../common/interfaces/temporal.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogType } from 'src/app/common/enums/dialog-type.enum';

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

  dialogType = computed<DialogType>(() => this.dataType().dialogType);
  configData = computed<Temporal>(() => this.dataType().data);

  form: FormGroup;

  constructor() {
    this.dataType.set(this.config.data);
  }

  ngOnInit() {
    this.formProperties();
    this.initializeForm();
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

  initializeForm() {
    if (this.dialogType() != DialogType.CREATE) {
      const data = this.configData();
      if (data) this.form.patchValue(data);
    }
  }

  close(data?: any) {
    this.ref.close(data);
  }
}
