import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../features/products/product.interface';

@Service()
export class ProductService {

    private httpClient = inject(HttpClient)

getAllProducts(f: { search: string; category: string; sort: string; orderby: string }): Observable<ProductResponse> {
    let url = 'https://dummyjson.com/products';
    let params = new HttpParams();

    if (f.search) {
        url = 'https://dummyjson.com/products/search';
        params = params.set('q', f.search);
    }
    if (f.category) {
        url = `https://dummyjson.com/products/category/${encodeURIComponent(f.category)}`;
    }

    if (f.sort) {
        params = params.set('sortBy', f.sort).set('order', f.orderby);
    }

    return this.httpClient.get<ProductResponse>(url, { params });
}
}
