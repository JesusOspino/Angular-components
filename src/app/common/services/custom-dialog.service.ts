import { DestroyRef, inject, Injectable, Type } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataType } from '@interfaces/data-type.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomDialogService {
  private readonly dialogService = inject(DialogService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private dialogRefs: DynamicDialogRef[] = [];

  /**
   * Constructor de la clase
   */
  constructor() {
    // Escrucha los cambios de ruta en la app y cierra los dialogos que esten abiertos.
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.closeAll();
      });
  }

  /**
   * Abre una ventana de dialogo
   * @param component componente a renderizar en la ventana de dialogo
   * @param config configuraciones de la ventana de dialogo
   */
  public open<T>(
    component: Type<any>,
    config: DynamicDialogConfig<DataType<T>>
  ): DynamicDialogRef {
    const dialogRef = this.dialogService.open<any, DataType<T>>(component, {
      ...config,
      modal: config.modal ?? true,
      closable: config.closable ?? true,
      closeOnEscape: config.closeOnEscape ?? true,
    });

    this.dialogRefs.push(dialogRef);

    dialogRef.onClose.subscribe(() => {
      this.dialogRefs = this.dialogRefs.filter((ref) => ref !== dialogRef);
    });

    return dialogRef;
  }

  /**
   * Cierra todas las ventanas de dialogo abiertas
   */
  private closeAll(): void {
    this.dialogRefs.forEach((ref) => ref.close());
    this.dialogRefs = [];
  }
}
