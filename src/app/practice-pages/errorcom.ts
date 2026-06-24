import { Component, HostListener, OnInit, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {debounceTime, Subject, distinctUntilChanged, switchMap, finalize, of, catchError, filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editor',
  imports: [CommonModule, FormsModule],
  template: `
    <textarea
      [value]="content"
      (input)="onInput($event)"
    ></textarea>

    <p *ngIf="saving">Saving...</p>
  `
})
export class EditorComponent implements OnInit{

  content:any = '';
  saving = false;
  unsaved = false;
  isVisible = true;

  searchSubject = new Subject<string>();
  destroyRef$ = inject(DestroyRef)

  constructor(private http: HttpClient) {}

  ngOnInit(){

    this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef$),
        filter(()=>this.isVisible),
        switchMap(val=>{
            this.saving = true;
            return this.http.post('/api/save', { val }).pipe(
                catchError((err)=>{
                    console.log(err);
                    return of([]);
                }),
                finalize(()=>{
                    this.saving = false;
                })
            )       
        })
    ).subscribe({
        next: ()=>{

        },
        error : ()=>{

        }
    }
        )

  }


  onInput(event: Event) {
    this.searchSubject.next((event.target as HTMLTextAreaElement).value);
  }

  save(content: string) {

    this.saving = true;

    this.http.post('/api/save', { content })
      .subscribe(() => {

        this.saving = false;
        this.unsaved = false;

      });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(event: BeforeUnloadEvent) {

    if (this.unsaved) {
      event.preventDefault();
      event.returnValue = '';

    }
  }

  @HostListener('document:visibilitychange')
  visibilityChanged() {

    this.isVisible = !document.hidden;

    if(this.isVisible){
        this.searchSubject.next(this.content);
    }

    if (document.hidden) {
        this.isVisible = false;
      console.log('Tab hidden');
    } else {
      console.log('Tab visible');
    }
  }
}