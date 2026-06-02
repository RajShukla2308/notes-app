
import {Directive, ElementRef, HostListener, inject, Renderer2} from '@angular/core';

@Directive({
    selector: '[appColorChange]'
})

export class ColorChangeDirective {

    elementRef = inject(ElementRef);
    renderer2 = inject(Renderer2)

    // @HostListener('mouseenter') onMouseEnter(){
    //     this.elementRef.nativeElement.style.backgroundColor= 'blue';
    // }

    // @HostListener('mouseleave') onMouseLeave(){
    //     this.elementRef.nativeElement.style.backgroundColor = 'white';
    // }

    @HostListener('mouseenter') onMouseEnter(){
        this.renderer2.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'blue')
    }


    @HostListener ('mouseleave') onMouseLeave(){
        this.renderer2.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'white')
    }


}