export interface DataType<T = any> {
  dialogType: 'create' | 'update' | 'delete' | 'view';
  data?: T;
}
