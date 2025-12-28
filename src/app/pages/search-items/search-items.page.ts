import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { ProductService } from 'src/core/services/product/product-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.page.html',
  styleUrls: ['./search-items.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonSpinner, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class SearchItemsPage implements OnInit {
  private readonly _ProductService = inject(ProductService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  searchResults: any[] = [];

  currentPage = 1;
  pageSize = 15;
  totalPages = 0;
  loading = false;
  word = '';

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.word = params.get('word') ?? '';
      this.resetAndLoad();
    });
  }

  resetAndLoad() {
    this.currentPage = 1;
    this.searchResults = [];
    this.loadProducts();
  }

  loadProducts(event?: any) {
    if (this.loading) return;

    this.loading = true;

    this._ProductService
      .searchProductByWord(this.word, this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          const results = res?.results ?? [];

          this.searchResults.push(...results);

          this.totalPages = Math.ceil(res.count / this.pageSize);
          this.currentPage++;

          if (event) event.target.complete();

          // لو خلصت كل الصفحات
          if (this.currentPage > this.totalPages && event) {
            event.target.disabled = true;
          }

          this.loading = false;
        },
        error: () => {
          if (event) event.target.complete();
          this.loading = false;
        }
      });
  }



}
