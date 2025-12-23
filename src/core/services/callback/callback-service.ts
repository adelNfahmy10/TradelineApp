import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CallbackService {
  private readonly _HttpClient = inject(HttpClient);

  sendCallback(data: any) {
    return this._HttpClient.post(`${environment.baseUrl}call-back/`, data);
  }
}
