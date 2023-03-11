import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {IntroGuard} from "./guards/intro.guard";
import {AutoLoginGuard} from "./guards/auto-login.guard";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'shop-modal',
    loadChildren: () => import('./modal/shop-modal/modal-page-shop.module').then(m => m.ModalPageShopPageModule)
  },
  {
    path: 'favorite-modal',
    loadChildren: () => import('./modal/favorite-modal/favorite-modal.module').then(m => m.FavoriteModalPageModule)
  },
  {
    path: 'unbox-booster',
    loadChildren: () => import('./pages/unbox-booster/unbox-booster.module').then( m => m.UnboxBoosterPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },  {
    path: 'trade-offers',
    loadChildren: () => import('./pages/trade-offers/trade-offers.module').then( m => m.TradeOffersPageModule)
  },
  {
    path: 'my-trade-offers',
    loadChildren: () => import('./pages/my-trade-offers/my-trade-offers.module').then( m => m.MyTradeOffersPageModule)
  },
  {
    path: 'add-offer',
    loadChildren: () => import('./modal/add-offer/add-offer.module').then( m => m.AddOfferPageModule)
  },
  {
    path: 'confirm-offer',
    loadChildren: () => import('./modal/confirm-offer/confirm-offer.module').then( m => m.ConfirmOfferPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
