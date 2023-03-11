import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {IOfferFullDTO} from "../../interface/IOfferFullDTO";
import {IPokemonFullDTO} from "../../interface/IPokemonFullDTO";
import {ApiCallService} from "../../service/api-call.service";
import {ITradeWithLinkDTO} from "../../interface/ITradeWithLinkDTO";

@Component({
  selector: 'app-confirm-offer',
  templateUrl: './confirm-offer.page.html',
  styleUrls: ['./confirm-offer.page.scss'],
})
export class ConfirmOfferPage implements OnInit {

  @Input() offer!: IOfferFullDTO;
  @Input() acceptedPokemon!: IPokemonFullDTO;
  @Input() offeredPokemon!: IPokemonFullDTO;

  tradeConfirm: IOfferFullDTO = {} as IOfferFullDTO;


  constructor(
    private modalController: ModalController,
    private api: ApiCallService,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  dismissModal() {
    this.modalController.dismiss().then(() => window.location.reload());
  }

  completeTrade() {
    this.api.acceptTrade(this.offer.tradeId).subscribe(data => {
      this.tradeConfirm = data;
      console.log(this.tradeConfirm)
      this.router.navigateByUrl("/trade-offers", {replaceUrl: true}).then(() => window.location.reload())
    })
  }
}
