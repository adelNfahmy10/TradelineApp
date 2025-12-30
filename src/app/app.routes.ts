import { Routes } from '@angular/router';
import { authGuardGuard } from 'src/core/guard/auth/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'premuim',
    loadComponent: () => import('./pages/premuim/premuim.page').then( m => m.PremuimPage)
  },
  {
    path: 'easy-pay',
    loadComponent: () => import('./pages/easy-pay/easy-pay.page').then( m => m.EasyPayPage)
  },
  {
    path: 'callback',
    loadComponent: () => import('./pages/callback/callback.page').then( m => m.CallbackPage)
  },
  {
    path: 'nearbystore',
    loadComponent: () => import('./pages/nearbystore/nearbystore.page').then( m => m.NearbystorePage)
  },
  {
    path: 'vr-store',
    loadComponent: () => import('./pages/vrstore/vrstore.page').then( m => m.VrstorePage)
  },
  {
    path: 'sub-categories/:name',
    loadComponent: () => import('./pages/sub-categories/sub-categories.page').then( m => m.SubCategoriesPage)
  },
  {
    path: 'categories/:name',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'product/:name',
    loadComponent: () => import('./pages/product/product.page').then( m => m.ProductPage)
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'account-info',
    loadComponent: () => import('./pages/account-info/account-info.page').then( m => m.AccountInfoPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.page').then( m => m.OrdersPage)
  },
  {
    path: 'delivery',
    loadComponent: () => import('./pages/delivery/delivery.page').then( m => m.DeliveryPage)
  },
  {
    path: 'tvc-history',
    loadComponent: () => import('./pages/tvc-history/tvc-history.page').then( m => m.TvcHistoryPage)
  },
  {
    path: 'favorite',
    loadComponent: () => import('./pages/favorite/favorite.page').then( m => m.FavoritePage)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/about-us/about-us.page').then( m => m.AboutUsPage)
  },
  {
    path: 'tvc-details',
    loadComponent: () => import('./pages/tvc-details/tvc-details.page').then( m => m.TvcDetailsPage)
  },
  {
    path: 'search-items/:word',
    loadComponent: () => import('./pages/search-items/search-items.page').then( m => m.SearchItemsPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.page').then( m => m.CheckoutPage)
  },
];
