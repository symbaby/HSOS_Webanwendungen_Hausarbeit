import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTradeOffersPageRoutingModule } from './my-trade-offers-routing.module';

import { MyTradeOffersPage } from './my-trade-offers.page';
import {Tab4PageModule} from "../../tab4/tab4.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyTradeOffersPageRoutingModule,
        Tab4PageModule
    ],
  declarations: [MyTradeOffersPage]
})
export class MyTradeOffersPageModule {}
