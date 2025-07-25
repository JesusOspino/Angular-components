import { DialogType } from '../enums/dialog-type.enum';

export interface DataType<T = any> {
  dialogType: DialogType;
  data?: T;
}
