import { inject, Injectable, WritableSignal, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BannerService {
  private readonly _HttpClient = inject(HttpClient);

  offerBanners: WritableSignal<any[]> = signal<any[]>([]);
  catBanners: WritableSignal<any[]> = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.loadHomeBanners();
      this.loadCatBanners();
    });
  }

  private loadHomeBanners() {
    this._HttpClient.get<any>(`${environment.baseUrl}home?is_mobile=True`).subscribe({
      next: (res) => {
        this.offerBanners.set(res.slider);
      }
    });
  }

  private loadCatBanners() {
    return this._HttpClient.get<any>(`${environment.baseUrl}/categories`).subscribe({
      next: (res) => {
        this.catBanners.set(res);
      }
    })
  }
}
