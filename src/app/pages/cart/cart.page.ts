import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItemOption, IonList, IonItemSliding, IonItemOptions, IonIcon, IonItem, IonLabel, IonThumbnail, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonCol, IonRow } from '@ionic/angular/standalone';
import { CartService } from 'src/core/services/cart/cart-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCard, IonLabel, IonItem, IonIcon, IonItemOptions, IonItemSliding, IonList, IonItemOption, IonContent, CommonModule, FormsModule, IonCardHeader, IonCardTitle]
})
export class CartPage {
  private _cartService = inject(CartService);

  cartItems: Signal<any[]> = computed(() => this._cartService.cartItems());
  currentCartId: Signal<string> = computed(() => this._cartService.currentCartId());

  constructor() {
    if (!this._cartService.currentCartId()) {
      this._cartService.addCart();
    }
  }
}
