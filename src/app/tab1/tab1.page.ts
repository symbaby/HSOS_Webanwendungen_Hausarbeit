import {Component} from '@angular/core';
import {ApiCallService} from "../service/api-call.service";
import {IPokemonWithLinkDTO} from "../interface/IPokemonWithLinkDTO";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pokemonWithLinkList: IPokemonWithLinkDTO[] = [] as IPokemonWithLinkDTO[];


  constructor(private api: ApiCallService) {

    this.getAllPokemon();
  }

  getAllPokemon(): void {
    this.api.getAllPokemon().subscribe(data => {
      this.pokemonWithLinkList = data;
    })
  }

}
