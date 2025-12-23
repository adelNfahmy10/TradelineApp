import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient)

  token:WritableSignal<string | null> = signal(localStorage.getItem('tradelineToken'))

  // هل المستخدم مسجّل دخول؟
  isLoggedIn = computed(() => !!this.token());

  // Login Cycle Endpoints
  login(data:any):Observable<any> {
   return this._HttpClient.post(`${environment.baseUrl}users/login/`, data);
  }

  logout(): void {
    this.token.set(null);
    localStorage.clear();
  }

  setToken(token: string): void {
    this.token.set(token);
    localStorage.setItem('tradelineToken', token);
  }

  getUserInfo(token:any):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}users/me/?Authorization=${token}`);
  }

  getPointsToken():Observable<any>{
    const body = "grant_type=password&Username=Tradeline&Password=Tr%40deLin3";

    const headerPoint = {
      headers: new HttpHeaders({
        "Content-Type": "Application/x-www-form-urlencoded",
        "X-Skip-Auth": "true"
      })
    };

    return this._HttpClient.post('https://api.tradelinestores.net/token', body, headerPoint);
  }

  getPoints(token:any, phone:any):Observable<any> {
    let header = {
      headers: new HttpHeaders({
        "Content-Type": "Application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
        'X-Skip-Auth': 'true'
      })
    };

    return this._HttpClient.get(`https://api.tradelinestores.net/api/Account/GetPoints/${phone}`, header)
  }

  // Resgister Cycle Endpoints
  register(data:any):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}users/me/`, data)
  }

}


