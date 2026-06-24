import { Component, input, AfterContentInit, AfterContentChecked, 
  AfterViewInit, AfterViewChecked, SimpleChanges, OnChanges, 
  ContentChild,
  ElementRef,
  ViewChild} from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements AfterContentInit, OnChanges, AfterContentChecked, AfterViewInit, AfterViewChecked{

  user : any = input();
  inputVal = input();

  @ContentChild('projectedContent') projectedContent!: ElementRef<any>; 

  @ViewChild('nameInput') input!: ElementRef;




  // after all the content including child content has been initilized.
  ngAfterContentInit(){
    // console.log('after content init', this.projectedContent.nativeElement.textContent)
  }


  // called when input property changes - array or string anything.
  ngAfterContentChecked(){
    // console.log('after content changed', 'name changed',this.user())
  }

  // it runs when any input bound property changes - need to change reference of array
  ngOnChanges(changes: SimpleChanges){
    // console.log('child on changes called',changes);
  }


  ngAfterViewInit(){
    this.input.nativeElement.focus();
  }


  ngAfterViewChecked(){
 
  }




}
