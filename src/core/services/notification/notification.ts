import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationSerives {
  private readonly _HttpClient = inject(HttpClient);

  notifications: WritableSignal<any[]> = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.loadNotfifcation();
    });
  }

  private loadNotfifcation() {
    this._HttpClient.get<any>(`${environment.baseUrl}notifications/`).subscribe({
      next: (res) => {
        this.notifications.set(res);
      }
    });
  }
}
