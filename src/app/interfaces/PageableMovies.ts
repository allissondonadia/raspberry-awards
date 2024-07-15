import { Movie } from './Movie';

export interface PageableMovies {
  content: Movie[];
  totalElements: number;
  number: number;
  size: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
