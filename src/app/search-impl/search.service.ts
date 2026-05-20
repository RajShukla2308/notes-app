import { Injectable } from '@angular/core';
import { MOVIES } from './movies.constants';
import { from, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  MOVIES = MOVIES;

  getMovies(){
    return of(this.MOVIES);
  }
}
