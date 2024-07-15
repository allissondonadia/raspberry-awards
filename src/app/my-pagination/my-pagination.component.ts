import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageableMovies } from '../interfaces/PageableMovies';

@Component({
  selector: 'app-my-pagination',
  standalone: true,
  imports: [],
  templateUrl: './my-pagination.component.html',
  styleUrl: './my-pagination.component.css',
})
export class MyPaginationComponent {
  @Input() pageableMovies!: PageableMovies;

  @Output() pageChangedEvent = new EventEmitter<number>();

  pageChanged(page: number) {
    this.pageChangedEvent.emit(page);
  }

  get getArrayPages(): number[] {
    if (!this.pageableMovies) return [];
    if (this.pageableMovies.totalPages < 6) {
      return Array.from(
        { length: this.pageableMovies.totalPages },
        (_, i) => i
      );
    } else if (this.pageableMovies.number < 3) {
      return [0, 1, 2, 3, 4];
    } else if (
      this.pageableMovies.number >
      this.pageableMovies.totalPages - 4
    ) {
      return [
        this.pageableMovies.totalPages - 5,
        this.pageableMovies.totalPages - 4,
        this.pageableMovies.totalPages - 3,
        this.pageableMovies.totalPages - 2,
        this.pageableMovies.totalPages - 1,
      ];
    } else {
      return [
        this.pageableMovies.number - 2,
        this.pageableMovies.number - 1,
        this.pageableMovies.number,
        this.pageableMovies.number + 1,
        this.pageableMovies.number + 2,
      ];
    }
  }
}
