import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient)

  getCategoryByName(name:any):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}categories/${name}/`);
  }

  getSubCategoriesByName(name:any):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}subcategories/${name}/`);
  }

  getSubCategoryBySize( slug: any, pageSize: number = 10, pageNumber: number = 1, size: any = null, brands: any[] = [] ): Observable<any> {
    let brand_ids: any[] = [];
    brands.forEach(br => {
      brand_ids.push(br.id);
    });

    return this._HttpClient.get(`${environment.baseUrl}products/?subcategory__seo_slug=${slug}&sub_category_size_id=${size}&sort=-id&brands=${brand_ids.toString()}&page_size=${pageSize}&page=${pageNumber}&is_mobile=true`
    );
  }

}
