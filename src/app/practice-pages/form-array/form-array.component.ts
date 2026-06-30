import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  imports: [ReactiveFormsModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.css'
})
export class FormArrayComponent implements OnInit{

  

  fb = inject(FormBuilder);
  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['',Validators.required],
      skills: this.fb.array([this.fb.control('',Validators.required)])
    })
  }


  get skills(){
    return this.userForm.get('skills') as FormArray;
  }

  addSkill(){
    this.skills.push(
      this.fb.control('',Validators.required)
    )
  }

  removeSkill(index: number){
    this.skills.removeAt(index);
  }


  onSubmit(){
    console.log(this.userForm.value)
  }

  

  

}
