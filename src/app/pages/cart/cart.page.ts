import { Component, effect, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItemOption, IonList, IonItemSliding, IonItemOptions, IonIcon, IonItem, IonLabel,  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { CartService } from 'src/core/services/cart/cart-service';
import { AuthService } from 'src/core/services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCard, IonLabel, IonItem, IonIcon, IonItemOptions, IonItemSliding, IonList, IonItemOption, IonContent, CommonModule, FormsModule, IonCardHeader, IonCardTitle, RouterLink]
})
export class CartPage implements OnInit{
  private _CartService = inject(CartService);
  private _AuthService = inject(AuthService);
  private _ToastrService = inject(ToastrService);
  private _Router = inject(Router);

  cartItems:WritableSignal<any[]> = signal([])
  token = this._AuthService.token;
  currentCartId = this._AuthService.currentCartId;
  count:WritableSignal<number> = signal(0)
  totalAmount:WritableSignal<number> = signal(0)
  subTotal:WritableSignal<number> = signal(0)
  tax:WritableSignal<number> = signal(0)
  shippingValue:WritableSignal<number> = signal(0)

  allProductsCart!:Subscription

  ngOnInit(): void {
    this.fetchCartData()
  }

  constructor() {
    effect(() => {
      const token = this.token();
      const cartId = this.currentCartId();
      if (token || cartId) {
        this.fetchCartData();
      }
    });
  }

  fetchCartData(): void {
    const id = this.token() ? 2 : this.currentCartId();
    if (!id) return;

    this.allProductsCart = this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartItems.set([]);
        this.cartItems.set(res?.cartproduct || []);
        this.count.set(res?.total_quantity || 0);
        this.subTotal.set(res?.total / 1.14)
        this.totalAmount.set(res?.total + this.shippingValue())
        this.tax.set(this.totalAmount() - this.subTotal())
        this._CartService.productCount.set(this.count())
        this.getShipping()
      },
      error: () => {
        this.cartItems.set([]);
        this.count.set(0);
        this.shippingValue.set(0);
      }
    });
  }

  getShipping():void{
    this._CartService.getShipping().subscribe({
      next:(res)=>{
        if(this.cartItems().length > 0){
          this.shippingValue.set(res[0].shipping || 0)
          this.totalAmount.set(this.totalAmount() + this.shippingValue())
        } else {
          this.shippingValue.set(0)
          this.tax.set(0)
          this.totalAmount.set(0)
        }
      }
    })
  }

  deleteProductInCart(id:any):void{
    this._CartService.deleteCartProduct(id).subscribe({
      next:(res)=>{
        this.fetchCartData()
        this._ToastrService.success('Product deleted successfully')
      },
      error:(err) => {
        this._ToastrService.error('Failed to delete the product')
      }
    })
  }

  checkoutCart():void{
    if(this.cartItems().length !== 0){
      this._Router.navigate(['/checkout'])
    }
  }

  /*##################################### Unsubscrib ##################################### */
  ngOnDestroy(): void {
    this.allProductsCart?.unsubscribe()
  }
}
