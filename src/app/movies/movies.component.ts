import { Component } from '@angular/core';
import { TablePageableComponent } from '../table-pageable/table-pageable.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [TablePageableComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {}
