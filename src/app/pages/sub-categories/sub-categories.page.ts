import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonRouterLink } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from 'src/core/services/categories/categories-service';
import { filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.page.html',
  styleUrls: ['./sub-categories.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class SubCategoriesPage implements OnInit{
  private _CategoriesService = inject(CategoriesService);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _Router = inject(Router);

  subCategory:any;
  SubSizeId:any
  subCategoryProducts:any[] = [];
  selectedSizeId: any = null;

  ngOnInit(): void {
    this.getSubCategory()
  }

  getSubCategory(): void {
    this._ActivatedRoute.paramMap.pipe(
      map(params => params.get('name')),
      filter(name => !!name),
      switchMap((name: any) => this._CategoriesService.getSubCategoriesByName(name)),
      switchMap((res: any) => {
        this.subCategory = res;
        this.SubSizeId = this.subCategory?.sub_category_size?.[0]?.id;
        this.selectedSizeId = this.SubSizeId;

        return this._CategoriesService.getSubCategoryBySize(this.subCategory.seo_slug, 10, 1, this.SubSizeId);
      })
    ).subscribe({
      next: (res: any) => {
        this.subCategoryProducts = res.results;

        if ((!this.subCategory?.sub_category_size?.length) && this.subCategoryProducts.length === 1) {
          const product = this.subCategoryProducts[0];
          this._Router.navigate([`/product/${product.seo_slug}`]);
        }
      }
    });
  }

  getSubCatBySize(sizeId: any): void {
    this.SubSizeId = sizeId
    this.selectedSizeId = sizeId;
    this.subCategoryProducts = []
    this._CategoriesService .getSubCategoryBySize( this.subCategory.seo_slug,10,1,this.SubSizeId) .subscribe({
      next: (res: any) => {
        this.subCategoryProducts = res.results;
      }
    });
  }
}
