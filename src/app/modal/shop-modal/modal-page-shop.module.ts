import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPageShopPageRoutingModule } from './modal-page-shop-routing.module';

import { ModalPageShopPage } from './modal-page-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageShopPageRoutingModule
  ],
  declarations: [ModalPageShopPage]
})
export class ModalPageShopPageModule {}
