import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../features/products/product.interface';

@Service()
export class ProductService {

    private httpClient = inject(HttpClient)

    getAllProducts(f : {category : string ; sort : string ; orderby:string}):Observable<ProductResponse>{
        console.log(f);
        const url = f.category?
            `https://dummyjson.com/products/category/${f.category}` :
            'https://dummyjson.com/products';

        let params = new HttpParams();
        if(f.sort){
            params = params.set("sortBy" , f.sort).set("order" , f.orderby);
        }
        return this.httpClient.get<ProductResponse>(url , {params});
    }
}
