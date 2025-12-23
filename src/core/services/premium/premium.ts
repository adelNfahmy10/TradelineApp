import { HttpClient } from '@angular/common/http';
import { inject, Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PremiumService {
  private readonly _HttpClient = inject(HttpClient)

  stores = signal<any[]>([]);

  constructor() {}

  // حساب المسافة
  private getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // ***********************
  // أهم جزء: getStoresWithDistance
  // ***********************

  getStoresWithDistance(userLat: number, userLng: number) {
    this._HttpClient.get<any[]>(`${environment.baseUrl}stores/`).subscribe({
      next: (res: any[]) => {
        // 1. فلترة المتاجر المطلوبة فقط
        // const filtered = res.filter(s => [6, 10, 26].includes(s.id));
        // console.log(res);

        // 2. حساب المسافات
        const updated = res.map(store => {
          if (store.coordinates) {
            const [lat, lng] = store.coordinates.split(",").map(Number);
            store.distance = this.getDistance(userLat, userLng, lat, lng);
          }
          return store;
        });

        // 3. ترتيب حسب الأقرب
        updated.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

        // 4. إرسال النتيجة للـ Signal
        this.stores.set(updated);
      },
    });
  }
}
