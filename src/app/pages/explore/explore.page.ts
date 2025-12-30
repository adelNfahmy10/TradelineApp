import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonRouterLink, IonModal, IonSearchbar, IonList, IonItem, IonLabel} from '@ionic/angular/standalone';
import { BannerService } from 'src/core/services/explore/banner';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from 'src/core/services/product/product-service';
import { AuthService } from 'src/core/services/auth/auth-service';
import { CartService } from 'src/core/services/cart/cart-service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonRouterLink, RouterLink, IonModal],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExplorePage implements OnInit{
  private readonly _BannerService = inject(BannerService)
  private readonly _ProductService = inject(ProductService)
  private readonly _CartService = inject(CartService)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  offerBanners: Signal<any[]> = computed(() => this._BannerService.offerBanners());
  categoriesBanners: Signal<any[]> = computed(() => this._BannerService.catBanners());
  points:string | null = localStorage.getItem('points')
  userName:string | null = this._AuthService.userName()
  searchResults: any[] = [];
  searchWord:string = ''

  ngOnInit(): void {
    this._CartService.getCartCount()
  }

  search(event: any) {
    this.searchWord = event.target?.value.toLowerCase() || '';
    if (this.searchWord.length < 2) {
      this.searchResults = [];
      return;
    }
    this._ProductService.autoSearch(this.searchWord).subscribe({
      next: (res: any[]) => {
        const uniqueMap = new Map();
        res.forEach(product => {
          if (product?.id) uniqueMap.set(product.id, product);
        });
        this.searchResults = Array.from(uniqueMap.values());
      },
      error: () => this.searchResults = []
    });
  }

  clearSearch(): void {
    this.searchResults = [];
    this.searchWord = '';
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  goToHistory():void{
    this.setOpen(false);
    setTimeout(() => {
      this._Router.navigate(['/tvc-history'])
    });
  }

  goToDetails() {
    this.setOpen(false);

    setTimeout(() => {
      this._Router.navigate(['/tvc-details']);
    });
  }
}
