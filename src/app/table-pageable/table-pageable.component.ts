import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageableMovies } from '../interfaces/PageableMovies';
import { MoviesService } from '../movies.service';
import { MyPaginationComponent } from '../my-pagination/my-pagination.component';

@Component({
  selector: 'app-table-pageable',
  templateUrl: './table-pageable.component.html',
  styleUrl: './table-pageable.component.css',
  standalone: true,
  imports: [FormsModule, MyPaginationComponent],
})
export class TablePageableComponent {
  moviesService: MoviesService = inject(MoviesService);
  pageableMovies: PageableMovies = {
    content: [],
    totalElements: 0,
    number: 0,
    size: 0,
    totalPages: 0,
    first: true,
    last: true,
  };
  page: number = 0;
  size: number = 15;
  yearFilter: string = '';
  winnerFilter: string = '';

  async ngOnInit() {
    await this.getMovies();
  }

  async getMovies() {
    this.moviesService
      .getMovies(this.page, this.size, this.yearFilter, this.winnerFilter)
      .then((data) => {
        this.pageableMovies = data;
      });
  }

  async filter() {
    this.page = 0;
    await this.getMovies();
  }

  onPageChaged(page: number) {
    this.page = page;
    this.getMovies();
  }
}
