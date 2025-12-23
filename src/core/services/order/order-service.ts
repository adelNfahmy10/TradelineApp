import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly _HttpClient = inject(HttpClient)

  token:string | null = localStorage.getItem('tradelineToken')


  getOrders():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}orders/?Authorization=${this.token}`);
  }

  cancelOrder(id:any, data: any):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}orders/${id}/?Authorization=${this.token}`, data);
  }

  getOrderDetails(id:any):Observable<any> {
    // Added type for id
    return this._HttpClient.get(`${environment.baseUrl}orders/${id}/`);
  }
}
