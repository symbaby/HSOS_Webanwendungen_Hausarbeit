import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {IPokemonFullDTO} from "../../interface/IPokemonFullDTO";
import {IPokemonExistDTO} from "../../interface/IPokeminExistDTO";
import {ApiCallService} from "../../service/api-call.service";
import {TokenExpirationService} from "../../service/token-expiration.service";
import {AuthenticationService} from "../../service/authentication.service";
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-unbox-pokemon-card',
  templateUrl: './unbox-pokemon-card.component.html',
  styleUrls: ['./unbox-pokemon-card.component.scss'],
})
export class UnboxPokemonCardComponent implements OnInit {

  @Input() id!: number;

  pokemon: IPokemonFullDTO = {} as IPokemonFullDTO;
  pokemonExistDTO: IPokemonExistDTO = {} as IPokemonExistDTO;
  primaryBackgroundColor!: string;
  secondaryBackgroundColor!: string;
  backgroundBrightness!: string;
  brightness!: string;
  isPokemonRevealed: boolean = false;
  isBackgroundRevealed: boolean = false;


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
    }
  }

  async ionViewWillEnter(): Promise<void> {
    if (this.authService.isAuthenticated) {
      await this.fetchDataFromAPI();
    }
  }


  async fetchDataFromAPI() : Promise<void>{
    this.api.getPokemonById(this.id).subscribe(data => {
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

  reveal(): void {

    if (!this.isBackgroundRevealed) {
      let brightness = 0;
      const intervalId = setInterval(() => {
        brightness += 0.1;
        this.setBackgroundBrightness(brightness.toFixed(1));
        if (brightness >= 0.9) {
          clearInterval(intervalId);
          this.isBackgroundRevealed = true;
        }
      }, 50);
    }

    if (!this.isPokemonRevealed && this.isBackgroundRevealed) {
      let brightness = 0;
      const intervalId = setInterval(() => {
        brightness += 0.1;
        this.setBrightness(brightness.toFixed(1));
        if (brightness >= 0.9) {
          clearInterval(intervalId);
          this.isPokemonRevealed = true;
        }
      }, 50);
    }
  }

  setBrightness(brightness: string): void {
    this.brightness = brightness;
  }

  setBackgroundBrightness(backgroundBrightness: string): void {
    this.backgroundBrightness = backgroundBrightness;
  }


  setPrimaryBackgroundColor(type: string): void {
    this.primaryBackgroundColor = this.colorMap[type] || 'white';
  }

  setSecondaryBackgroundColor(type: string): void {
    this.secondaryBackgroundColor = this.colorMap[type] || 'white';
  }

}
