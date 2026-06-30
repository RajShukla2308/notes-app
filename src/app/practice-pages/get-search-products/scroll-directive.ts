
import {Directive, output, inject, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';


@Directive({
    selector: '[appScroll]'
})


export class ScrollDirective{

    loadMore = output();
    clickOutside = output();

    elementRef = inject(ElementRef);


    @HostListener('scroll',['$event'])
    onScroll(event: Event){
        const target = event.target as HTMLElement;
        if(target.scrollTop + target.clientHeight >= target.scrollHeight - 20){
            this.loadMore.emit();
        }
    }

    @HostListener('input', ['$event']) onInput(event: Event){
        let input = this.elementRef.nativeElement as HTMLInputElement;
        input.value = input.value.replace(/\d/g,'');
    }

    @HostListener('mouseenter') onMouseEnter(){
        this.elementRef.nativeElement.style.backgroundColor = 'blue';
    }


    @HostListener('window:click',['$event']) onClick(event: Event){
        const clickInside = this.elementRef.nativeElement.contains(event.target);
        if(!clickInside) this.clickOutside.emit();
    }

}