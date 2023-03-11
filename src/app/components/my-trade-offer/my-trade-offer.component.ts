import {Component, Input, OnInit} from '@angular/core';
import {IOfferFullDTO} from "../../interface/IOfferFullDTO";
import {IPokemonFullDTO} from "../../interface/IPokemonFullDTO";
import {ApiCallService} from "../../service/api-call.service";

@Component({
  selector: 'app-my-trade-offer',
  templateUrl: './my-trade-offer.component.html',
  styleUrls: ['./my-trade-offer.component.scss'],
})
export class MyTradeOfferComponent implements OnInit {
  @Input() offerId!: number;
  @Input() offerUrl!: string;

  offerFullDTO: IOfferFullDTO = {} as IOfferFullDTO;

  offeredPokemon: IPokemonFullDTO = {} as IPokemonFullDTO;
  acceptedPokemon: IPokemonFullDTO = {} as IPokemonFullDTO;
  isObtained!: boolean;


  constructor(
    private api: ApiCallService
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

  cancelTrade() {
    this.api.cancelTrade(this.offerId).subscribe(data => {
      console.log(data);
      window.location.reload();
    })
  }



}
