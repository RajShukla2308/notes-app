import { Component, DestroyRef, ElementRef, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { CustomDirective } from '../custom.directive';

export interface Movie{
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-search-impl',
  imports: [ReactiveFormsModule,CustomDirective],
  templateUrl: './search-impl.component.html',
  styleUrl: './search-impl.component.css'
})

export class SearchImplComponent implements OnInit{

  searchText = new FormControl('');

  searchService = inject(SearchService);
  moviesData:any = signal<Movie[]>([]);
  allMovies: Movie[] = [];

  destroyRef$ = inject(DestroyRef)


  @ViewChild('inputToFocus') inputToFocus!: ElementRef;

  ngOnInit(){
    this.searchService.getMovies().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe(movies=>{
      this.allMovies = [...movies];
      this.moviesData.set(movies)
    })
  }

  searchMovies(){
    const searchItem = this.searchText.value || '';
    this.searchText.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((val:any)=>{
       let filteredMovies = this.allMovies.filter(
      movie=>movie.title?.toLocaleLowerCase().includes(val.toLocaleLowerCase()))
      this.moviesData.set(filteredMovies)
    })
  }


  focusInput(){
    this.inputToFocus.nativeElement.focus();
  }

}
