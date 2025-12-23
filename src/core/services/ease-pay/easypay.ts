import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EasypayService {
  private readonly _HttpClient = inject(HttpClient);

  tradeInArr: WritableSignal<any[]> = signal<any[]>([]);
  offerArr: WritableSignal<any[]> = signal<any[]>([]);
  oldDevicesArr: WritableSignal<any[]> = signal<any[]>([]);
  newDevicesArr: WritableSignal<any[]> = signal<any[]>([]);
  typesArr: WritableSignal<any[]> = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.loadTradeIn();
      this.loadOffers();
      this.loadTypes()
    });
  }

  private loadTradeIn() {
    this._HttpClient.get<any>(`${environment.baseUrl}easypay_tradein_calculator/`).subscribe({
      next: (res) => {
        this.tradeInArr.set(res);
      }
    });
  }

  private loadOffers() {
    this._HttpClient.get<any>(`${environment.baseUrl}easypay_offers/`).subscribe({
      next: (res) => {
        this.offerArr.set(res);
      }
    });
  }

  loadOldDevice(dev?:any) {
    this._HttpClient.get<any>(`${environment.baseUrl}trade_in_device_old/?device_type_key=${dev}`).subscribe({
      next: (res) => {
        this.oldDevicesArr.set(res);
      }
    });
  }

  loadNewDevice(dev?:any) {
    this._HttpClient.get<any>(`${environment.baseUrl}trade_in_device_new/?device_type_key=${dev}`).subscribe({
      next: (res) => {
        this.newDevicesArr.set(res);
      }
    });
  }

  loadTypes() {
    this._HttpClient.get<any>(`${environment.baseUrl}trade_in_device_type/`).subscribe({
      next: (res) => {
        this.typesArr.set(res);
      }
    });
  }
}
