import { Injectable } from '@angular/core';
import { MinMaxAward } from './interfaces/MinMaxAward';
import { Movie } from './interfaces/Movie';
import { MultipleWinners } from './interfaces/MultipleWinners';
import { PageableMovies } from './interfaces/PageableMovies';
import { StudioWinner } from './interfaces/StudioWinner';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  readonly baseUrl = 'https://tools.texoit.com/backend-java/api/movies';

  async getYearWithMultipleWinners(): Promise<MultipleWinners[]> {
    const response = await fetch(
      `${this.baseUrl}?projection=years-with-multiple-winners`
    );
    const data = await response.json();
    return data?.years ?? [];
  }

  async getStudiosWithMoreWinners(): Promise<StudioWinner[]> {
    const response = await fetch(
      `${this.baseUrl}?projection=studios-with-win-count`
    );
    const data = await response.json();
    const studioWinner: StudioWinner[] = data?.studios ?? [];
    const studioWinnerSorted = studioWinner.sort(
      (a, b) => b.winCount - a.winCount
    );

    return studioWinnerSorted.slice(0, 3);
  }

  async getMinMaxWinner(): Promise<MinMaxAward> {
    const response = await fetch(
      `${this.baseUrl}?projection=max-min-win-interval-for-producers`
    );
    const data = await response.json();
    return data ?? { min: [], max: [] };
  }

  async getWinnerByYear(year: String): Promise<Movie[]> {
    const response = await fetch(`${this.baseUrl}?winner=true&year=${year}`);
    return (await response.json()) ?? [];
  }

  async getMovies(
    page: Number = 0,
    size: Number = 10,
    year?: String,
    winner?: String
  ): Promise<PageableMovies> {
    let url = `${this.baseUrl}?page=${page}&size=${size}`;

    if (year) {
      url = `${url}&year=${year}`;
    }

    if (winner) {
      url = `${url}&winner=${winner}`;
    }

    const response = await fetch(url);
    return (await response.json()) ?? [];
  }
}
