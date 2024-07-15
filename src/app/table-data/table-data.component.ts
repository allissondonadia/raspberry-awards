import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.css',
  standalone: true,
  imports: [MatTableModule, CommonModule],
})
export class TableDataComponent {
  @Input() dataSource!: any[];

  @Input() displayedColumns!: string[];

  @Input() columns!: string[];

  cell = 0;
  identify() {
    return this.cell++;
  }
}
