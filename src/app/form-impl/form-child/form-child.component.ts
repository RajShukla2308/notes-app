import { Component, EventEmitter, input, model, OnChanges, OnInit, output, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-child',
  imports: [],
  templateUrl: './form-child.component.html',
  styleUrl: './form-child.component.css'
})
export class FormChildComponent implements OnInit, OnChanges{


 

  // @Input() fromParent!: string;

  // @Output() fromChild = new EventEmitter<string>();


  fromParent = input();
  fromChild = output<string>();

  formName = input();
  formAge = input();

  fromMail = model();



  ngOnInit(){
    console.log("logging into child",this.formName())
  }

  ngOnChanges(changes: SimpleChanges){
     const {
    formName: {
      previousValue,
      currentValue,
      firstChange
    }
  } = changes;
  }

  callChildFunction(){
    this.fromChild.emit('hello from child event');
    this.fromMail.set('raj.shukla@gmail.com');
  }
}
