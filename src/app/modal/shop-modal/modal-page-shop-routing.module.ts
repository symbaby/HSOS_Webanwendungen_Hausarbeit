import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPageShopPage } from './modal-page-shop.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPageShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPageShopPageRoutingModule {}
