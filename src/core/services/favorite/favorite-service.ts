import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly _HttpClient = inject(HttpClient)

  token:string | null = localStorage.getItem('tradelineToken')

  getFavorites():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}users/me/favorites/?Authorization=${this.token}`)
  }

  addFavorites(id:any, data:any):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}users/me/favorites/?Authorization=${this.token}`, data)
  }
  // data: { product_id: id },

  deleteFavorites(id:any):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}users/me/favorites/${id}/?Authorization=${this.token}`)
  }


}
