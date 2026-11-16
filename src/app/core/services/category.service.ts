import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class CategoryService {
    private httpClient = inject(HttpClient);

getAllCategories():Observable<any> {
return this.httpClient.get<any>("https://dummyjson.com/products/categories")
}
}
