import {Component, OnInit} from '@angular/core';
import {ModalPageShopPage} from "../shop-modal/modal-page-shop.page";
import {ModalController} from "@ionic/angular";
import {ApiCallService} from "../../service/api-call.service";
import {IPokemonTradeDTO} from "../../interface/IPokemonTradeDTO";
import {IOfferFullDTO} from "../../interface/IOfferFullDTO";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.page.html',
  styleUrls: ['./add-offer.page.scss'],
})
export class AddOfferPage implements OnInit {

  offeredPokemonId!: number;
  acceptedPokemonId!: number;

  myOffer: IOfferFullDTO = {} as IOfferFullDTO;


  constructor(
    private modalController: ModalController,
    private api: ApiCallService,
  ) {
  }

  ngOnInit() {

  }


  dismissModal() {
    this.modalController.dismiss().then(() => window.location.reload());
  }

  addPokemonToOffers() {

    let dto: IPokemonTradeDTO = {offeredPokemonId: this.offeredPokemonId, acceptedPokemonId: this.acceptedPokemonId};

    this.api.offerTrade(dto).subscribe(data => {
      this.myOffer = data;
      this.dismissModal();
    })

  }
}
