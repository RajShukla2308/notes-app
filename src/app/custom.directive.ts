import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustom]',
  standalone: true
})
export class CustomDirective {

  constructor() { }

  elementRef = inject(ElementRef);
  renderer2 = inject(Renderer2)

  @HostListener('mouseenter')
  onHover(){
   // this.elementRef.nativeElement.style.backgroundColor = 'blue'
   this.renderer2.setStyle(this.elementRef.nativeElement,'background-color','blue')
  }

  @HostListener('mouseleave')
  onMouseLeave(){
   // this.elementRef.nativeElement.style.backgroundColor = null;
   this.renderer2.setStyle(this.elementRef.nativeElement,'background-color',null)
  }



}
