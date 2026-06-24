import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, SimpleChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChildComponent } from '../child/child.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent',
  imports: [CommonModule, ChildComponent, FormsModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent  {

  user = {
    id: 1,
    name: 'John',
    role: 'Developer'
  };

  inputVal = '';

 

  changeName(){
    this.user = {...this.user, name: 'Alia'}

  }

  changeRole(){
    this.user.role = 'Tester';
  }


}
