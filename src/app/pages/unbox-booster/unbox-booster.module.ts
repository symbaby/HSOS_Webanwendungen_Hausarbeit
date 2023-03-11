import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnboxBoosterPageRoutingModule } from './unbox-booster-routing.module';

import { UnboxBoosterPage } from './unbox-booster.page';
import {UnboxPokemonCardComponent} from "../../components/unbox-pokemon-card/unbox-pokemon-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnboxBoosterPageRoutingModule
  ],
    declarations: [UnboxBoosterPage, UnboxPokemonCardComponent]
})
export class UnboxBoosterPageModule {}
