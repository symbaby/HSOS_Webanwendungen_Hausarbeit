import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TradeOffersPageRoutingModule } from './trade-offers-routing.module';

import { TradeOffersPage } from './trade-offers.page';
import {Tab4PageModule} from "../../tab4/tab4.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TradeOffersPageRoutingModule,
        Tab4PageModule
    ],
  declarations: [TradeOffersPage]
})
export class TradeOffersPageModule {}
