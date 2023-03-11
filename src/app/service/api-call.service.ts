import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {IPokemonFullDTO} from "../interface/IPokemonFullDTO";
import {IPokemonExistDTO} from "../interface/IPokeminExistDTO";
import {IObtainedPokemonWithLinkDTO} from "../interface/IObtainedPokemonWithLinkDTO";
import {IPrincipalDTO} from "../interface/IPrincipalDTO";
import {IPokemonWithLinkDTO} from "../interface/IPokemonWithLinkDTO";
import {TokenExpirationService} from "./token-expiration.service";
import {IBoosterPackDTO} from "../interface/IBoosterPackDTO";
import {IRegisterTrainerDTO} from "../interface/IRegisterTrainerDTO";
import {ITradeWithLinkDTO} from "../interface/ITradeWithLinkDTO";
import {IOfferFullDTO} from "../interface/IOfferFullDTO";
import {IPokemonTradeDTO} from "../interface/IPokemonTradeDTO";

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) {
  }

  getAllPokemon(): Observable<IPokemonWithLinkDTO[]> {
    const url = `http://localhost:8080/pokemon`;
    return this.http.get<IPokemonWithLinkDTO[]>(url);
  }

  getPokemonByUrl(url: string): Observable<IPokemonFullDTO> {
    //const url = `http://localhost:8080/pokemon/${pokemonId}`;
    return this.http.get<IPokemonFullDTO>(url);
  }

  getPokemonById(pokemonId: number): Observable<IPokemonFullDTO> {
    const url = `http://localhost:8080/pokemon/${pokemonId}`;
    return this.http.get<IPokemonFullDTO>(url);
  }

  // Not needed, we ask the obtained Pokémon via getExistingPokemonById
  getAllObtainedPokemon(): Observable<IObtainedPokemonWithLinkDTO[]> {

    const url = `http://localhost:8080/users`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<IObtainedPokemonWithLinkDTO[]>(url, {headers});
  }


  getExistingPokemonById(pokemonId: number): Observable<IPokemonExistDTO> {

    const url = `http://localhost:8080/users/${pokemonId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<IPokemonExistDTO>(url, {headers});
  }

  buyBooster(): Observable<IBoosterPackDTO> {
    const url = `http://localhost:8080/users/buyBooster`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<IBoosterPackDTO>(url, {headers});
  }

  obtainFreeBooster(): Observable<IBoosterPackDTO> {
    const url = `http://localhost:8080/users/freeBooster`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<IBoosterPackDTO>(url, {headers});
  }


  whoAmI(): Observable<IPrincipalDTO> {
    const url = `http://localhost:8080/users/whoami`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<IPrincipalDTO>(url, {headers});
  }

  setFavoritePokemon(pokemonId: number): Observable<IPokemonWithLinkDTO> {
    const url = `http://localhost:8080/users/favorite/${pokemonId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.put<IPokemonWithLinkDTO>(url, null, {headers}); // second param is null because second param is body
  }

  getAllFavoritePokemon(): Observable<IPokemonWithLinkDTO[]> {
    const url = `http://localhost:8080/users/favorite`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<IPokemonWithLinkDTO[]>(url, {headers});
  }

  removeFavoritePokemon(pokemonId: number): Observable<IPokemonWithLinkDTO> {
    const url = `http://localhost:8080/users/favorite/${pokemonId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.delete<IPokemonWithLinkDTO>(url, {headers});
  }

  registerNewUser(username: string, password: string){
    const url = `http://localhost:8080/users/register?username=${username}&password=${password}`;
    return this.http.post<IRegisterTrainerDTO>(url, null);
  }

  getOffers(){
    const url = `http://localhost:8080/trade/allOffers`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<ITradeWithLinkDTO[]>(url, {headers});
  }


  getOfferByUrl(offerUrl:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<IOfferFullDTO>(offerUrl, {headers});
  }

  acceptTrade(tradeId:number){
    const url = `http://localhost:8080/trade/${tradeId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<IOfferFullDTO>(url, {headers});
  }

  getMyTradeOffers(){
    const url = `http://localhost:8080/trade/myOffers`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.get<ITradeWithLinkDTO[]>(url, {headers});
  }

  cancelTrade(tradeId:number){
    const url = `http://localhost:8080/trade/${tradeId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.delete<IOfferFullDTO>(url, {headers});
  }

  offerTrade(pokemonTradeDTO: IPokemonTradeDTO){
    const url = `http://localhost:8080/trade`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
    return this.http.post<IOfferFullDTO>(url, pokemonTradeDTO,{headers});
  }

}


