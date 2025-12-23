import { Component, computed, CUSTOM_ELEMENTS_SCHEMA,  effect,  inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonIcon, IonRouterLink, IonModal, IonSearchbar, IonList, IonItem, IonLabel, IonMenu } from '@ionic/angular/standalone';
import { BannerService } from 'src/core/services/explore/banner';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from 'src/core/services/product/product-service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonRouterLink, RouterLink, IonModal, IonSearchbar, IonList, IonItem, IonLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExplorePage{
  private readonly _BannerService = inject(BannerService)
  private readonly _ProductService = inject(ProductService)

  offerBanners: Signal<any[]> = computed(() => this._BannerService.offerBanners());
  categoriesBanners: Signal<any[]> = computed(() => this._BannerService.catBanners());
  searchResults: any[] = [];
  searchWord:string = ''
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


}
