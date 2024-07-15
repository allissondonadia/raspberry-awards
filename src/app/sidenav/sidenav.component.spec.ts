import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SidenavComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should render the correct navigation links', () => {
    const fixture = TestBed.createComponent(SidenavComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.navbar-links li');
    expect(links.length).toBe(2);
  });
});
