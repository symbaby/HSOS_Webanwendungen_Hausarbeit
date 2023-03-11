import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ApiCallService} from "../../service/api-call.service";
import {IPokemonFullDTO} from "../../interface/IPokemonFullDTO";
import VanillaTilt from "vanilla-tilt";
import {IPokemonExistDTO} from "../../interface/IPokeminExistDTO";
import {TokenExpirationService} from "../../service/token-expiration.service";
import {AuthenticationService} from "../../service/authentication.service";
import {ModalController} from "@ionic/angular";
import {FavoriteModalPage} from "../../modal/favorite-modal/favorite-modal.page";


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})


export class PokemonCardComponent implements OnInit {

  @Input() id!: number;
  @Input() url!: string;


  pokemon: IPokemonFullDTO = {} as IPokemonFullDTO;
  pokemonExistDTO: IPokemonExistDTO = {} as IPokemonExistDTO;
  primaryBackgroundColor!: string;
  secondaryBackgroundColor!: string;
  brightness!: string;
  isFavorite!: boolean;

  private colorMap: { [key: string]: string } = {
    grass: '#78C850', fire: '#F08030', water: '#6890F0', electric: '#F8D030', poison: '#A040A0',
    ground: '#E0C068', rock: '#B8A038', bug: '#A8B820', ghost: '#705898', steel: '#B8B8D0',
    normal: '#A8A878', fairy: '#EE99AC', fighting: '#C03028', psychic: '#F85888', flying: '#A890F0',
    dark: '#705848', ice: '#98D8D8', dragon: '#7038F8', unknown: '#68A090'
  };

  constructor(
    private api: ApiCallService,
    private el: ElementRef,
    private tokenExpirationService: TokenExpirationService,
    private modalController: ModalController,
    private authService: AuthenticationService
  ) {
  }

  async ngOnInit() {

    // Init VanillaTilt js
    VanillaTilt.init(this.el.nativeElement.querySelectorAll(".Card"), {
      max: 20,
      speed: 300,
      scale: 1.2,
      glare: true,
      "max-glare": 0.1,
    });

    // Get Data from backend
    if (this.authService.isAuthenticated) {
      await this.fetchDataFromAPI();
      await this.setVisibilityFromAPI();
    }
  }

  async ionViewWillEnter() {
    if (this.authService.isAuthenticated) {
      await this.fetchDataFromAPI();
      await this.setVisibilityFromAPI();
    }
  }

  async fetchDataFromAPI(): Promise<void> {
    this.api.getPokemonByUrl(this.url).subscribe(data => {
      this.pokemon = data;

      if (this.pokemon.pokemonType) {
        if (this.pokemon.pokemonType.primaryType) {
          this.setPrimaryBackgroundColor(this.pokemon.pokemonType.primaryType);
        }

        if (this.pokemon.pokemonType.secondaryType) {
          this.setSecondaryBackgroundColor(this.pokemon.pokemonType.secondaryType);
        }
      }
    });
  }

  async setVisibilityFromAPI(): Promise<void> {
    this.api.getExistingPokemonById(Number(this.id)).subscribe(data => {
      this.pokemonExistDTO = data;

      if (this.pokemonExistDTO) {
        this.isFavorite = this.pokemonExistDTO.isFavorite;
        this.setBrightness("1");
      } else {
        this.setBrightness("0");
      }
    }, error => {
      if (error.status === 404)
        this.setBrightness("0");
    });
  }

  setBrightness(brightness: string): void {
    this.brightness = brightness;
  }

  setPrimaryBackgroundColor(type: string): void {
    this.primaryBackgroundColor = this.colorMap[type] || 'white';
  }

  setSecondaryBackgroundColor(type: string): void {
    this.secondaryBackgroundColor = this.colorMap[type] || 'white';
  }


  async openModal(id: number, isFavorite: boolean, pokemon: IPokemonFullDTO): Promise<void> {
    // only open modal if pokemon is obtained
    if (this.pokemonExistDTO) {
      const modal = await this.modalController.create({
        component: FavoriteModalPage, // The component that will be displayed in the modal
        componentProps: {
          id: id,
          pokemon: pokemon,
          isFavorite: isFavorite,
          text: 'Favorite Page'
        }
      });
      return await modal.present();
    }
  }
}
