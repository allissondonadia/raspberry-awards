import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageableMovies } from '../interfaces/PageableMovies';
import { MyPaginationComponent } from './my-pagination.component';

describe('HeaderComponent', () => {
  let component: MyPaginationComponent;
  let fixture: ComponentFixture<MyPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const mockMovies: PageableMovies = {
    content: [],
    totalElements: 0,
    number: 0,
    size: 0,
    totalPages: 0,
    first: true,
    last: true,
  };
  it('should return an array of length equal to totalPages when totalPages < 6', () => {
    component.pageableMovies = { ...mockMovies, totalPages: 4, number: 0 };
    expect(component.getArrayPages.length).toBe(4);
  });

  it('should return an array [0, 1, 2, 3, 4] when number < 3', () => {
    component.pageableMovies = { ...mockMovies, totalPages: 10, number: 2 };
    expect(component.getArrayPages).toEqual([0, 1, 2, 3, 4]);
  });

  it('should return an array [5, 6, 7, 8, 9] when number > totalPages - 4', () => {
    component.pageableMovies = { ...mockMovies, totalPages: 10, number: 8 };
    expect(component.getArrayPages).toEqual([5, 6, 7, 8, 9]);
  });

  it('should return an array [3, 4, 5, 6, 7] when number is between 3 and totalPages - 4', () => {
    component.pageableMovies = { ...mockMovies, totalPages: 10, number: 5 };
    expect(component.getArrayPages).toEqual([3, 4, 5, 6, 7]);
  });
});
