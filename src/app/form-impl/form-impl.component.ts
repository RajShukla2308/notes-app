import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-impl',
  imports: [ReactiveFormsModule],
  templateUrl: './form-impl.component.html',
  styleUrl: './form-impl.component.css'
})
export class FormImplComponent implements OnInit{

  userForm!: FormGroup;

  formBuilder = inject(FormBuilder)


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
        name: ['',[Validators.required]],
        age: ['',[Validators.required]],
        profession: ['engineer',[Validators.required]],
        mail: ['',[Validators.required, Validators.email,this.custValidator]],
        phone:['',[Validators.maxLength(10)]]
    })


    
    

  }


 

  custValidator(control: AbstractControl){
    return {custError:'true'};
  }


  onSubmit(){
    console.log(this.userForm.value)
  }

}
