import {Directive, ElementRef, EventEmitter, HostListener, inject, output} from '@angular/core';

@Directive({
    // selector: '[appSpecialChars]'
    // selector: '[appClickOutside]'
    selector: '[appInfiniteScroll]'
})


export class SpecialCharsDirective{

    // START - remove special characters
    // elementRef = inject(ElementRef);

    // @HostListener('input',['$event']) sanitizeInput(event: Event){
    //     let input = this.elementRef.nativeElement as HTMLInputElement;
    //     input.value = input.value.replace('[/@#$%^/g]','')
    // }
    // END - remove special characters


    // START - click outside close the panel  
    // elementRef = inject(ElementRef);
    // outerEvent = output();

    // @HostListener('document:click',['$event']) onClickEvent(event: MouseEvent){

    //     const clickedInside = this.elementRef.nativeElement.contains(event.target);
    //     if(!clickedInside){
    //         this.outerEvent.emit()
    //     }

    // }
    // END - click outside close the panel  



    // START - infinite scroll directive
    // if clientHeight + scrollTop  >= scrollHeight , it means user has reached the bottom.

    elementRef = inject(ElementRef);
    callApi = output();
    @HostListener('scroll') onScroll(){
        let element = this.elementRef.nativeElement;

        // threshold is used to call api before user reaches extreme bottom - bad UX.
        const threshold = 100;

        const position = element.clientHeight + element.scrollTop;

        const scrollHeight = element.scrollHeight;

        if(position >= scrollHeight - threshold){
            this.callApi.emit();
        }   
    }
    // END - infinite scroll directive







}


