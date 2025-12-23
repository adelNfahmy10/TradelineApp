import { Component, computed, EnvironmentInjector, inject, OnInit, Signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent, IonHeader, IonToolbar, IonMenuButton, IonList, IonMenu, IonItem, MenuController, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { filter } from 'rxjs';
import { AuthService } from 'src/core/services/auth/auth-service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonItem, IonList, IonToolbar, IonHeader, IonContent, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterLink, IonMenuButton, IonMenu, IonMenuToggle],
})
export class TabsPage implements OnInit{
  public environmentInjector = inject(EnvironmentInjector);
  public _AuthService = inject(AuthService);
  public _Router = inject(Router);
  private menuCtrl = inject(MenuController);


  userName:string | null = localStorage.getItem('userName')
  posints:string | null = localStorage.getItem('points')
  token: Signal<string | null> = computed(() => this._AuthService.token());
  title:string = ''

  constructor() {
    addIcons({ triangle, ellipse, square });
  }

  ngOnInit(): void {
    this.listenToRouteChange();
  }

  logout(): void {
    this._AuthService.logout();
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


}
