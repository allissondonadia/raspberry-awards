import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesService } from '../movies.service';

import { PageableMovies } from '../interfaces/PageableMovies';
import { TablePageableComponent } from './table-pageable.component';

const mockMovies: PageableMovies = {
  content: [],
  totalElements: 0,
  number: 0,
  size: 0,
  totalPages: 0,
  first: true,
  last: true,
};

describe('TablePageableComponent', () => {
  let component: TablePageableComponent;
  let fixture: ComponentFixture<TablePageableComponent>;
  let moviesService: MoviesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FormsModule],
      providers: [MoviesService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePageableComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.page).toBe(0);
    expect(component.size).toBe(15);
    expect(component.yearFilter).toBe('');
    expect(component.winnerFilter).toBe('');
  });

  it('should call getMovies method on ngOnInit', async () => {
    spyOn(component, 'getMovies');
    await component.ngOnInit();
    expect(component.getMovies).toHaveBeenCalled();
  });

  it('should call moviesService.getMovies method with correct parameters on getMovies', async () => {
    spyOn(moviesService, 'getMovies').and.returnValue(
      Promise.resolve(mockMovies)
    );
    component.page = 1;
    component.size = 10;
    component.yearFilter = '2021';
    component.winnerFilter = 'true';
    await component.getMovies();
    expect(moviesService.getMovies).toHaveBeenCalledWith(1, 10, '2021', 'true');
  });

  it('should update pageableMovies property on getMovies', async () => {
    const mockData = {
      content: [],
      totalElements: 10,
      number: 1,
      size: 10,
      totalPages: 2,
      first: false,
      last: true,
    };
    spyOn(moviesService, 'getMovies').and.returnValue(
      Promise.resolve(mockData)
    );
    await component.getMovies();
    expect(component.pageableMovies).toEqual(mockData);
  });

  it('should reset page to 0 and call getMovies method on filter', async () => {
    spyOn(component, 'getMovies');
    component.page = 2;
    await component.filter();
    expect(component.page).toBe(0);
    expect(component.getMovies).toHaveBeenCalled();
  });

  it('should update page and call getMovies method on onPageChaged', () => {
    spyOn(component, 'getMovies');
    component.onPageChaged(2);
    expect(component.page).toBe(2);
    expect(component.getMovies).toHaveBeenCalled();
  });
});
