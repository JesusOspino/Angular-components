import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogType } from '@enums/dialog-type.enum';
import { errorMessage } from '@helpers/message.helper';
import { DataType } from '@interfaces/data-type.interface';
import { Temporal } from '@interfaces/temporal.interface';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { CardDialogComponent } from '@shared/card-dialog/card-dialog.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-card-2',
  imports: [
    CardDialogComponent,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './card-2.component.html',
  styleUrl: './card-2.component.scss',
})
export class Card2Component {
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
      name: [
        null,
        [RxwebValidators.required({ message: errorMessage.required })],
      ],
      description: [
        null,
        [RxwebValidators.required({ message: errorMessage.required })],
      ],
    });
  }

  initializeForm() {
    if (this.dialogType() != DialogType.CREATE) {
      const data = this.configData();
      if (data) this.form.patchValue(data);
    }
  }

  submit() {
    console.log(this.form.value);
  }

  close(data?: any) {
    this.ref.close(data);
  }
}
