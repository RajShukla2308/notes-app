import { CommonModule } from '@angular/common';
import { Component, inject, input, model, OnChanges, OnInit, output, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-child',
  imports: [CommonModule, ReactiveFormsModule],
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

  formBuilder = inject(FormBuilder);


  bookingForm = new FormGroup({
    name: new FormControl('',Validators.required),
    profession: new FormControl('engineer', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl(''),
    bookingType: new FormControl('')
  })


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


  onSubmit(){
    console.log(this.bookingForm);
    
  }
}
