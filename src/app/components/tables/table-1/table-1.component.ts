import { Component, inject, OnInit } from '@angular/core';
import { SimpsonStore } from 'src/app/common/store/simpson.store';
import { TableModule, TablePageEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ImageComponent } from 'src/app/shared/image/image.component';

@Component({
  selector: 'app-table-1',
  imports: [TableModule, SkeletonModule, ImageComponent],
  templateUrl: './table-1.component.html',
  styleUrl: './table-1.component.scss',
})
export class Table1Component implements OnInit {
  public readonly simpsonStore = inject(SimpsonStore);

  ngOnInit(): void {
    this.simpsonStore.getAll();
  }

  onPageChange(event: TablePageEvent): void {
    const selectedPage = event.first / event.rows + 1; // Calcular la página actual
    this.simpsonStore.setPageNumber(selectedPage);
  }

  onRowsChange(event: number): void {
    this.simpsonStore.setPageSize(event);
  }
}
