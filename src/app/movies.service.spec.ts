import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return years with multiple winners', async () => {
    const years = await service.getYearWithMultipleWinners();
    expect(years).toBeDefined();
    expect(Array.isArray(years)).toBe(true);
  });

  it('should return studios with more winners', async () => {
    const studios = await service.getStudiosWithMoreWinners();
    expect(studios).toBeDefined();
    expect(Array.isArray(studios)).toBe(true);
  });

  it('should return min and max win interval for producers', async () => {
    const minMaxAward = await service.getMinMaxWinner();
    expect(minMaxAward).toBeDefined();
    expect(minMaxAward.min).toBeDefined();
    expect(minMaxAward.max).toBeDefined();
  });

  it('should return movies by year', async () => {
    const year = '2021';
    const movies = await service.getWinnerByYear(year);
    expect(movies).toBeDefined();
    expect(Array.isArray(movies)).toBe(true);
  });

  it('should return pageable movies', async () => {
    const page = 0;
    const size = 10;
    const pageableMovies = await service.getMovies(page, size);
    expect(pageableMovies).toBeDefined();
    expect(pageableMovies.content).toBeDefined();
    expect(pageableMovies.totalElements).toBeDefined();
    expect(pageableMovies.totalPages).toBeDefined();
  });
});
