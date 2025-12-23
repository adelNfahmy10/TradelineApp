import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountInfoService {
  private readonly _HttpClient = inject(HttpClient)
  userToken:string | null = localStorage.getItem("tradelineToken")

  getOtp():Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}users/send-otp-code/?Authorization=${this.userToken}`, {});
  }

  update(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    address2: string,
    city: string,
    otp: string
  ): Observable<any> {
    const body: any = { firstname, lastname, email, phone, address, address2, city, otp };
    if (password) body.password = password;

    return this._HttpClient.put(
      `${environment.baseUrl}users/update/`,
      body
    );
  }

}
