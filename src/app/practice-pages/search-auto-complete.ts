import { Component, OnInit, inject, DestroyRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {debounceTime, Subject, distinctUntilChanged, switchMap, catchError, of, finalize, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      type="text"
      (input)="search($event)"
      placeholder="Search products"
    />

    <div *ngIf="loading">
      Loading...
    </div>

    <div *ngFor="let item of results">
      {{ item.name }}
    </div>
  `
})
export class SearchComponent implements OnInit{

  results: any[] = [];
  loading = false;

  searchTerm = new Subject<string>();
  destroyRef$ = inject(DestroyRef)

  constructor(private http: HttpClient) {}


  ngOnInit(){
    this.searchTerm.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef$),
        switchMap(val=>{
                this.loading = true;
                return this.http.get<any[]>(`/api/search?q=${val}`).pipe(
                    catchError(error=>
                        {
                            console.log(error);
                            return of([])
                        }
                    ),
                    finalize(()=>{
                        this.loading = false;
                    })
                )
            }
        )
    ).subscribe(data=>{
        this.results = data;
    })
  }

  search(event: Event) {

    this.searchTerm.next((event.target as HTMLInputElement).value)
  }
}