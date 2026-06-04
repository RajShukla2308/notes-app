import { Component, inject, OnInit, ViewChild, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormChildComponent } from "./form-child/form-child.component";

@Component({
  selector: 'app-form-impl',
  imports: [ReactiveFormsModule, FormChildComponent, FormsModule],
  templateUrl: './form-impl.component.html',
  styleUrl: './form-impl.component.css'
})
export class FormImplComponent implements OnInit, AfterViewInit{


  @ViewChild('formChild') formChild!: FormChildComponent;

  @ViewChild('nameInput') nameInput!: ElementRef; 


  @ViewChild ('templateIP') templateIP!: TemplateRef<any>;

  userForm!: FormGroup;

  formBuilder = inject(FormBuilder);

  toChild = 'hello from parent';

  modelMail = 'mailid@mail.com';


  user = {userName: '', password: ''};



  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
        name: ['',[Validators.required]],
        age: ['',[Validators.required]],
        profession: ['engineer',[Validators.required]],
        mail: ['',[Validators.required, Validators.email,this.custValidator]],
        phone:['',[Validators.maxLength(10)]]
    })
  }

  ngAfterViewInit(){
    // console.log(this.formChild);
    this.nameInput.nativeElement.focus();
    this.templateIP.createEmbeddedView(this.templateIP)
  }

  custValidator(control: AbstractControl){
    return {custError:'true'};
  }


  onSubmit(){
    console.log(this.userForm.value);
  }

  parentFunction($event:any){
    console.log($event);
  }


  onSignup(form: NgForm){
    console.log(this.user,form)
  }

}
