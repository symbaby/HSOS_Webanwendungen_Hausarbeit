import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnboxBoosterPage } from './unbox-booster.page';

const routes: Routes = [
  {
    path: '',
    component: UnboxBoosterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnboxBoosterPageRoutingModule {}
