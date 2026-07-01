import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from '../pipes/sort.pipe';

@Component({
  selector: 'app-form-array',
  imports: [ReactiveFormsModule, SortPipe],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.css'
})
export class FormArrayComponent implements OnInit{

   prods = [{
      "id": 1,
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with adjustable DPI and silent clicks.",
      "price": 799,
      "category":"Electronics"
    },
    {
      "id": 4,
      "name": "Noise Cancelling Headphones",
      "description": "Over-ear wireless headphones with active noise cancellation.",
      "price": 6999,
      "category":"Music"
    },
    {
      "id": 5,
      "name": "Portable SSD",
      "description": "1TB high-speed portable SSD with USB 3.2 support.",
      "price": 8499,
      "category":"Steel"
    },
    ]
  

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
