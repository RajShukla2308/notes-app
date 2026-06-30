import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal, inject, DestroyRef, HostListener } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { tap, finalize, debounceTime, catchError , of} from 'rxjs';
import { ScrollDirective } from "./scroll-directive";


interface Product{
 id: string, 
 name: string, 
 description: string,
 price: number
}

@Component({
  selector: 'app-get-search-products',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './get-search-products.component.html',
  styleUrl: './get-search-products.component.css'
})

export class GetSearchProductsComponent implements OnInit{

  url = 'http://localhost:8000/products';

  http = inject(HttpClient);
  destroyRef$ = inject(DestroyRef);
  isLoading = false;

  //  type of all produts
  allProducts: Product[] = [];
  productData = signal<Product[]>([]);

  searchTerm = new FormControl('');
  selectedFilter = new FormControl('');

  ngOnInit(){
    this.isLoading = true;
    this.http.get(this.url).pipe(
      takeUntilDestroyed(this.destroyRef$),
      finalize(()=>{
        this.isLoading = false
      }),
      // handle error
      catchError((error)=>{
        console.log(error)
        return of([])
      })
    ).subscribe((data:any)=>{
      this.allProducts = data;
      this.productData.set(data);
    })

     this.searchTerm.valueChanges.pipe(
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef$)
      ).subscribe(value=> {
          if(value == '') this.productData.set(this.allProducts);
          else{
            this.productData.set(this.allProducts.filter((item:any)=>item.name.toLowerCase().includes(value?.toLowerCase())))
          }
      })

  }

  handleFilter(){
    this.productData.set(this.productData().sort((a,b)=> {
     if(this.selectedFilter.value == 'priceAsc') return  a.price - b.price;
     else return b.price - a.price;
    }));

  }


  // @HostListener('scroll',['$event'])
  // onScroll(event: Event){

  //   const atBottom = event?.scrollTop + event.clientHeight >= event.scrollHeight - 20;
  //   if(atBottom){
  //     this.loadMore.emit();
  //   }
    
  // }

}
