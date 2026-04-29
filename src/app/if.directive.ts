import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIf]',
  standalone: true
})
export class IfDirective {

  constructor() { }

  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef)



  @Input() set appIf(condition: boolean){
    if(condition){
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
    else{
      this.viewContainer.clear();
    }
  }

}
