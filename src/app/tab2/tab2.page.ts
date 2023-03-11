import {Component} from '@angular/core';
import {IPrincipalDTO} from "../interface/IPrincipalDTO";
import {ApiCallService} from "../service/api-call.service";
import {IPokemonWithLinkDTO} from "../interface/IPokemonWithLinkDTO";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  favoritePokemonWithLinkDTO: IPokemonWithLinkDTO[] = [] as IPokemonWithLinkDTO[];

  constructor(private api: ApiCallService) {

    this.getAllFavoritePokemon();
  }

  getAllFavoritePokemon(): void {
    this.api.getAllFavoritePokemon().subscribe(data => {
      this.favoritePokemonWithLinkDTO = data;
    })
  }

}
