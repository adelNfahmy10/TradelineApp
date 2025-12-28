import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle } from '@ionic/angular/standalone';
import { BannerService } from 'src/core/services/explore/banner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  standalone: true,
  imports: [ IonCard, IonCardTitle, IonCardHeader, IonContent, CommonModule, FormsModule, RouterLink]
})
export class ShopPage {
  private readonly _BannerService = inject(BannerService)

  categories: Signal<any[]> = computed(() => this._BannerService.catBanners());

  constructor() {

  }
}
