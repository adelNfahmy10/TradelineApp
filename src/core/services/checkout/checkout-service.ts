import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly _HttpClient = inject(HttpClient)

  hiddingPayment():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}hidden-payment-methods/`);
  }

  getStores():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}stores/`);
  }

  addOrder(data:any):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}orders/`, data)
  }

}
