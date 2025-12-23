import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/explore',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'explore',
        loadComponent: () =>
          import('../pages/explore/explore.page').then(m => m.ExplorePage)
      },
      {
        path: 'shop',
        loadComponent: () =>
          import('../pages/shop/shop.page').then(m => m.ShopPage)
      },
      {
        path: 'notification',
        loadComponent: () =>
          import('../pages/notification/notification.page').then(m => m.NotificationPage)
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../pages/cart/cart.page').then(m => m.CartPage)
      },
      {
        path: 'support',
        loadComponent: () =>
          import('../pages/support/support.page').then(m => m.SupportPage)
      },
      {
        path: '',
        redirectTo: 'explore',
        pathMatch: 'full'
      }
    ],
  }
];

