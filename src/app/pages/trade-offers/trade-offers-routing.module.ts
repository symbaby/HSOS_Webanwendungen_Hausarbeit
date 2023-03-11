import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TradeOffersPage } from './trade-offers.page';

const routes: Routes = [
  {
    path: '',
    component: TradeOffersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeOffersPageRoutingModule {}
