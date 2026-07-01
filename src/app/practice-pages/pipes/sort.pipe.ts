import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sort'
})

export class SortPipe implements PipeTransform{

    transform(arr: any, params: any){
        if(params == 'asc') return arr.sort((a:any,b:any)=> a.price - b.price);
        else if(params == 'desc') return arr.sort((a:any,b:any)=> b.price - a.price);
        else return arr; 
    }
}