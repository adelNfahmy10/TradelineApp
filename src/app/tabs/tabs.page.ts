import { Component, computed, EnvironmentInjector, inject, OnInit, Signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent, IonHeader, IonToolbar, IonMenuButton, IonList, IonMenu, IonItem, MenuController, IonMenuToggle, IonModal, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { AuthService } from 'src/core/services/auth/auth-service';
import { CartService } from 'src/core/services/cart/cart-service';
import { ProductService } from 'src/core/services/product/product-service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonSearchbar, IonModal, IonItem, IonList, IonToolbar, IonHeader, IonContent, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterLink, IonMenuButton, IonMenu, IonMenuToggle],
})
export class TabsPage implements OnInit{
  public environmentInjector = inject(EnvironmentInjector);
  private readonly _ProductService = inject(ProductService)
  public _AuthService = inject(AuthService);
  public _CartService = inject(CartService);
  public _Router = inject(Router);
  private menuCtrl = inject(MenuController);
  private _ToastrService = inject(ToastrService);

  userName:string | null = localStorage.getItem('userName')
  points:string | null = localStorage.getItem('points')
  token: Signal<string | null> = computed(() => this._AuthService.token());
  title:string = ''
  isLoggedIn: Signal<boolean> = this._AuthService.isLoggedIn;
  productCount = this._CartService.productCount || 0;
  searchResults: any[] = [];
  searchWord:string = ''
  @ViewChild('modal') modal!: IonModal;

  constructor() {
    addIcons({ triangle, ellipse, square });
  }

  ngOnInit(): void {
    this.listenToRouteChange();
  }

  logout(): void {
    this._AuthService.logout();
  }

  deleteAccount():void{
    this._AuthService.deleteAccount().subscribe({
      next:(res)=>{
         this._ToastrService.success(
          `Delete Account successfully`,
          '',
          {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true,
            positionClass: 'toast-top-right',
            tapToDismiss: true
          }
        );
        this.logout()
      }
    })
  }

  private listenToRouteChange(): void {
    this._Router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.title = this.getTitleFromUrl(event.urlAfterRedirects);
      });
  }

  private getTitleFromUrl(url: string): string {
    if (url.includes('explore')) return 'Explore';
    if (url.includes('shop')) return 'Shop';
    if (url.includes('notification')) return 'Notifications';
    if (url.includes('cart')) return 'Cart';
    if (url.includes('support')) return 'Support';
    return 'TradeLine';
  }

  closeMenu(): void {
    this.menuCtrl.close();
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

  selectProductSearch(product:any):void{
    this._Router.navigate([`/product/${product.seo_slug}`]);
    this.modal.dismiss();
    this.clearSearch()
  }

  submitSearchCompolate(event:any):void{
    if (event.key === 'Enter' && this.searchWord.trim().length > 0) {
      this._Router.navigate([`/search-items/${this.searchWord}`])
      this.modal.dismiss();
      this.clearSearch()
    }
  }

  clearSearch(): void {
    this.searchResults = [];
    this.searchWord = '';
  }

}
