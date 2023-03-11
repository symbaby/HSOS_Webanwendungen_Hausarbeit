import {Component, Input, OnInit} from '@angular/core';
import {ApiCallService} from "../../service/api-call.service";
import {IOfferFullDTO} from "../../interface/IOfferFullDTO";
import {IPokemonFullDTO} from "../../interface/IPokemonFullDTO";
import {ModalController} from "@ionic/angular";
import {ConfirmOfferPage} from "../../modal/confirm-offer/confirm-offer.page";

@Component({
  selector: 'app-trade-offer',
  templateUrl: './trade-offer.component.html',
  styleUrls: ['./trade-offer.component.scss'],
})
export class TradeOfferComponent implements OnInit {

  @Input() offerId!: number;
  @Input() offerUrl!: string;

  offerFullDTO: IOfferFullDTO = {} as IOfferFullDTO;

  offeredPokemon: IPokemonFullDTO = {} as IPokemonFullDTO;
  acceptedPokemon: IPokemonFullDTO = {} as IPokemonFullDTO;
  isObtained!: boolean;


  constructor(
    private api: ApiCallService,
    private modalController: ModalController
  ) {
  }

  async ngOnInit() {
    this.getFullOffer(this.offerUrl);
  }

  getFullOffer(offerUrl: string) {
    this.api.getOfferByUrl(offerUrl).subscribe(data => {
      this.offerFullDTO = data;

      this.setOfferedPokemon(this.offerFullDTO.offeredPokemonId);
      this.setAcceptedPokemon(this.offerFullDTO.acceptablePokemonId);
      this.checkObtainedPokemon(this.offerFullDTO.acceptablePokemonId);
    })
  }

  setOfferedPokemon(pokemonId: number) {
    this.api.getPokemonById(pokemonId).subscribe(data => {
      this.offeredPokemon = data;
    })
  }

  setAcceptedPokemon(pokemonId: number) {
    this.api.getPokemonById(pokemonId).subscribe(data => {
      this.acceptedPokemon = data;
    })
  }

  checkObtainedPokemon(pokemonId: number) {
    this.api.getExistingPokemonById(pokemonId).subscribe(data => {
      if (data) {
        this.isObtained = true;
      }
    })
  }

  /*
  acceptTrade() {
    this.api.acceptTrade(this.offerId).subscribe(data => {
      console.log(data);
      window.location.reload();
    })
  }
*/

  async openModal(offer: IOfferFullDTO, offeredPokemon: IPokemonFullDTO, acceptedPokemon: IPokemonFullDTO): Promise<void> {
    const modal = await this.modalController.create({
      component: ConfirmOfferPage,
      componentProps: {
        text: 'Confirm offer Modal',
        offer: offer,
        offPokemon: offeredPokemon,
        accPokemon: acceptedPokemon,
      }
    });
    return await modal.present();
  }

}
