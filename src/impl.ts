
import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {switchMap, catchError, of, mergeMap, 
    from, concatMap, exhaustMap, fromEvent, debounceTime, 
    distinctUntilChanged, combineLatest, forkJoin, shareReplay, throttleTime} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {inject} from '@angular/core';
import { DestroyRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
    template: `<input type="text" [formControl]="searchInput" />`,
    imports: [CommonModule, ReactiveFormsModule]

})




export class ImplComponent implements OnInit, AfterViewInit{

    destroyRef = inject(DestroyRef);

    @ViewChild('button') buttonRef! : ElementRef;

    searchInput = new FormControl('');

    activatedRoute = inject(ActivatedRoute);

    ngOnInit(){


        // implement paramMap
        this.activatedRoute.paramMap.subscribe(params=>console.log(params.get('id')));
        // implement params
        this.activatedRoute.params.subscribe(params=>console.log(params['id']))


        // implement valueChanges
        // this.searchInput.valueChanges.pipe(
        //     debounceTime(300),
        //     distinctUntilChanged(),
        //     switchMap(val=> this.dataService.getData(val))
        // ).subscribe(data=> console.log(data));


        // implement switchMap
        // this.userService.getUsers().pipe(
        //     takeUntilDestroyed(),
        //     switchMap(val=> this.dataService.getData(val.id).pipe(
        //         catchError((error:any)=> of([]))
        //     ))
        // ).subscribe((data:any)=>console.log(data))


        // implement mergeMap
        // of(1,2,3).pipe(
        //     takeUntilDestroyed(this.destroyRef),
        //     mergeMap(val=>this.dataService.getData(val))
        // ).subscribe(data=>console.log(data))


        // implement concatMap
        // from([1,2,3]).pipe(
        //     takeUntilDestroyed(this.destroyRef),
        //     concatMap(val=> this.dataService.getData(val).pipe(
        //         catchError(error=> of([]))
        //     ))
        // )


        // implement combineLatest
        // combineLatest([
        //     this.users$,
        //     this.orders$,
        //     this.products$
        // ]).subscribe(([users,orders,products])=>console.log(users, orders, products))

        // implement forkJoin
        // forkJoin([
        //     this.users$,this.orders$,this.products$/
        // ]).subscribe(data=>console.log(data)) 


        // implement throttleTime
        fromEvent(window, 'scroll').pipe(
            throttleTime(500),
            takeUntilDestroyed(this.destroyRef))
            .subscribe(data=>console.log(data))
    }

    @HostListener('mouseenter') 
    onMouseEnter(){
        // this.buttonRef.nativeElement.style.backgroundColor = 'blue'
        // this.renderer2.setStyle(this.buttonRef.nativeElement,'backgroundColor','blue')
    }

    ngAfterViewInit(){
        // implement exhaustMap - if using viewChild = implement it inside ngAfterViewInit
        // fromEvent(this.buttonRef.nativeElement, 'click').pipe(
        //     exhaustMap(()=>this.dataservice.saveData())
        // ).subscribe(data=>console.log(data))
    }

    

}