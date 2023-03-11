import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteModalPageRoutingModule } from './favorite-modal-routing.module';

import { FavoriteModalPage } from './favorite-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteModalPageRoutingModule
  ],
  declarations: [FavoriteModalPage]
})
export class FavoriteModalPageModule {}
