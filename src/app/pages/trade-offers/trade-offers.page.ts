import {Component, OnInit} from '@angular/core';
import {ITradeWithLinkDTO} from "../../interface/ITradeWithLinkDTO";
import {ApiCallService} from "../../service/api-call.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trade-offers',
  templateUrl: './trade-offers.page.html',
  styleUrls: ['./trade-offers.page.scss'],
})
export class TradeOffersPage implements OnInit {

  otherTradeOffers: ITradeWithLinkDTO[] = [] as ITradeWithLinkDTO[];

  constructor(
    private api: ApiCallService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getOtherOffers();
  }


  getOtherOffers() {
    this.api.getOffers().subscribe(data => {
      this.otherTradeOffers = data;
    })
  }


  backToMenu() {
    this.router.navigateByUrl("/tabs/tab4", {replaceUrl: true})
  }


}
