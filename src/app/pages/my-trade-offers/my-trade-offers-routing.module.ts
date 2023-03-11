import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTradeOffersPage } from './my-trade-offers.page';

const routes: Routes = [
  {
    path: '',
    component: MyTradeOffersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTradeOffersPageRoutingModule {}
