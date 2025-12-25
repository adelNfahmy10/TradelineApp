import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit{
  private _HttpClient = inject(HttpClient);
  private _AuthService = inject(AuthService); // هنستخدمه صح

  // Signals
  cartItems = signal<any[]>([]);
  token = this._AuthService.token; // مرتبط بـ AuthService
  currentCartId = this._AuthService.currentCartId; // مرتبط بـ AuthService
  productCount:WritableSignal<number> = signal(0)

  constructor() {
    // effect يستمع لأي تغيّر في token أو currentCartId
    effect(() => {
      if (this.token()) {
        // Logged-in user
        this.fetchUserCart();
      } else {
        // Guest
        if (this.currentCartId()) {
          this.fetchGuestCart(this.currentCartId());
        } else {
          this.addCart();
        }
      }
    });
  }

  ngOnInit(): void {
    this.getCart()
  }

  // 🔹 User Cart
  private fetchUserCart(): void {
    this._HttpClient.get<any>(`${environment.baseUrl}carts/2/?Authorization=${this.token()}`).subscribe({
      next: (res) =>{
        this.handleCartResponse(res)
        localStorage.setItem('userCartId', res.id)
      },
      error: () => this.addCart(),
    });
  }

  // 🔹 Guest Cart
  private fetchGuestCart(cartId: string): void {
    if (!cartId) {
      this.addCart();
      return;
    }

    this._HttpClient.get<any>(`${environment.baseUrl}carts/${cartId}`).subscribe({
      next: (res) => this.handleCartResponse(res),
      error: () => this.addCart(),
    });
  }

  // Get Cart In Cart Page
  getCart():Observable<any> {
    let id: any;
    const token = localStorage.getItem('tradelineToken');
    token ? id = 2 : id = localStorage.getItem("tradelineCartId")
    let url = environment.baseUrl;
    return this._HttpClient.get(`${url}carts/${id}/`);
  }

  // 🔹 Create Cart
  addCart(): void {
    this._HttpClient.post<any>(`${environment.baseUrl}carts/`, {}).subscribe({
      next: (res) => {
        // حدث الـ signal في AuthService
        if(!this.currentCartId()){
          this.currentCartId.set(res.id);
          localStorage.setItem('tradelineCartId', res.id);
          this.handleCartResponse(res);
        }
      },
      error: (err) => console.error('Error creating cart', err),
    });
  }

  // 🔹 Shared Handler
  private handleCartResponse(res: any): void {
    this.cartItems.set(res?.items || []);
  }

  // Add Product To Cart
  addProductToCart(body:any) {
    return this._HttpClient.post( `${environment.baseUrl}cartproducts/?product_page=true`, body);
  }

  // Shipping Api
  getShipping():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}shipping-value/`);
  }

  // Delete Product In Cart
  deleteCartProduct(id:any):Observable<any> {
    return this._HttpClient.delete( `${environment.baseUrl}cartproducts/${id}/`);
  }
}
