import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteModalPage } from './favorite-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteModalPageRoutingModule {}
