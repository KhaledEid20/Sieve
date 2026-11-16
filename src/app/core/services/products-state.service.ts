import { computed, inject, Service, signal } from '@angular/core';
import { GeneralState, Product, ProductResponse } from '../../features/products/product.interface';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap, tap } from 'rxjs';
import { ProductService } from './product.service';



@Service()
export class ProductsStateService {

    private productService = inject(ProductService)

    search = signal("");
    category = signal("");
    sort = signal("");
    orderby = signal("")

    _products = signal<Product[]>([]);
    _loading = signal(false);
    _error = signal<string | null>(null);

    State = computed<GeneralState>(()=> ({
        products : this._products(),
        error : this._error(),
        loading : this._loading(),
    }))

    CategoryFilter = computed(()=>({
        search : this.search(),
        category : this.category(),
        sort: this.sort(),
        orderby: this.orderby()
    }))
    

    constructor() {
        toObservable(this.CategoryFilter).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(()=>{
                this._loading.set(true);
                this._error.set(null);
            }),
            switchMap((f)=>{
                const request$ = this.productService.getAllProducts(f);
                
                return request$.pipe(
                    catchError(() => {
                        this._error.set("Cannot get this Category Data");
                        return of([] as Product[]);
                    }),
                    finalize(() => this._loading.set(false))
                );
            }),
            takeUntilDestroyed(),
        )
        .subscribe((res) => {
            const products = Array.isArray(res) ? res : res.products;
            this._products.set(products);
        });
    }

    setCategory(category:string){
        this.category.set(category);
    }
    setSortBy(sortBy:string){
        this.sort.set(sortBy);
    }
    setOrderBy(orderby:string){
        this.orderby.set(orderby);
    }
    setSearch(query:string){
        this.search.set(query);
    }

}

