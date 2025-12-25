import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonAccordionGroup, IonAccordion, IonItem } from '@ionic/angular/standalone';
import { ProductService } from 'src/core/services/product/product-service';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { CartService } from 'src/core/services/cart/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonAccordionGroup, IonAccordion, IonItem],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductPage implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  productDetails: any;
  productVariants: any[] = [];

  capacities: any[] = [];
  availableColors: any[] = [];
  selectedColor: any = null;

  selectedCapacity: any = null;
  selectedVariant: any = null;

  displayedPrice: number = 0;
  selectedScreenSize: any = null;
  sliderImages: string[] = [];

  out_of_stock: boolean = false;

  ngOnInit(): void {
    this.getProductDetails();
  }

  /* ================================================
    1) Fetch product
  ================================================ */
  getProductDetails(): void {
    this._ActivatedRoute.paramMap
      .pipe(
        map(params => params.get('name')),
        filter((name): name is string => !!name),
        switchMap(name => this._ProductService.getProductByName(name)),
        tap(res => {
          this.productDetails = res;
          this.productVariants = res.productproperties;
          console.log(this.productDetails);

          // اختار أول variant
          this.selectVariant(this.productVariants[0]);

          // حضر الـ capacities
          this.prepareCapacities();

          // حضّر الألوان الخاصة بالـ capacity الحالية
          this.filterColorsByCapacity();
        })
      )
      .subscribe();
  }

  /* ================================================
    2) Select Variant
  ================================================ */
  selectVariant(variant: any) {
    this.selectedVariant = variant;

    this.selectedCapacity = variant.capacity;
    this.selectedColor = variant.color;

    // الصور
    this.sliderImages = [
      variant.color.picture,
      variant.color.picture2,
      variant.color.picture3,
      variant.color.picture4,
      variant.color.picture5
    ].filter(img => !!img);

    // السعر
    this.displayedPrice = variant.price;

    // المقاس
    this.selectedScreenSize = variant.screen_size?.name;

    // المخزون
    this.out_of_stock = !variant.in_stock;

    // ألوان متاحة حسب السعة
    this.filterColorsByCapacity();
  }

  /* ================================================
    3) Prepare Capacities
  ================================================ */
  prepareCapacities() {
    const map = new Map();

    this.productVariants.forEach(variant => {
      if (!map.has(variant?.capacity?.id)) {
        map.set(variant?.capacity?.id, {
          ...variant.capacity,
          out_of_stock: !this.productVariants.some(
            v => v.capacity?.id === variant?.capacity?.id && v.in_stock
          )
        });
      }
    });

    this.capacities = Array.from(map.values());
  }

  /* ================================================
    4) Filter colors by selected capacity
  ================================================ */
  filterColorsByCapacity() {
    this.availableColors = this.productVariants
      .filter(v => v.capacity?.id === this.selectedCapacity?.id)
      .sort((a, b) => (a.in_stock === b.in_stock ? 0 : a.in_stock ? -1 : 1));
  }

  /* ================================================
    5) On Capacity Change
  ================================================ */
  selectCapacity(cap: any) {
    this.selectedCapacity = cap;

    this.filterColorsByCapacity();

    const firstVariant  = this.availableColors[0];

    if (firstVariant) {
      this.selectVariant(firstVariant);
      this.out_of_stock = !firstVariant.in_stock;
    } else {
      this.out_of_stock = true;
    }
  }

  /* ================================================
    6) On Color Change
  ================================================ */
  selectColor(colorVariant: any) {
    this.selectVariant(colorVariant);
  }

  /* ================================================
    6) Pay Type Method
  ================================================ */
  selectedPaymentType:string = 'full';

  switchPayType(type:any): void {
    this.selectedPaymentType = type
  }


  addToCart(): void {
    if (!this.selectedVariant || this.out_of_stock) return;
    const body: any = {
      product: this.productDetails.id,
      product_property: this.selectedVariant.id,
      quantity: 1,
      insurance: null,
      branded_page_product: null
    };

    body.cart = localStorage.getItem('userCartId') ? 2   : this._CartService.currentCartId();

    if(localStorage.getItem(`userCartId`)){
      this._CartService.addProductToCart(body).subscribe({
        next: () => {
          this._ToastrService.success('Product added to cart')
        },
        error: (err) => {
          this._ToastrService.error(err.error?.detail)
        }
      });
    } else {
      body.cart = this._CartService.currentCartId();

      this._CartService.addProductToCart(body).subscribe({
        next:(res)=>{
          this._ToastrService.success('Product added to cart')
        },
        error: (err) => {
          this._ToastrService.error(err.error?.detail)
        }
      })
    }
  }

}
