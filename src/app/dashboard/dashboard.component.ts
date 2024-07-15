import { Component, inject } from '@angular/core';
import { MinMaxAward } from '../interfaces/MinMaxAward';
import { Movie } from '../interfaces/Movie';
import { MultipleWinners } from '../interfaces/MultipleWinners';
import { StudioWinner } from '../interfaces/StudioWinner';
import { MoviesService } from '../movies.service';
import { TableDataComponent } from '../table-data/table-data.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableDataComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  moviesService: MoviesService = inject(MoviesService);
  multipleWinners: MultipleWinners[] = [];
  studioWinners: StudioWinner[] = [];
  minMaxAward: MinMaxAward = { min: [], max: [] };
  movieWinner: Movie[] = [];

  async ngOnInit() {
    this.moviesService.getYearWithMultipleWinners().then((years) => {
      this.multipleWinners = years;
    });

    this.moviesService.getStudiosWithMoreWinners().then((studios) => {
      this.studioWinners = studios;
    });

    this.moviesService.getMinMaxWinner().then((data) => {
      this.minMaxAward = data;
    });
  }

  changeSearchYear(search: String) {
    if (search === '') {
      this.movieWinner = [];
    } else {
      this.moviesService.getWinnerByYear(search).then((movie) => {
        this.movieWinner = movie;
      });
    }
  }
}
