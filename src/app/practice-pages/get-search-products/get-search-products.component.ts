import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal, inject, DestroyRef, HostListener, computed } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { tap, finalize, debounceTime, catchError , of, filter, retry} from 'rxjs';
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

  // SEARCH AND FILTER USING SIGNALS ONLY
  // search = toSignal(this.searchTerm.valueChanges, {initialValue: ''})
  // filterVal =  toSignal(this.selectedFilter.valueChanges, {initialValue: 'all'});
  // filteredProducts = computed(()=>{
  //    return this.productData().filter((item:any)=>{
  //       let matchSearch = !this.search() || item.name.toLowerCase().includes(this.search()?.toLowerCase());
  //       let matchFilter = this.filterVal() == 'all' || item.category === this.filterVal();

  //       return matchSearch && matchFilter;
  //    })
  // }
  // )

  ngOnInit(){
    this.isLoading = true;
    this.http.get<Product[]>(this.url).pipe(
      retry(2),
      takeUntilDestroyed(this.destroyRef$),
      finalize(()=>{
        this.isLoading = false
      }),
      // handle error
      catchError((error)=>{
        console.log(error, 'something went wrong')
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



  addProduct(){
    const product = 
      {
      id: crypto.randomUUID(), 
      name: "Mechanical Keyboard2",
      description: "RGB2 backlit2 mechanical keyboard with blue switches.",
      price: 3499,
      category:"Electronics"
    }

    this.productData.update(prevProds=> [...prevProds, product]);
    
  }

}
