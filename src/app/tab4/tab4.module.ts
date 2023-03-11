import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import {TradeOfferComponent} from "../components/trade-offer/trade-offer.component";
import {MyTradeOfferComponent} from "../components/my-trade-offer/my-trade-offer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule
  ],
  exports: [
    TradeOfferComponent,
    MyTradeOfferComponent
  ],
  declarations: [Tab4Page, TradeOfferComponent, MyTradeOfferComponent]
})
export class Tab4PageModule {}
