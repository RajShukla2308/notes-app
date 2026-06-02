import { Component, computed, DestroyRef, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { CustomDirective } from '../custom.directive';
import { ColorChangeDirective } from '../color-change.directive';
import { CommonModule } from '@angular/common';

export interface Movie{
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-search-impl',
  imports: [ReactiveFormsModule,CustomDirective, ColorChangeDirective, CommonModule],
  templateUrl: './search-impl.component.html',
  styleUrl: './search-impl.component.css'
})

export class SearchImplComponent implements OnInit, OnDestroy{

  searchText = new FormControl('');

  searchService = inject(SearchService);
  moviesData:any = signal<Movie[]>([]);
  allMovies: Movie[] = [];

  destroyRef$ = inject(DestroyRef)


  clockInterval: any;


  @ViewChild('inputToFocus') inputToFocus!: ElementRef;

  color= 'red';


  totalSecs = signal(300);
  remMins = computed(()=> Math.floor(this.totalSecs() / 60))
  remSecs = computed(()=> this.totalSecs() % 60)

  ngOnInit(){
    this.searchService.getMovies().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe(movies=>{
      this.allMovies = [...movies];
      this.moviesData.set(movies)
    })

    this.clockInterval = setInterval(()=>{
      this.totalSecs.update(val=> val - 1);
    },1000)



    // impemented counter with closures.
    let toIncreaseCount = this.increaseCount();
    // toIncreaseCount.increment(); //1
    // toIncreaseCount.increment(); // 2
    // toIncreaseCount.increment();  // 3
    // toIncreaseCount.increment(); // 4 
    // toIncreaseCount.decrement(); // 3
    // toIncreaseCount.increment();
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


  increaseCount(){
    let count = 0;

    return {
      increment: function(){
        return count +=1;
      },
      decrement: function(){
        return count -= 1 
      }
    }
  }

  ngOnDestroy(){
    clearInterval(this.clockInterval);

  }

}
