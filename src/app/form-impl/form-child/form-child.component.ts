import { CommonModule } from '@angular/common';
import { Component, input, model, OnChanges, OnInit, output, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-child',
  imports: [CommonModule],
  templateUrl: './form-child.component.html',
  styleUrl: './form-child.component.css',
})
export class FormChildComponent implements OnInit, OnChanges{


 

  // @Input() fromParent!: string;

  // @Output() fromChild = new EventEmitter<string>();


  fromParent = input();
  fromChild = output<string>();

  formName = input();
  formAge = input();

  fromMail = model();

  currDate = new Date();


  ngOnInit(){
    console.log("logging into child",this.formName())
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes?.['formName']?.currentValue,changes['formName'].previousValue );
  }

  callChildFunction(){
    this.fromChild.emit('hello from child event');
    this.fromMail.set('raj.shukla@gmail.com');
  }
}
