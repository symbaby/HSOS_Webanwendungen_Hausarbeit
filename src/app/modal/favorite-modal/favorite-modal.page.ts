import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {IPokemonFullDTO} from "../../interface/IPokemonFullDTO";
import {ApiCallService} from "../../service/api-call.service";
import {IPokemonWithLinkDTO} from "../../interface/IPokemonWithLinkDTO";

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.page.html',
  styleUrls: ['./favorite-modal.page.scss'],
})
export class FavoriteModalPage implements OnInit {

  @Input() pokemon!: IPokemonFullDTO;
  @Input() id!: number;
  @Input() isFavorite!: boolean;

  pokemonWithLinkDTO: IPokemonWithLinkDTO = {} as IPokemonWithLinkDTO;

  constructor(
    private modalController: ModalController,
    private api: ApiCallService
  ) {
  }

  ngOnInit() {
  }

  dismissModal(): void {
    this.modalController.dismiss();
  }

  setFavorite(): void {
    this.api.setFavoritePokemon(this.id).subscribe(data => {
      this.pokemonWithLinkDTO = data;
      if (this.pokemonWithLinkDTO) {
        console.log(this.pokemonWithLinkDTO);
        this.dismissModal();
        window.location.reload();
        window.alert(this.pokemon.name.toUpperCase() + " has been set as favorite")
      }
    })
  }

  removeFavorite(): void {
    this.api.removeFavoritePokemon(this.id).subscribe(data => {
      this.pokemonWithLinkDTO = data;
      if (this.pokemonWithLinkDTO) {
        console.log(this.pokemonWithLinkDTO);
        this.dismissModal();
        window.location.reload();
        window.alert(this.pokemon.name.toUpperCase() + " has been removed as favorite")
      }
    })
  }
}
