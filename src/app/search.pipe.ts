
import { Pipe, PipeTransform } from "@angular/core";
// implemented seach pipe and converted to Titlecase pipe
@Pipe({
    name: 'titlecase',
    pure: true
})

export class SearchPipe implements PipeTransform{
    transform(items:any[], value: string) {
        if(!value) return items;

        return items.filter(item=> item.title.toLowerCase().includes(value));

    // return value.charAt(0).toUpperCase() + value.slice(1);
    }
}


