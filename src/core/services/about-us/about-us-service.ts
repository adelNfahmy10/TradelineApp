import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private readonly _HttpClient = inject(HttpClient)

  getAboutUsInfo():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}about-us/`)
  }
}
