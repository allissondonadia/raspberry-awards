import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesService } from '../movies.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [MoviesService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize multipleWinners, studioWinners, minMaxAward, and movieWinner', () => {
    expect(component.multipleWinners).toEqual([]);
    expect(component.studioWinners).toEqual([]);
    expect(component.minMaxAward).toEqual({ min: [], max: [] });
    expect(component.movieWinner).toEqual([]);
  });

  it('should call moviesService methods to fetch data', () => {
    spyOn(moviesService, 'getYearWithMultipleWinners').and.returnValue(
      Promise.resolve([])
    );
    spyOn(moviesService, 'getStudiosWithMoreWinners').and.returnValue(
      Promise.resolve([])
    );
    spyOn(moviesService, 'getMinMaxWinner').and.returnValue(
      Promise.resolve({ min: [], max: [] })
    );

    component.ngOnInit();

    expect(moviesService.getYearWithMultipleWinners).toHaveBeenCalled();
    expect(moviesService.getStudiosWithMoreWinners).toHaveBeenCalled();
    expect(moviesService.getMinMaxWinner).toHaveBeenCalled();
  });
});
