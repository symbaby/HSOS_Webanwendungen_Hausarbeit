import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmOfferPageRoutingModule } from './confirm-offer-routing.module';

import { ConfirmOfferPage } from './confirm-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmOfferPageRoutingModule
  ],
  declarations: [ConfirmOfferPage]
})
export class ConfirmOfferPageModule {}
