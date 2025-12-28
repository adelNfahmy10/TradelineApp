import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _HttpClient = inject(HttpClient)

  getProductByName(name:any):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}products/${name}/?is_mobile_app=true`);
  }

  getFilteredProducts(pname:any):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}products/?search=${pname}&sort=-id&page=1&page_size=10`);
  }

  autoSearch(word:any):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}product-startswith/?search=${word}`);
  }

  searchProductByWord(word:any, pageNumber:any, pageSize:any):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}products/?search=${word}&sort=-id&page_size=${pageSize}&page=${pageNumber}`);
  }

}
