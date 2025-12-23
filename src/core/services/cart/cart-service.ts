import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _HttpClient = inject(HttpClient);

  // Signals
  currentCartId: WritableSignal<string> = signal(localStorage.getItem('tradelineCartId') || '');
  cartItems: WritableSignal<any[]> = signal<any[]>([]);

  constructor() {
    // عند إنشاء الخدمة → حاول تجيب الكارت لو موجود
    if (this.currentCartId()) {
      this.fetchCart(this.currentCartId());
    } else {
      this.addCart();
    }
  }

  // 🔹 Fetch cart by ID

  fetchCart(cartId: string): void {
    if (!cartId) return;

    this._HttpClient.get<any>(`${environment.baseUrl}carts/${cartId}/`).subscribe({
      next: (res) => {
        this.cartItems.set(res || []);
        this.currentCartId.set(res.id);
        localStorage.setItem('tradelineCartId', res.id);
      },
      error: (err) => console.error('Error loading cart', err),
    });
  }

  // 🔹 Add new cart
  addCart(): void {
    this._HttpClient.post<any>(`${environment.baseUrl}carts/`, {}).subscribe({
      next: (res) => {
        if (!this.currentCartId()) {
          this.currentCartId.set(res.id);
          localStorage.setItem('tradelineCartId', res.id);
          this.fetchCart(res.id);
        }
      },
      error: (err) => console.error('Error creating cart', err),
    });
  }
}
